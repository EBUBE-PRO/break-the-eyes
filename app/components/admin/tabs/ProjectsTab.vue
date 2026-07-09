<template>
  <div class="section-container">
    <AdminHeader 
      title="Projects" 
      subtitle="Manage your portfolio projects"
      :show-add-button="true"
      @add="openAddModal"
    />

    <ErrorState 
      v-if="error" 
      :error="!!error" 
      :message="error" 
      @close="clearError"
    />

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-dark" role="status"></div>
      <p class="mt-3 text-muted">Loading projects...</p>
    </div>
    
    <div v-else-if="projects.length === 0" class="text-center py-5 bg-white rounded-4 border">
      <i class="bi bi-folder2-open display-4 text-muted mb-3 d-block"></i>
      <p class="text-muted">No projects found. Create your first one!</p>
      <button class="btn btn-dark mt-2" @click="openAddModal">Add Project</button>
    </div>

    <div v-else class="row g-4 animate-fade-in">
      <div v-for="project in projects" :key="project.id" class="col-md-6 col-xl-4">
        <AdminProjectCard 
          :project="project" 
          @edit="handleEdit" 
          @delete="handleDelete" 
        />
      </div>
    </div>

    <!-- Add Project Modal -->
    <div v-if="showModal" class="modal-overlay d-flex align-items-center justify-content-center">
      <div class="modal-card bg-white p-4 p-md-5 rounded-4 shadow-lg border w-100" style="max-width: 600px;">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold m-0">{{ editingId ? 'Edit Project' : 'Add New Project' }}</h3>
          <button @click="showModal = false" class="btn-close"></button>
        </div>

        <form @submit.prevent="saveProject">
          <div class="mb-3">
            <label class="form-label fw-bold small">Project Title</label>
            <input v-model="formData.title" type="text" class="form-control rounded-3 py-2" placeholder="e.g. Digital Branding Campaign" required>
          </div>

          <div class="mb-3">
            <label class="form-label fw-bold small">Category</label>
            <select v-model="formData.category" class="form-select rounded-3 py-2" required>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label fw-bold small">Image URL</label>
            <input v-model="formData.image_url" type="text" class="form-control rounded-3 py-2" placeholder="Paste image link here">
          </div>

          <div class="mb-4">
            <label class="form-label fw-bold small">Description</label>
            <textarea v-model="formData.description" class="form-control rounded-3 py-2" rows="3" placeholder="Brief project summary..." required></textarea>
          </div>

          <div class="d-flex gap-3">
            <button type="button" @click="showModal = false" class="btn btn-light flex-grow-1 py-2 rounded-3 border">Cancel</button>
            <button type="submit" class="btn btn-dark flex-grow-1 py-2 rounded-3" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
              {{ editingId ? 'Update' : 'Save' }} Project
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from '~/stores/projects';
import { storeToRefs } from 'pinia';
import AdminHeader from '~/components/admin/Header.vue';
import AdminProjectCard from '~/components/admin/ProjectCard.vue';
import ErrorState from '~/components/shared/ErrorState.vue';

const projectStore = useProjectsStore();
const { items: projects, loading, error } = storeToRefs(projectStore);

const showModal = ref(false);
const editingId = ref<number | null>(null);

const formData = ref({
  title: '',
  category: 'Digital Branding & Strategy',
  description: '',
  image_url: ''
});

const categories = [
  'Digital Branding & Strategy',
  'Multimedia Production',
  'Tech & Digital Solutions',
  'Events & PR Solutions'
];

onMounted(() => {
  if(projects.value.length === 0) {
    projectStore.fetchProjects();
  }
});

const clearError = () => {
  projectStore.clearError();
};

const openAddModal = () => {
  editingId.value = null;
  formData.value = { title: '', category: categories[0], description: '', image_url: '' };
  showModal.value = true;
};

const handleEdit = (project: any) => {
  editingId.value = project.id;
  formData.value = { ...project };
  showModal.value = true;
};

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this project?')) {
    await projectStore.deleteProject(id);
  }
};

const saveProject = async () => {
  let success = false;
  if (editingId.value) {
    success = await projectStore.updateProject(editingId.value, formData.value);
  } else {
    success = await projectStore.addProject(formData.value);
  }
  if (success) {
    showModal.value = false;
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(5px);
  z-index: 2000;
  padding: 20px;
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
