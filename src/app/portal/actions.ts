'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';
import { createServerSupabaseClient } from '@/lib/supabase/server';

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

  const { error } = await supabase.from('enquiry_messages').insert({
    enquiry_id: enquiryId,
    sender_role: 'buyer',
    sender_email: user.email.toLowerCase(),
    body,
  });
  if (error) {
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
