import { createClient } from '@supabase/supabase-js';
import { getSupabaseServiceConfig } from './config';

export function createAdminSupabaseClient() {
  const config = getSupabaseServiceConfig();
  if (!config) return null;

  return createClient(config.url, config.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
