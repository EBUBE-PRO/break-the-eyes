import { useSupabase } from '~/composables/useSupabase';
import { defineStore } from 'pinia';

interface SettingsState {
  data: Record<string, any>;
  loading: boolean;
  error: string | null;
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    data: {},
    loading: false,
    error: null
  }),

  actions: {
    async fetchSettings() {
      const supabase = useSupabase();
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase.from('settings').select('*');
        if (error) throw error;

        this.data = (data as any[]).reduce((acc: any, curr) => {
          acc[curr.key] = curr.value;
          return acc;
        }, {});
      } catch (err: any) {
        this.error = 'Failed to load settings.';
        console.error('[Settings Store] Fetch Error:', err);
      } finally {
        this.loading = false;
      }
    },

    async updateSettings(settingsData: Record<string, any>) {
      const supabase = useSupabase();
      this.loading = true;
      this.error = null;
      
      try {
        for (const [key, value] of Object.entries(settingsData)) {
          const { error } = await supabase
            .from('settings')
            .upsert({ key, value, updated_at: new Date().toISOString() });
          if (error) throw error;
        }
        this.data = { ...this.data, ...settingsData };
        return true;
      } catch (err: any) {
        this.error = 'Failed to update settings.';
        console.error('[Settings Store] Update Error:', err);
        return false;
      } finally {
        this.loading = false;
      }
    }
  }
});
