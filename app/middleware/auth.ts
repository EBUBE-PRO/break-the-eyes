export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser()

    const excludedPaths = ['/admin/login', '/admin/signup']
    if (!user.value && to.path.startsWith('/admin') && !excludedPaths.includes(to.path)) {
        return navigateTo('/admin/login')
    }
})
