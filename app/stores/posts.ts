import { useSupabase } from '~/composables/useSupabase';
import { defineStore } from 'pinia';

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published';
  category_id: number | null;
  featured_image: string;
  created_at: string;
}

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
}

export const usePostsStore = defineStore('posts', {
  state: (): PostsState => ({
    items: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchPosts() {
      const supabase = useSupabase();
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        this.items = data as Post[];
      } catch (err: any) {
        this.error = 'Failed to load posts. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    async addPost(postData: Partial<Post>) {
      const supabase = useSupabase();
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase
          .from('posts')
          .insert(postData)
          .select()
          .single();
          
        if (error) throw error;
        this.items.unshift(data as Post);
        return true;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to add post.';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async updatePost(id: number, postData: Partial<Post>) {
      const supabase = useSupabase();
      this.loading = true;
      try {
        const { data, error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        const index = this.items.findIndex(p => p.id === id);
        if (index !== -1) this.items[index] = data as Post;
        return true;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to update post.';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async deletePost(id: number) {
      const supabase = useSupabase();
      this.loading = true;
      try {
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (error) throw error;
        this.items = this.items.filter(p => p.id !== id);
        return true;
      } catch (err: any) {
        this.error = 'Failed to delete post.';
        return false;
      } finally {
        this.loading = false;
      }
    },

    clearError() { this.error = null; }
  }
});
