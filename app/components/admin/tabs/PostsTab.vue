<template>
  <div class="section-container">
    <AdminHeader 
      title="Content / Posts" 
      subtitle="Manage your articles and content"
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
      <p class="mt-3 text-muted">Loading posts...</p>
    </div>
    
    <div v-else-if="posts.length === 0" class="text-center py-5 bg-white rounded-4 border">
      <i class="bi bi-file-earmark-text display-4 text-muted mb-3 d-block"></i>
      <p class="text-muted">No posts found. Write your first article!</p>
      <button class="btn btn-dark mt-2" @click="openAddModal">Create Post</button>
    </div>

    <div v-else class="table-responsive bg-white rounded-4 border p-3">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Date</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td>
              <p class="mb-0 fw-semibold">{{ post.title }}</p>
              <small class="text-muted">{{ post.slug }}</small>
            </td>
            <td>
              <span class="badge" :class="post.status === 'published' ? 'bg-success' : 'bg-secondary'">
                {{ post.status }}
              </span>
            </td>
            <td>{{ new Date(post.created_at).toLocaleDateString() }}</td>
            <td class="text-end">
              <button class="btn btn-sm btn-light me-2" @click="handleEdit(post)">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="handleDelete(post.id)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Post Modal -->
    <div v-if="showModal" class="modal-overlay d-flex align-items-center justify-content-center">
      <div class="modal-card bg-white p-4 p-md-5 rounded-4 shadow-lg border w-100 overflow-y-auto" style="max-width: 800px; max-height: 90vh;">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold m-0">{{ editingId ? 'Edit Post' : 'Create New Post' }}</h3>
          <button @click="showModal = false" class="btn-close"></button>
        </div>

        <form @submit.prevent="savePost">
          <div class="row">
            <div class="col-md-8">
              <div class="mb-3">
                <label class="form-label fw-bold small">Post Title</label>
                <input v-model="formData.title" type="text" class="form-control rounded-3 py-2" required>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold small">Slug</label>
                <input v-model="formData.slug" type="text" class="form-control rounded-3 py-2" required>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold small">Excerpt</label>
                <textarea v-model="formData.excerpt" class="form-control rounded-3 py-2" rows="2"></textarea>
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold small">Content</label>
                <textarea v-model="formData.content" class="form-control rounded-3 py-2" rows="10" placeholder="Write your post content here..."></textarea>
              </div>
            </div>
            
            <div class="col-md-4">
              <div class="mb-3">
                <label class="form-label fw-bold small">Status</label>
                <select v-model="formData.status" class="form-select rounded-3 py-2">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              
              <div class="mb-3">
                <label class="form-label fw-bold small">Category</label>
                <select v-model="formData.category_id" class="form-select rounded-3 py-2">
                  <option :value="null">None</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="d-flex gap-3 justify-content-end mt-3">
            <button type="button" @click="showModal = false" class="btn btn-light px-4 py-2 rounded-3 border">Cancel</button>
            <button type="submit" class="btn btn-dark px-4 py-2 rounded-3" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
              {{ editingId ? 'Update' : 'Publish' }} Post
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';
import { useCategoriesStore } from '~/stores/categories';
import { storeToRefs } from 'pinia';
import AdminHeader from '~/components/admin/Header.vue';
import ErrorState from '~/components/shared/ErrorState.vue';

const postsStore = usePostsStore();
const categoriesStore = useCategoriesStore();

const { items: posts, loading, error } = storeToRefs(postsStore);
const { items: categories } = storeToRefs(categoriesStore);

const showModal = ref(false);
const editingId = ref<number | null>(null);

const formData = ref({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  status: 'draft',
  category_id: null
});

onMounted(() => {
  if(posts.value.length === 0) postsStore.fetchPosts();
  if(categories.value.length === 0) categoriesStore.fetchCategories();
});

watch(() => formData.value.title, (newTitle) => {
  if(!editingId.value) {
    formData.value.slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
});

const clearError = () => postsStore.clearError();

const openAddModal = () => {
  editingId.value = null;
  formData.value = { title: '', slug: '', excerpt: '', content: '', status: 'draft', category_id: null };
  showModal.value = true;
};

const handleEdit = (post: any) => {
  editingId.value = post.id;
  formData.value = { ...post };
  showModal.value = true;
};

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this post?')) {
    await postsStore.deletePost(id);
  }
};

const savePost = async () => {
  let success = false;
  if (editingId.value) {
    success = await postsStore.updatePost(editingId.value, formData.value);
  } else {
    success = await postsStore.addPost(formData.value);
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
.overflow-y-auto {
  overflow-y: auto;
}
</style>
