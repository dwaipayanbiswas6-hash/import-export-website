import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { getSupabaseServiceConfig } from './service-config';

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
