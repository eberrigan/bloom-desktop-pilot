import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

const getBloomCredentials = window.electron.bloom.getCredentials;

export async function getSupabaseClient() {
  // const clientOptions = {
  //   auth: {
  //     autoRefreshToken: true,
  //     persistSession: true,
  //   },
  // };

  const credentials = await getBloomCredentials();

  const supabase = createClient<Database>(
    credentials.bloom_api_url,
    credentials.bloom_anon_key
  );
  await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
    // clientOptions
  });

  return supabase;
}
