<template>
  <div class="section-container">
    <AdminHeader 
      title="Media Library" 
      subtitle="Upload and manage images and files"
    />

    <ErrorState 
      v-if="error" 
      :error="!!error" 
      :message="error" 
      @close="clearError"
    />

    <div class="bg-white p-4 rounded-4 shadow-sm border mb-4">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h5 class="fw-bold m-0">Upload New Media</h5>
      </div>
      <input type="file" ref="fileInput" class="d-none" @change="handleFileUpload" accept="image/*,video/*,audio/*,.pdf" />
      <div 
        class="upload-zone border border-2 border-dashed rounded-4 p-5 text-center bg-light cursor-pointer"
        @click="$refs.fileInput.click()"
      >
        <i class="bi bi-cloud-arrow-up display-4 text-primary mb-3"></i>
        <h5 class="fw-bold">Click to upload</h5>
        <p class="text-muted m-0">or drag and drop files here</p>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-dark" role="status"></div>
    </div>
    
    <div v-else-if="mediaItems.length === 0" class="text-center py-5">
      <p class="text-muted">No media files found.</p>
    </div>

    <div v-else class="row g-4">
      <div v-for="file in mediaItems" :key="file.name" class="col-6 col-md-4 col-xl-3">
        <div class="card border-0 shadow-sm rounded-4 overflow-hidden h-100 media-card">
          <div class="media-preview bg-light position-relative">
            <img v-if="file.type.includes('image')" :src="file.url" class="img-fluid object-fit-cover w-100 h-100" />
            <div v-else class="d-flex align-items-center justify-content-center h-100 p-4">
              <i class="bi bi-file-earmark display-1 text-muted"></i>
            </div>
            
            <div class="media-actions position-absolute top-0 end-0 p-2 opacity-0 transition-all">
              <button class="btn btn-sm btn-danger rounded-circle shadow" @click="handleDelete(file.name)">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
          <div class="p-3">
            <p class="mb-1 fw-bold small text-truncate" :title="file.name">{{ file.name }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">{{ (file.size / 1024).toFixed(2) }} KB</small>
              <button class="btn btn-sm btn-light py-0 px-2" @click="copyUrl(file.url)">Copy URL</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMediaStore } from '~/stores/media';
import { storeToRefs } from 'pinia';
import AdminHeader from '~/components/admin/Header.vue';
import ErrorState from '~/components/shared/ErrorState.vue';

const mediaStore = useMediaStore();
const { items: mediaItems, loading, error } = storeToRefs(mediaStore);
const fileInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if(mediaItems.value.length === 0) mediaStore.fetchMedia();
});

const clearError = () => mediaStore.clearError();

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    await mediaStore.uploadMedia(target.files[0]);
    if (fileInput.value) fileInput.value.value = ''; // Reset input
  }
};

const handleDelete = async (fileName: string) => {
  if (confirm('Are you sure you want to delete this file?')) {
    await mediaStore.deleteMedia(fileName);
  }
};

const copyUrl = (url: string) => {
  navigator.clipboard.writeText(url);
  alert('URL copied to clipboard!');
};
</script>

<style scoped>
.upload-zone {
  transition: background-color 0.2s;
  cursor: pointer;
}
.upload-zone:hover {
  background-color: #f1f3f5 !important;
}
.border-dashed {
  border-style: dashed !important;
}
.media-preview {
  height: 150px;
}
.media-card:hover .media-actions {
  opacity: 1;
}
.transition-all {
  transition: all 0.2s ease;
}
</style>
