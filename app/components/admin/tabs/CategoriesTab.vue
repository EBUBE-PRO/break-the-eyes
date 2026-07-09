<template>
  <div class="section-container">
    <AdminHeader 
      title="Categories" 
      subtitle="Organize your content effectively"
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
      <p class="mt-3 text-muted">Loading categories...</p>
    </div>
    
    <div v-else-if="categories.length === 0" class="text-center py-5 bg-white rounded-4 border">
      <i class="bi bi-tags display-4 text-muted mb-3 d-block"></i>
      <p class="text-muted">No categories found.</p>
      <button class="btn btn-dark mt-2" @click="openAddModal">Create Category</button>
    </div>

    <div v-else class="row g-4">
      <div v-for="cat in categories" :key="cat.id" class="col-md-6 col-xl-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 hover-card h-100">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <h5 class="fw-bold m-0">{{ cat.name }}</h5>
            <div>
              <button class="btn btn-sm btn-light me-2" @click="handleEdit(cat)"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger" @click="handleDelete(cat.id)"><i class="bi bi-trash"></i></button>
            </div>
          </div>
          <p class="text-muted small mb-0">{{ cat.description || 'No description provided.' }}</p>
          <div class="mt-3">
            <span class="badge bg-light text-dark border">Slug: {{ cat.slug }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay d-flex align-items-center justify-content-center">
      <div class="modal-card bg-white p-4 p-md-5 rounded-4 shadow-lg border w-100" style="max-width: 500px;">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold m-0">{{ editingId ? 'Edit Category' : 'Add Category' }}</h3>
          <button @click="showModal = false" class="btn-close"></button>
        </div>

        <form @submit.prevent="saveCategory">
          <div class="mb-3">
            <label class="form-label fw-bold small">Category Name</label>
            <input v-model="formData.name" type="text" class="form-control rounded-3 py-2" required>
          </div>

          <div class="mb-3">
            <label class="form-label fw-bold small">Slug</label>
            <input v-model="formData.slug" type="text" class="form-control rounded-3 py-2" required>
          </div>

          <div class="mb-4">
            <label class="form-label fw-bold small">Description</label>
            <textarea v-model="formData.description" class="form-control rounded-3 py-2" rows="3"></textarea>
          </div>

          <div class="d-flex gap-3">
            <button type="button" @click="showModal = false" class="btn btn-light flex-grow-1 py-2 rounded-3 border">Cancel</button>
            <button type="submit" class="btn btn-dark flex-grow-1 py-2 rounded-3" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
              {{ editingId ? 'Update' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoriesStore } from '~/stores/categories';
import { storeToRefs } from 'pinia';
import AdminHeader from '~/components/admin/Header.vue';
import ErrorState from '~/components/shared/ErrorState.vue';

const categoriesStore = useCategoriesStore();
const { items: categories, loading, error } = storeToRefs(categoriesStore);

const showModal = ref(false);
const editingId = ref<number | null>(null);

const formData = ref({
  name: '',
  slug: '',
  description: ''
});

onMounted(() => {
  if(categories.value.length === 0) categoriesStore.fetchCategories();
});

watch(() => formData.value.name, (newName) => {
  if(!editingId.value) {
    formData.value.slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
});

const clearError = () => categoriesStore.clearError();

const openAddModal = () => {
  editingId.value = null;
  formData.value = { name: '', slug: '', description: '' };
  showModal.value = true;
};

const handleEdit = (cat: any) => {
  editingId.value = cat.id;
  formData.value = { ...cat };
  showModal.value = true;
};

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this category?')) {
    await categoriesStore.deleteCategory(id);
  }
};

const saveCategory = async () => {
  let success = false;
  if (editingId.value) {
    success = await categoriesStore.updateCategory(editingId.value, formData.value);
  } else {
    success = await categoriesStore.addCategory(formData.value);
  }
  if (success) showModal.value = false;
};
</script>

<style scoped>
.hover-card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}
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
</style>
