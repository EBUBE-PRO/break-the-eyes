import { useSupabase } from '~/composables/useSupabase';
import { defineStore } from 'pinia';
import type { Database } from '../types/supabase';

export interface Lead {
  id: number;
  full_name: string;
  email: string;
  message: string;
  source_page?: string;
  created_at: string;
}

interface LeadsState {
  items: Lead[];
  loading: boolean;
  error: string | null;
}

export const useLeadsStore = defineStore('leads', {
  state: (): LeadsState => ({
    items: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchLeads() {
      const supabase = useSupabase();
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        this.items = data as Lead[];
      } catch (err: any) {
        this.error = 'Failed to load leads.';
        console.error('[Leads Store] Fetch Error:', err);
      } finally {
        this.loading = false;
      }
    },

    async deleteLead(id: number) {
      const supabase = useSupabase();
      this.loading = true;
      try {
        const { error } = await supabase
          .from('leads')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        this.items = this.items.filter(l => l.id !== id);
        return true;
      } catch (err: any) {
        this.error = 'Failed to delete lead.';
        return false;
      } finally {
        this.loading = false;
      }
    }
  }
});
