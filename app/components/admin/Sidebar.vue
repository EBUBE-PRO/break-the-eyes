<template>
  <aside class="admin-sidebar shadow-sm bg-white position-fixed h-100 p-4 d-flex flex-column">
    <div class="text-center mb-5">
      <img src="../../assets/images/brand-eye-black.svg" alt="BTE" height="50" @error="(e) => e.target.style.display='none'">
      <h5 class="mt-2 fw-bold" v-if="!modelValue.includes('missing-logo')">BTE CMS</h5>
    </div>

    <nav class="nav flex-column gap-2 flex-grow-1 overflow-y-auto">
      <button 
        v-for="item in menuItems" 
        :key="item.id"
        @click="$emit('update:modelValue', item.id)"
        class="nav-link btn text-start d-flex align-items-center rounded-3 p-3 transition-all"
        :class="modelValue === item.id ? 'active-link bg-dark text-white' : 'text-muted hover-bg'"
      >
        <i :class="item.icon" class="me-3 fs-5"></i>
        <span class="fw-semibold">{{ item.label }}</span>
      </button>
    </nav>

    <div class="mt-auto pt-5">
      <div class="user-profile p-3 rounded-3 bg-light mb-4 d-flex align-items-center gap-3">
        <div class="avatar bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">
          {{ (user?.user_metadata?.username || user?.email || 'U').charAt(0).toUpperCase() }}
        </div>
        <div class="overflow-hidden">
          <p class="m-0 fw-bold small text-truncate">{{ user?.user_metadata?.username || user?.email || 'User' }}</p>
          <p class="m-0 text-muted extra-small">Admin</p>
        </div>
      </div>
      <button @click="handleLogout" class="btn btn-outline-danger w-100 rounded-3 p-2 d-flex align-items-center justify-content-center">
        <i class="bi bi-box-arrow-left me-2"></i>Logout
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';

defineProps<{
  modelValue: string;
}>();

defineEmits(['update:modelValue']);

const { user, logout } = useAuth();

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'bi bi-speedometer2' },
  { id: 'posts', label: 'Content / Posts', icon: 'bi bi-file-earmark-text' },
  { id: 'media', label: 'Media Library', icon: 'bi bi-images' },
  { id: 'projects', label: 'Projects', icon: 'bi bi-grid-1x2' },
  { id: 'categories', label: 'Categories', icon: 'bi bi-tags' },
  { id: 'whatsapp', label: 'WhatsApp Msgs', icon: 'bi bi-whatsapp' },
  { id: 'users', label: 'Users', icon: 'bi bi-people' },
  { id: 'settings', label: 'Settings & Profile', icon: 'bi bi-gear' }
];

const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    logout();
  }
};
</script>

<style scoped>
.admin-sidebar {
  width: 280px;
  background: white;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.avatar {
  width: 32px;
  height: 32px;
  font-size: 0.8rem;
}

.extra-small {
  font-size: 0.7rem;
}

.hover-bg:hover {
  background-color: rgba(0,0,0,0.05);
  transform: translateX(5px);
}

.active-link {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.overflow-y-auto {
  overflow-y: auto;
}
.overflow-y-auto::-webkit-scrollbar {
  width: 5px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

@media (max-width: 991.98px) {
  .admin-sidebar {
    width: 80px;
    padding: 20px 10px !important;
  }
  .admin-sidebar span, .user-profile, .mt-auto .fw-bold, .mt-2.fw-bold {
    display: none;
  }
  .admin-sidebar .me-3 {
    margin-right: 0 !important;
  }
  .user-profile {
    justify-content: center;
    padding: 10px !important;
  }
}
</style>
