import { useSupabase } from '~/composables/useSupabase';
import { defineStore } from 'pinia';
import { watch } from 'vue';
import { navigateTo } from '#app';

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    init() {
      if (import.meta.server) return;
      // Listen for auth state changes
      const supabase = useSupabase();
      supabase.auth.getSession().then(({ data }) => {
        this.user = data.session?.user ?? null;
      });
      supabase.auth.onAuthStateChange((_event, session) => {
        this.user = session?.user ?? null;
      });
    },

    async login(email: string, password: string) {
      const supabase = useSupabase();
      this.loading = true;
      this.error = null;
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        
        this.user = data.user;
        return true;
      } catch (err: any) {
        this.error = err.message || 'Login failed. Please check your credentials.';
        console.error('[Auth Store] Login Error:', err);
        return false;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      const supabase = useSupabase();
      await supabase.auth.signOut();
      this.user = null;
      navigateTo('/admin/login');
    },

    clearError() {
      this.error = null;
    }
  }
});
