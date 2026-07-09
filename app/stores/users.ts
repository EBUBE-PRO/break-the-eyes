import { useSupabase } from '~/composables/useSupabase';
import { defineStore } from 'pinia';

interface UserProfile {
  id: string;
  email: string;
  username: string;
  role: 'admin' | 'editor' | 'viewer';
  created_at: string;
}

interface UsersState {
  items: UserProfile[];
  loading: boolean;
  error: string | null;
}

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    items: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchUsers() {
      const supabase = useSupabase();
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        this.items = data as UserProfile[];
      } catch (err: any) {
        this.error = 'Failed to load users.';
      } finally {
        this.loading = false;
      }
    },

    async updateUserRole(id: string, role: string) {
      const supabase = useSupabase();
      this.loading = true;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .update({ role })
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        const index = this.items.findIndex(u => u.id === id);
        if (index !== -1) this.items[index] = data as UserProfile;
        return true;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to update user role.';
        return false;
      } finally {
        this.loading = false;
      }
    },

    clearError() { this.error = null; }
  }
});
