'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  enquiryStatuses,
  isPortalAdmin,
  type EnquiryStatus,
} from '@/lib/portal';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';
import { createServerSupabaseClient } from '@/lib/supabase/server';

async function requireAdmin() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) redirect('/portal/login?next=/admin/enquiries');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) redirect('/portal/login?next=/admin/enquiries');
  if (!isPortalAdmin(user.email)) redirect('/');

  const admin = createAdminSupabaseClient();
  if (!admin) throw new Error('Supabase service configuration is missing.');
  return admin;
}

export async function signOutAdmin() {
  const supabase = await createServerSupabaseClient();
  if (supabase) await supabase.auth.signOut();
  redirect('/portal/login?next=/admin/enquiries');
}

export async function updateEnquiryStatus(formData: FormData) {
  const enquiryId = String(formData.get('enquiryId') ?? '').trim();
  const status = String(formData.get('status') ?? '').trim() as EnquiryStatus;
  if (!enquiryId || !enquiryStatuses.includes(status)) {
    redirect('/admin/enquiries?error=status');
  }

  const admin = await requireAdmin();
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
  redirect(`/admin/enquiries/${enquiryId}?updated=1`);
}
