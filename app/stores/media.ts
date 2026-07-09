import { useSupabase } from '~/composables/useSupabase';
import { defineStore } from 'pinia';

interface MediaFile {
  name: string;
  url: string;
  size: number;
  type: string;
  created_at: string;
}

interface MediaState {
  items: MediaFile[];
  loading: boolean;
  error: string | null;
}

export const useMediaStore = defineStore('media', {
  state: (): MediaState => ({
    items: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchMedia() {
      const supabase = useSupabase();
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase
          .storage
          .from('media')
          .list('', { sortBy: { column: 'created_at', order: 'desc' } });
          
        if (error) throw error;
        
        this.items = (data || []).map((file: any) => {
          const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(file.name);
          return {
            name: file.name,
            url: publicUrl,
            size: file.metadata?.size || 0,
            type: file.metadata?.mimetype || 'unknown',
            created_at: file.created_at
          };
        });
      } catch (err: any) {
        this.error = 'Failed to load media.';
        console.error('[Media Store] Fetch Error:', err);
      } finally {
        this.loading = false;
      }
    },

    async uploadMedia(file: File) {
      const supabase = useSupabase();
      this.loading = true;
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        
        const { error } = await supabase.storage
          .from('media')
          .upload(fileName, file);

        if (error) throw error;
        await this.fetchMedia();
        return true;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to upload file.';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async deleteMedia(fileName: string) {
      const supabase = useSupabase();
      this.loading = true;
      try {
        const { error } = await supabase.storage.from('media').remove([fileName]);
        if (error) throw error;
        this.items = this.items.filter(m => m.name !== fileName);
        return true;
      } catch (err: any) {
        this.error = 'Failed to delete file.';
        return false;
      } finally {
        this.loading = false;
      }
    },

    clearError() { this.error = null; }
  }
});
