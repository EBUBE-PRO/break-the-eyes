<template>
  <header class="d-flex align-items-center justify-content-between mb-5">
    <div>
      <h1 class="h2 fw-bold text-dark">{{ title }}</h1>
      <p class="text-muted small">{{ subtitle }}</p>
    </div>
    <div v-if="showAddButton">
      <button class="btn btn-dark px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2" @click="$emit('add')">
        <i class="bi bi-plus-lg"></i>
        <span>Add New</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  showAddButton?: boolean;
}>();

defineEmits(['add']);
</script>
