import { createAdminSupabaseClient } from '@/lib/supabase/admin';

export async function createPortalFileUrl(path: string | null) {
  if (!path) return null;
  const admin = createAdminSupabaseClient();
  if (!admin) return null;

  const { data, error } = await admin.storage
    .from('enquiry-files')
    .createSignedUrl(path, 10 * 60);

  if (error) {
    console.error('Could not create portal file link.', error.message);
    return null;
  }

  return data.signedUrl;
}
