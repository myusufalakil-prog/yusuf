import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://myemhphtrdwgjqtgmeml.supabase.co'
const SUPABASE_KEY = 'sb_publishable_m5ivcE3LkXp9OW1o2YDlCg_MXKgXTfy'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ── Ambil data dari Supabase ───────────────────────────────────────
export async function fetchData(key) {
  const { data, error } = await supabase
    .from('portfolio_data')
    .select('value')
    .eq('key', key)
    .single()
  if (error) throw error
  return data?.value ?? null
}

// ── Simpan / update data ke Supabase ──────────────────────────────
export async function saveData(key, value) {
  const { error } = await supabase
    .from('portfolio_data')
    .upsert({ key, value, updated_at: new Date().toISOString() })
  if (error) throw error
}
