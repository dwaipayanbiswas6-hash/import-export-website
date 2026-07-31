'use server';

import { randomUUID } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  enquiryStatuses,
  isAllowedPortalFile,
  isPortalAdmin,
  safeFilename,
  type EnquiryStatus,
} from '@/lib/portal';
import { notifyBuyerOfResponse } from '@/lib/portal-notifications';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';
import { createServerSupabaseClient } from '@/lib/supabase/server';

async function requireAdmin() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) redirect('/portal/login?next=/admin/enquiries');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) redirect('/portal/login?next=/admin/enquiries');
  if (!isPortalAdmin(user.email)) redirect('/portal');

  const admin = createAdminSupabaseClient();
  if (!admin) throw new Error('Supabase service configuration is missing.');
  return { admin, user };
}

export async function updateEnquiryStatus(formData: FormData) {
  const enquiryId = String(formData.get('enquiryId') ?? '').trim();
  const status = String(formData.get('status') ?? '').trim() as EnquiryStatus;
  if (!enquiryId || !enquiryStatuses.includes(status)) {
    redirect('/admin/enquiries?error=status');
  }

  const { admin } = await requireAdmin();
  const { error } = await admin
    .from('enquiries')
    .update({ status })
    .eq('id', enquiryId);
  if (error) {
    console.error('Admin status update failed.', error.message);
    redirect(`/admin/enquiries/${enquiryId}?error=status`);
  }

  revalidatePath('/admin/enquiries');
  revalidatePath(`/admin/enquiries/${enquiryId}`);
  revalidatePath('/portal');
  revalidatePath(`/portal/enquiries/${enquiryId}`);
  redirect(`/admin/enquiries/${enquiryId}?updated=1`);
}

export async function sendAdminReply(formData: FormData) {
  const enquiryId = String(formData.get('enquiryId') ?? '').trim();
  const body = String(formData.get('body') ?? '').trim();
  const uploaded = formData.get('attachment');
  const attachment =
    uploaded instanceof File && uploaded.size > 0 ? uploaded : null;

  if (!enquiryId || body.length < 1 || body.length > 10000) {
    redirect(`/admin/enquiries/${enquiryId}?error=message`);
  }
  if (attachment && !isAllowedPortalFile(attachment)) {
    redirect(`/admin/enquiries/${enquiryId}?error=file`);
  }

  const { admin, user } = await requireAdmin();
  const { data: enquiry, error: enquiryError } = await admin
    .from('enquiries')
    .select('id, reference, buyer_email')
    .eq('id', enquiryId)
    .maybeSingle();
  if (enquiryError || !enquiry) redirect('/admin/enquiries');

  let attachmentPath: string | null = null;
  let attachmentName: string | null = null;
  if (attachment) {
    attachmentName = safeFilename(attachment.name) || 'portal-attachment';
    attachmentPath = `enquiries/${enquiryId}/admin/${randomUUID()}-${attachmentName}`;
    const { error: uploadError } = await admin.storage
      .from('enquiry-files')
      .upload(attachmentPath, Buffer.from(await attachment.arrayBuffer()), {
        contentType: attachment.type,
        upsert: false,
      });
    if (uploadError) {
      console.error('Admin attachment upload failed.', uploadError.message);
      redirect(`/admin/enquiries/${enquiryId}?error=file`);
    }
  }

  const { error: messageError } = await admin.from('enquiry_messages').insert({
    enquiry_id: enquiryId,
    sender_role: 'admin',
    sender_email: user.email?.toLowerCase() ?? null,
    body,
    attachment_path: attachmentPath,
    attachment_name: attachmentName,
  });
  if (messageError) {
    console.error('Admin reply failed.', messageError.message);
    if (attachmentPath) {
      await admin.storage.from('enquiry-files').remove([attachmentPath]);
    }
    redirect(`/admin/enquiries/${enquiryId}?error=send`);
  }

  await admin
    .from('enquiries')
    .update({ status: 'responded' })
    .eq('id', enquiryId);

  await notifyBuyerOfResponse({
    buyerEmail: enquiry.buyer_email,
    reference: enquiry.reference,
  });

  revalidatePath('/admin/enquiries');
  revalidatePath(`/admin/enquiries/${enquiryId}`);
  revalidatePath('/portal');
  revalidatePath(`/portal/enquiries/${enquiryId}`);
  redirect(`/admin/enquiries/${enquiryId}?sent=1`);
}
