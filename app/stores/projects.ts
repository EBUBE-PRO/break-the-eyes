import { useSupabase } from '~/composables/useSupabase';
import { defineStore } from 'pinia';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  created_at: string;
}

interface ProjectsState {
  items: Project[];
  loading: boolean;
  error: string | null;
}

export const useProjectsStore = defineStore('projects', {
  state: (): ProjectsState => ({
    items: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchProjects() {
      const supabase = useSupabase();
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        this.items = data as Project[];
      } catch (err: any) {
        this.error = 'Failed to load projects. Please try again.';
        console.error('[Projects Store] Fetch Error:', err);
      } finally {
        this.loading = false;
      }
    },

    async addProject(projectData: Partial<Project>) {
      const supabase = useSupabase();
      this.loading = true;
      this.error = null;
      
      try {
        const { data, error } = await supabase
          .from('projects')
          .insert(projectData)
          .select()
          .single();
          
        if (error) throw error;
        
        this.items.unshift(data as Project);
        return true;
      } catch (err: any) {
        this.error = err.message || 'Failed to add project.';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async updateProject(id: number, projectData: Partial<Project>) {
      const supabase = useSupabase();
      this.loading = true;
      try {
        const { data, error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        
        const index = this.items.findIndex(p => p.id === id);
        if (index !== -1) this.items[index] = data as Project;
        return true;
      } catch (err: any) {
        this.error = err.message || 'Failed to update project.';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async deleteProject(id: number) {
      const supabase = useSupabase();
      this.loading = true;
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        this.items = this.items.filter(p => p.id !== id);
        return true;
      } catch (err: any) {
        this.error = 'Failed to delete project.';
        return false;
      } finally {
        this.loading = false;
      }
    },

    clearError() { this.error = null; }
  }
});
