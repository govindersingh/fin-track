import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';

type Account = Database['public']['Tables']['accounts']['Row'];
type AccountInsert = Database['public']['Tables']['accounts']['Insert'];
type AccountUpdate = Database['public']['Tables']['accounts']['Update'];

export async function getAccounts() {
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .order('created_at', { ascending: false });

  return { data, error };
}

export async function getAccountById(id: string) {
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  return { data, error };
}

export async function createAccount(account: Omit<AccountInsert, 'user_id'>) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: new Error('User not authenticated') };
  }

  const { data, error } = await supabase
    .from('accounts')
    .insert({
      ...account,
      user_id: user.id,
    })
    .select()
    .single();

  return { data, error };
}

export async function updateAccount(id: string, updates: AccountUpdate) {
  const { data, error } = await supabase
    .from('accounts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}

export async function deleteAccount(id: string) {
  const { error } = await supabase
    .from('accounts')
    .delete()
    .eq('id', id);

  return { error };
}

export async function getTotalBalance() {
  const { data, error } = await getAccounts();

  if (error || !data) {
    return { total: 0, error };
  }

  const total = data.reduce((sum, account) => sum + Number(account.balance), 0);
  return { total, error: null };
}