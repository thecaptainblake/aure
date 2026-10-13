import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'
import { appendResponseHeader, getRequestHeader, type H3Event } from 'h3'
import { fail } from './http'

const configValues = () => {
  const config = useRuntimeConfig()
  const url = String(config.supabaseUrl ?? '')
  const anonKey = String(config.supabaseAnonKey ?? '')
  const serviceRoleKey = String(config.supabaseServiceRoleKey ?? '')
  return { url, anonKey, serviceRoleKey }
}

export const requireSupabaseConfig = () => {
  const values = configValues()
  if (!values.url || !values.anonKey || !values.serviceRoleKey) {
    fail(500, 'Faltan SUPABASE_URL, SUPABASE_ANON_KEY o SUPABASE_SERVICE_ROLE_KEY')
  }
  return values
}

export const authSupabase = (event: H3Event) => {
  const { url, anonKey } = requireSupabaseConfig()
  return createServerClient(url, anonKey, {
    cookieOptions: {
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
    cookies: {
      getAll() {
        return parseCookieHeader(getRequestHeader(event, 'cookie') ?? '')
      },
      setAll(cookies) {
        cookies.forEach(({ name, value, options }) => {
          appendResponseHeader(event, 'set-cookie', serializeCookieHeader(name, value, options))
        })
      },
    },
  })
}

let anonClient: SupabaseClient | null = null

export const anonSupabase = () => {
  const { url, anonKey } = requireSupabaseConfig()
  if (!anonClient) {
    anonClient = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return anonClient
}

let serviceClient: SupabaseClient | null = null

export const serviceSupabase = () => {
  const { url, serviceRoleKey } = requireSupabaseConfig()
  if (!serviceClient) {
    serviceClient = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return serviceClient
}

export const productImageUrl = (storagePath: string) => {
  const { url } = requireSupabaseConfig()
  return `${url.replace(/\/$/, '')}/storage/v1/object/public/product-images/${storagePath}`
}
