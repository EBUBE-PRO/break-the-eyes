<script setup>
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

onMounted(() => {
  authStore.init();
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

