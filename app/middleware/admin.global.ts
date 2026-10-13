export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return

  const requestFetch = useRequestFetch()
  const { loggedIn } = await requestFetch<{ loggedIn: boolean }>('/api/admin/session')

  if (to.path === '/admin/login') {
    if (loggedIn) return navigateTo('/admin')
    return
  }

  if (!loggedIn) return navigateTo('/admin/login')
})
