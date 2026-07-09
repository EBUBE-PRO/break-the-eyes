import { useSupabase } from '~/composables/useSupabase';
import { defineStore } from 'pinia';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

export const useCategoriesStore = defineStore('categories', {
  state: (): CategoriesState => ({
    items: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchCategories() {
      const supabase = useSupabase();
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true });
          
        if (error) throw error;
        this.items = data as Category[];
      } catch (err: any) {
        this.error = 'Failed to load categories.';
      } finally {
        this.loading = false;
      }
    },

    async addCategory(categoryData: Partial<Category>) {
      const supabase = useSupabase();
      this.loading = true;
      try {
        const { data, error } = await supabase
          .from('categories')
          .insert(categoryData)
          .select()
          .single();
        if (error) throw error;
        this.items.push(data as Category);
        return true;
      } catch (err: any) {
        this.error = err.message || 'Failed to add category.';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async updateCategory(id: number, categoryData: Partial<Category>) {
      const supabase = useSupabase();
      this.loading = true;
      try {
        const { data, error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        const index = this.items.findIndex(c => c.id === id);
        if (index !== -1) this.items[index] = data as Category;
        return true;
      } catch (err: any) {
        this.error = err.message || 'Failed to update category.';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async deleteCategory(id: number) {
      const supabase = useSupabase();
      this.loading = true;
      try {
        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (error) throw error;
        this.items = this.items.filter(c => c.id !== id);
        return true;
      } catch (err: any) {
        this.error = 'Failed to delete category.';
        return false;
      } finally {
        this.loading = false;
      }
    },

    clearError() { this.error = null; }
  }
});
