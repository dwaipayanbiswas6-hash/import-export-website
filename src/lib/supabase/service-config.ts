import 'server-only';
import { getSupabasePublicConfig } from './config';

export function getSupabaseServiceConfig() {
  const publicConfig = getSupabasePublicConfig();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || null;

  return publicConfig && serviceRoleKey
    ? { ...publicConfig, serviceRoleKey }
    : null;
}
