import { useSupabase } from '~/composables/useSupabase';
import { defineStore } from 'pinia';

export interface WhatsAppMessage {
  id: number;
  sender_name: string;
  sender_phone: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

interface MessagesState {
  items: WhatsAppMessage[];
  loading: boolean;
  error: string | null;
}

export const useWhatsAppStore = defineStore('whatsapp', {
  state: (): MessagesState => ({
    items: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchMessages() {
      const supabase = useSupabase();
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase
          .from('whatsapp_messages')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        this.items = data as WhatsAppMessage[];
      } catch (err: any) {
        this.error = 'Failed to load messages.';
      } finally {
        this.loading = false;
      }
    },

    async updateStatus(id: number, status: 'new' | 'read' | 'replied') {
      const supabase = useSupabase();
      this.loading = true;
      try {
        const { data, error } = await supabase
          .from('whatsapp_messages')
          .update({ status })
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        const index = this.items.findIndex(m => m.id === id);
        if (index !== -1) this.items[index] = data as WhatsAppMessage;
        return true;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to update status.';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async deleteMessage(id: number) {
      const supabase = useSupabase();
      this.loading = true;
      try {
        const { error } = await supabase.from('whatsapp_messages').delete().eq('id', id);
        if (error) throw error;
        this.items = this.items.filter(m => m.id !== id);
        return true;
      } catch (err: any) {
        this.error = 'Failed to delete message.';
        return false;
      } finally {
        this.loading = false;
      }
    }
  }
});
