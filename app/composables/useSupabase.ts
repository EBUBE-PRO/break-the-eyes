// A shared Supabase client composable using @supabase/supabase-js directly.
// This avoids the auto-import issues with @nuxtjs/supabase in Pinia stores.
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

export function useSupabase(): SupabaseClient {
  if (_client) return _client;

  const config = useRuntimeConfig();
  const url = (config.public.supabaseUrl as string) || '';
  const key = (config.public.supabaseKey as string) || '';

  _client = createClient(url, key);
  return _client;
}
