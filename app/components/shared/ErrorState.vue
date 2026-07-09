<template>
  <div v-if="error" class="error-state-container p-4 rounded-4 border d-flex align-items-center gap-3 animate-fade-in mb-4">
    <div class="error-icon-wrapper d-flex align-items-center justify-content-center flex-shrink-0">
      <i class="bi bi-exclamation-triangle-fill fs-4"></i>
    </div>
    <div class="flex-grow-1">
      <h6 class="fw-bold m-0 text-dark">Something went wrong</h6>
      <p class="text-muted small m-0">{{ errorMsg }}</p>
    </div>
    <button v-if="retry" @click="$emit('retry')" class="btn btn-sm btn-outline-dark rounded-pill px-3 py-1">
      <i class="bi bi-arrow-clockwise me-1"></i>Retry
    </button>
    <button @click="$emit('close')" class="btn-close small"></button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error: boolean;
  message?: string;
  retry?: boolean;
}

const props = defineProps<Props>();
defineEmits(['retry', 'close']);

const errorMsg = computed(() => props.message || 'An unexpected error occurred. Please try again.');
</script>

<style scoped>
.error-state-container {
  background: #fff5f5;
  border-color: #feb2b2 !important;
  box-shadow: 0 4px 12px rgba(229, 62, 62, 0.05);
}

.error-icon-wrapper {
  width: 44px;
  height: 44px;
  background: #fed7d7;
  color: #c53030;
  border-radius: 12px;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
