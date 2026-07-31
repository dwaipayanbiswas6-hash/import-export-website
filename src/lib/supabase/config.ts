function configured(value: string | undefined) {
  return value?.trim() || null;
}

export function getSupabasePublicConfig() {
  const url = configured(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const publishableKey = configured(
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );

  return url && publishableKey ? { url, publishableKey } : null;
}

export function getSupabaseServiceConfig() {
  const publicConfig = getSupabasePublicConfig();
  const serviceRoleKey = configured(process.env.SUPABASE_SERVICE_ROLE_KEY);

  return publicConfig && serviceRoleKey
    ? { ...publicConfig, serviceRoleKey }
    : null;
}

export function isSupabasePublicConfigured() {
  return Boolean(getSupabasePublicConfig());
}
