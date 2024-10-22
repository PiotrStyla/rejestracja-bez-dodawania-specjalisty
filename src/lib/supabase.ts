import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Brak konfiguracji Supabase. Sprawdź plik .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function initializeUsersTable() {
  const { data, error } = await supabase.rpc('create_users_table');
  if (error) throw error;
  console.log('Users table initialized');
}

export async function createUser(email: string, name: string, specialization: string | null, role: string) {
  const { data, error } = await supabase.rpc('create_user', { p_email: email, p_name: name, p_specialization: specialization, p_role: role });
  if (error) throw error;
  return data;
}

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase.rpc('get_user_by_email', { p_email: email });
  if (error) throw error;
  return data[0];
}

export async function createAdminUser(email: string, name: string) {
  return createUser(email, name, null, 'admin');
}