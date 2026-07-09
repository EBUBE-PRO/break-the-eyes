<template>
  <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden project-card transition-all">
    <div class="position-relative">
      <img :src="project.image_url || 'https://via.placeholder.com/400x200?text=No+Image'" class="card-img-top" height="200" style="object-fit: cover;">
      <div class="category-badge position-absolute top-0 end-0 m-3">
        <span class="badge bg-white text-dark shadow-sm px-3 py-2 rounded-pill small fw-bold">{{ project.category }}</span>
      </div>
    </div>
    <div class="card-body p-4 d-flex flex-column">
      <h5 class="fw-bold mb-2 text-dark">{{ project.title }}</h5>
      <p class="text-muted small line-clamp-3 mb-4 flex-grow-1">{{ project.description }}</p>
      
      <div class="d-flex gap-2 mt-auto">
        <button class="btn btn-sm btn-light flex-grow-1 py-2 rounded-3 border fw-semibold" @click="$emit('edit', project)">
          <i class="bi bi-pencil-square me-2"></i>Edit
        </button>
        <button @click="$emit('delete', project.id)" class="btn btn-sm btn-outline-danger py-2 rounded-3">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types/cms';

defineProps<{
  project: Project;
}>();

defineEmits(['edit', 'delete']);
</script>

<style scoped>
.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.1) !important;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.transition-all {
  transition: all 0.3s ease;
}
</style>
