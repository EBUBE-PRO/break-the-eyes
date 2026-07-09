<template>
  <div class="section-container">
    <AdminHeader 
      title="Settings & Profile" 
      subtitle="Configure website information and preferences"
    />

    <ErrorState 
      v-if="error" 
      :error="!!error" 
      :message="error" 
      @close="clearError"
    />

    <div class="row g-4">
      <div class="col-xl-8">
        <!-- Site Info -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
          <div class="card-header bg-white border-bottom-0 pt-4 px-4 pb-0">
            <h5 class="fw-bold"><i class="bi bi-globe me-2"></i> Website Information</h5>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="saveSettings">
              <div class="mb-3">
                <label class="form-label small fw-bold">Site Title</label>
                <input v-model="siteInfo.title" type="text" class="form-control rounded-3 py-2">
              </div>
              <div class="mb-4">
                <label class="form-label small fw-bold">Site Description</label>
                <textarea v-model="siteInfo.description" class="form-control rounded-3 py-2" rows="3"></textarea>
              </div>
              <button type="submit" class="btn btn-dark rounded-3 px-4" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Save Site Info
              </button>
            </form>
          </div>
        </div>

        <!-- Contact Details -->
        <div class="card border-0 shadow-sm rounded-4">
          <div class="card-header bg-white border-bottom-0 pt-4 px-4 pb-0">
            <h5 class="fw-bold"><i class="bi bi-telephone me-2"></i> Contact Details</h5>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="saveContact">
              <div class="mb-3">
                <label class="form-label small fw-bold">Contact Email</label>
                <input v-model="contactDetails.email" type="email" class="form-control rounded-3 py-2">
              </div>
              <div class="row">
                <div class="col-md-6 mb-4">
                  <label class="form-label small fw-bold">Phone Number</label>
                  <input v-model="contactDetails.phone" type="text" class="form-control rounded-3 py-2">
                </div>
                <div class="col-md-6 mb-4">
                  <label class="form-label small fw-bold">WhatsApp Number</label>
                  <input v-model="contactDetails.whatsapp" type="text" class="form-control rounded-3 py-2">
                </div>
              </div>
              <button type="submit" class="btn btn-dark rounded-3 px-4" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Save Contact Details
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <!-- User Profile -->
        <div class="card border-0 shadow-sm rounded-4">
          <div class="card-header bg-dark text-white border-bottom-0 p-4 rounded-top-4 d-flex align-items-center gap-3">
            <div class="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px; font-size: 1.5rem; font-weight: bold;">
              {{ (user?.user_metadata?.username || user?.email || 'U').charAt(0).toUpperCase() }}
            </div>
            <div>
              <h5 class="fw-bold m-0">{{ user?.user_metadata?.username || 'Admin User' }}</h5>
              <p class="m-0 text-white-50 small">{{ user?.email }}</p>
            </div>
          </div>
          <div class="card-body p-4 text-center">
            <p class="text-muted small mb-4">To update your password or profile picture, please use the Supabase Auth system.</p>
            <button class="btn btn-outline-danger w-100 rounded-3" @click="handleLogout">Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings';
import { useAuth } from '~/composables/useAuth';
import { storeToRefs } from 'pinia';
import AdminHeader from '~/components/admin/Header.vue';
import ErrorState from '~/components/shared/ErrorState.vue';

const settingsStore = useSettingsStore();
const { data: settingsData, loading, error } = storeToRefs(settingsStore);
const { user, logout } = useAuth();

const siteInfo = ref({ title: '', description: '' });
const contactDetails = ref({ email: '', phone: '', whatsapp: '' });

onMounted(async () => {
  await settingsStore.fetchSettings();
  if (settingsData.value.site_info) {
    siteInfo.value = { ...siteInfo.value, ...settingsData.value.site_info };
  }
  if (settingsData.value.contact_details) {
    contactDetails.value = { ...contactDetails.value, ...settingsData.value.contact_details };
  }
});

const clearError = () => settingsStore.error = null;

const saveSettings = async () => {
  await settingsStore.updateSettings({ site_info: siteInfo.value });
  alert('Site information saved successfully!');
};

const saveContact = async () => {
  await settingsStore.updateSettings({ contact_details: contactDetails.value });
  alert('Contact details saved successfully!');
};

const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    logout();
  }
};
</script>
