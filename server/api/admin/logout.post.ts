import { authSupabase } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const supabase = authSupabase(event)
  await supabase.auth.signOut()
  return { ok: true }
})
