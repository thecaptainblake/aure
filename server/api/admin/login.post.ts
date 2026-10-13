import { fail } from '../../utils/http'
import { authSupabase } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = body && typeof body === 'object' && typeof body.email === 'string' ? body.email.trim() : ''
  const password = body && typeof body === 'object' && typeof body.password === 'string' ? body.password : ''
  if (!email || !password) fail(400, 'Escribe correo y contraseña')

  const supabase = authSupabase(event)
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error || !data.user) fail(401, 'Correo o contraseña incorrectos')
  if (data.user.app_metadata?.role !== 'admin') {
    await supabase.auth.signOut()
    fail(403, 'No autorizado')
  }
  return { ok: true }
})
