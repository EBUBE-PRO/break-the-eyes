import { useAuthStore } from '../stores/auth';
import { useSupabase } from '~/composables/useSupabase';

export default defineNuxtRouteMiddleware(async (to) => {
  const excludedPaths = ['/admin/login', '/admin/signup'];
  
  if (!to.path.startsWith('/admin') || excludedPaths.includes(to.path)) return;

  // Use the auth store which is initialized from Supabase session
  const authStore = useAuthStore();
  
  if (import.meta.client && !authStore.isAuthenticated) {
    // Double-check by calling getSession directly before redirecting
    const supabase = useSupabase();
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      return navigateTo('/admin/login');
    }
    authStore.user = data.session.user;
  }
});

