<template>
  <div class="admin-layout">
    <!-- Mobile Top Navbar -->
    <header class="mobile-topbar d-flex d-lg-none align-items-center justify-content-between px-3 py-2">
      <button class="hamburger-btn" @click="sidebarOpen = !sidebarOpen" aria-label="Toggle menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <img src="../../assets/images/brand-eye-black.svg" alt="BTE" height="30">
      <div class="avatar-sm bg-dark text-white rounded-circle d-flex align-items-center justify-content-center" style="width:32px;height:32px;font-size:0.8rem;flex-shrink:0;">
        {{ (user?.user_metadata?.username || user?.email || 'U').charAt(0).toUpperCase() }}
      </div>
    </header>

    <!-- Sidebar Overlay (Mobile) -->
    <transition name="fade">
      <div v-if="sidebarOpen" class="sidebar-overlay d-lg-none" @click="sidebarOpen = false"></div>
    </transition>

    <!-- Sidebar -->
    <aside :class="['admin-sidebar', { 'sidebar-open': sidebarOpen }]">
      <div class="sidebar-header d-flex align-items-center justify-content-between mb-4">
        <div class="d-flex align-items-center gap-2">
          <img src="../../assets/images/brand-eye-black.svg" alt="BTE" height="32">
          <span class="fw-black sidebar-brand-text">BTE CMS</span>
        </div>
        <button class="d-lg-none close-sidebar-btn" @click="sidebarOpen = false">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <nav class="sidebar-nav flex-grow-1">
        <button
          v-for="item in menuItems"
          :key="item.id"
          @click="selectTab(item.id)"
          class="sidebar-item w-100 text-start d-flex align-items-center gap-3"
          :class="{ 'sidebar-item-active': currentTab === item.id }"
        >
          <div class="sidebar-icon"><i :class="item.icon"></i></div>
          <span class="sidebar-label">{{ item.label }}</span>
          <span v-if="item.badge" class="ms-auto badge bg-danger rounded-pill sidebar-badge">{{ item.badge }}</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <div class="user-card d-flex align-items-center gap-3">
          <div class="avatar bg-dark text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
            {{ (user?.user_metadata?.username || user?.email || 'U').charAt(0).toUpperCase() }}
          </div>
          <div class="overflow-hidden flex-grow-1 sidebar-user-info">
            <p class="mb-0 fw-bold small text-truncate">{{ user?.user_metadata?.username || 'Admin' }}</p>
            <p class="mb-0 text-muted extra-small text-truncate">{{ user?.email }}</p>
          </div>
          <button class="logout-btn" @click="handleLogout" title="Logout">
            <i class="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="admin-main">
      <component :is="activeComponent" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';

import DashboardTab from '~/components/admin/tabs/DashboardTab.vue';
import PostsTab from '~/components/admin/tabs/PostsTab.vue';
import MediaTab from '~/components/admin/tabs/MediaTab.vue';
import ProjectsTab from '~/components/admin/tabs/ProjectsTab.vue';
import CategoriesTab from '~/components/admin/tabs/CategoriesTab.vue';
import WhatsAppTab from '~/components/admin/tabs/WhatsAppTab.vue';
import UsersTab from '~/components/admin/tabs/UsersTab.vue';
import SettingsTab from '~/components/admin/tabs/SettingsTab.vue';

definePageMeta({ layout: false, middleware: ['auth'] });

const { user, logout } = useAuth();
const currentTab = ref('dashboard');
const sidebarOpen = ref(false);

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'bi bi-speedometer2' },
  { id: 'posts', label: 'Content / Posts', icon: 'bi bi-file-earmark-text' },
  { id: 'media', label: 'Media Library', icon: 'bi bi-images' },
  { id: 'projects', label: 'Projects', icon: 'bi bi-grid-1x2' },
  { id: 'categories', label: 'Categories', icon: 'bi bi-tags' },
  { id: 'whatsapp', label: 'WhatsApp', icon: 'bi bi-whatsapp' },
  { id: 'users', label: 'Users', icon: 'bi bi-people' },
  { id: 'settings', label: 'Settings', icon: 'bi bi-gear' },
];

const tabComponents: Record<string, any> = {
  dashboard: DashboardTab,
  posts: PostsTab,
  media: MediaTab,
  projects: ProjectsTab,
  categories: CategoriesTab,
  whatsapp: WhatsAppTab,
  users: UsersTab,
  settings: SettingsTab
};

const activeComponent = computed(() => tabComponents[currentTab.value]);

function selectTab(id: string) {
  currentTab.value = id;
  sidebarOpen.value = false; // close sidebar on mobile after selection
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) logout();
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

* { font-family: 'Inter', sans-serif; }

/* ── Layout ── */
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f4f5f7;
}

/* ── Mobile Top Bar ── */
.mobile-topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  z-index: 1100;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.hamburger-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
}
.bar {
  display: block;
  width: 22px;
  height: 2px;
  background: #111;
  border-radius: 2px;
  transition: all 0.3s;
}

/* ── Overlay ── */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1200;
  backdrop-filter: blur(2px);
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── Sidebar ── */
.admin-sidebar {
  width: 260px;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1300;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
}

.sidebar-brand-text {
  color: #fff;
  font-size: 1rem;
  letter-spacing: -0.02em;
}
.close-sidebar-btn {
  background: none;
  border: none;
  color: rgba(255,255,255,0.5);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: color 0.2s;
}
.close-sidebar-btn:hover { color: #fff; }

/* ── Nav ── */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: auto;
}
.sidebar-item {
  background: none;
  border: none;
  border-radius: 10px;
  padding: 11px 12px;
  color: rgba(255,255,255,0.55);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
  font-weight: 500;
}
.sidebar-item:hover {
  background: rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.9);
}
.sidebar-item-active {
  background: rgba(178,34,34,0.2) !important;
  color: #fff !important;
  border: 1px solid rgba(178,34,34,0.35);
}
.sidebar-item-active .sidebar-icon { color: #ef4444; }

.sidebar-icon {
  width: 28px;
  text-align: center;
  font-size: 1rem;
  flex-shrink: 0;
}
.sidebar-badge { font-size: 0.65rem; }

/* ── Footer ── */
.sidebar-footer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.user-card {
  padding: 10px;
  border-radius: 10px;
  background: rgba(255,255,255,0.05);
}
.avatar {
  width: 34px;
  height: 34px;
  font-size: 0.8rem;
}
.extra-small { font-size: 0.7rem; }
.sidebar-user-info p { color: rgba(255,255,255,0.8); }
.sidebar-user-info .text-muted { color: rgba(255,255,255,0.4) !important; }
.logout-btn {
  background: none;
  border: none;
  color: rgba(255,255,255,0.35);
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;
  flex-shrink: 0;
}
.logout-btn:hover { color: #ef4444; background: rgba(239,68,68,0.1); }

/* ── Main Content ── */
.admin-main {
  margin-left: 260px;
  flex: 1;
  min-height: 100vh;
  padding: 32px;
  overflow-x: hidden;
}

/* ── Responsive ── */
@media (max-width: 991.98px) {
  .admin-sidebar {
    transform: translateX(-100%);
  }
  .admin-sidebar.sidebar-open {
    transform: translateX(0);
  }
  .admin-main {
    margin-left: 0;
    padding: 16px;
    padding-top: calc(56px + 16px); /* account for mobile topbar */
  }
}
</style>
