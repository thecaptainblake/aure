import type { H3Event } from 'h3'
import { fail } from './http'
import { authSupabase } from './supabase'

export const adminSession = async (event: H3Event) => {
  const supabase = authSupabase(event)
  const { data } = await supabase.auth.getUser()
  return { loggedIn: data.user?.app_metadata?.role === 'admin' }
}

export const requireAdmin = async (event: H3Event) => {
  const session = await adminSession(event)
  if (!session.loggedIn) fail(401, 'No autorizado')
}
