<template>
  <div class="row g-4 animate-fade-in">
    <div class="col-md-3">
      <div class="card border-0 shadow-sm rounded-4 p-4 text-center hover-card">
        <i class="bi bi-file-earmark-text display-6 text-primary mb-3"></i>
        <h3 class="fw-bold">{{ postsCount }}</h3>
        <p class="text-muted m-0">Total Posts</p>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card border-0 shadow-sm rounded-4 p-4 text-center hover-card">
        <i class="bi bi-grid-1x2 display-6 text-success mb-3"></i>
        <h3 class="fw-bold">{{ projectsCount }}</h3>
        <p class="text-muted m-0">Total Projects</p>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card border-0 shadow-sm rounded-4 p-4 text-center hover-card">
        <i class="bi bi-whatsapp display-6 text-success mb-3"></i>
        <h3 class="fw-bold">{{ msgsCount }}</h3>
        <p class="text-muted m-0">New Messages</p>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card border-0 shadow-sm rounded-4 p-4 text-center hover-card">
        <i class="bi bi-people display-6 text-info mb-3"></i>
        <h3 class="fw-bold">{{ usersCount }}</h3>
        <p class="text-muted m-0">Total Users</p>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <div class="card border-0 shadow-sm rounded-4 p-4">
        <h5 class="fw-bold mb-4">Recent System Activity</h5>
        <div class="text-center py-5 text-muted">
          <i class="bi bi-activity display-4 mb-3 d-block opacity-50"></i>
          <p>System activity tracking will be fully implemented soon.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';
import { useProjectsStore } from '~/stores/projects';
import { useWhatsAppStore } from '~/stores/whatsapp_messages';
import { useUsersStore } from '~/stores/users';
import { storeToRefs } from 'pinia';

const postsStore = usePostsStore();
const projectsStore = useProjectsStore();
const waStore = useWhatsAppStore();
const usersStore = useUsersStore();

const { items: posts } = storeToRefs(postsStore);
const { items: projects } = storeToRefs(projectsStore);
const { items: msgs } = storeToRefs(waStore);
const { items: users } = storeToRefs(usersStore);

const postsCount = computed(() => posts.value.length);
const projectsCount = computed(() => projects.value.length);
const msgsCount = computed(() => msgs.value.filter(m => m.status === 'new').length);
const usersCount = computed(() => users.value.length);

onMounted(async () => {
  postsStore.fetchPosts();
  projectsStore.fetchProjects();
  waStore.fetchMessages();
  usersStore.fetchUsers();
});
</script>

<style scoped>
.hover-card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}
</style>
