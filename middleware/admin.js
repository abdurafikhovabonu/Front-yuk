export default defineNuxtRouteMiddleware((to, from) => {
  // Client side da ishlashi uchun
  if (process.client) {
    const user = localStorage.getItem('user')
    
    if (!user) {
      return navigateTo('/login')
    }
    
    try {
      const userData = JSON.parse(user)
      if (userData.role !== 'admin') {
        return navigateTo('/')
      }
    } catch (e) {
      return navigateTo('/login')
    }
  }
})