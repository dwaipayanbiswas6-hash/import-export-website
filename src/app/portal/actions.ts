'use server';

import { createHash } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const DUPLICATE_REPLY_WINDOW_MS = 5 * 60 * 1000;

function createReplyId(enquiryId: string, email: string, body: string) {
  const timeBucket = Math.floor(Date.now() / DUPLICATE_REPLY_WINDOW_MS);
  const digest = createHash('sha256')
    .update(`${enquiryId}\u0000${email}\u0000${body}\u0000${timeBucket}`)
    .digest('hex');

  return `${digest.slice(0, 8)}-${digest.slice(8, 12)}-${digest.slice(12, 16)}-${digest.slice(16, 20)}-${digest.slice(20, 32)}`;
}

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  if (supabase) await supabase.auth.signOut();
  redirect('/portal/login');
}

export async function replyToEnquiry(formData: FormData) {
  const enquiryId = String(formData.get('enquiryId') ?? '').trim();
  const body = String(formData.get('body') ?? '').trim();
  if (!enquiryId || body.length < 1 || body.length > 10000) {
    redirect(`/portal/enquiries/${encodeURIComponent(enquiryId)}?error=message`);
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) redirect('/portal/login');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) redirect('/portal/login');

  const { data: enquiry } = await supabase
    .from('enquiries')
    .select('id')
    .eq('id', enquiryId)
    .maybeSingle();
  if (!enquiry) redirect('/portal');

  const senderEmail = user.email.toLowerCase();
  const messageId = createReplyId(enquiryId, senderEmail, body);
  const { error } = await supabase.from('enquiry_messages').insert({
    id: messageId,
    enquiry_id: enquiryId,
    sender_role: 'buyer',
    sender_email: senderEmail,
    body,
  });
  if (error && error.code !== '23505') {
    console.error('Buyer portal reply failed.', error.message);
    redirect(`/portal/enquiries/${enquiryId}?error=send`);
  }

  const admin = createAdminSupabaseClient();
  if (admin) {
    await admin
      .from('enquiries')
      .update({ status: 'new' })
      .eq('id', enquiryId)
      .neq('status', 'closed');
  }

  revalidatePath('/portal');
  revalidatePath(`/portal/enquiries/${enquiryId}`);
  redirect(`/portal/enquiries/${enquiryId}?sent=1`);
}
