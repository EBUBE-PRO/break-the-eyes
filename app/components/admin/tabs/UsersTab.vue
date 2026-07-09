<template>
  <div class="section-container">
    <AdminHeader 
      title="Users & Access" 
      subtitle="Manage system users and roles"
    />

    <ErrorState 
      v-if="error" 
      :error="!!error" 
      :message="error" 
      @close="clearError"
    />

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-dark" role="status"></div>
    </div>
    
    <div v-else class="table-responsive bg-white rounded-4 border p-3">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id">
            <td>
              <div class="d-flex align-items-center gap-3">
                <div class="avatar bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">
                  {{ (u.username || u.email).charAt(0).toUpperCase() }}
                </div>
                <p class="mb-0 fw-bold">{{ u.username || 'N/A' }}</p>
              </div>
            </td>
            <td>{{ u.email }}</td>
            <td>
              <select 
                class="form-select form-select-sm w-auto rounded-3" 
                :value="u.role"
                @change="(e) => updateRole(u.id, (e.target as HTMLSelectElement).value)"
                :disabled="u.id === currentUser?.id"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </td>
            <td>{{ new Date(u.created_at).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="mt-4 p-4 bg-primary-subtle rounded-4 border-primary border opacity-75">
      <h6 class="fw-bold"><i class="bi bi-info-circle me-2"></i> Adding New Users</h6>
      <p class="small m-0">To add new users, they must sign up through the authentication portal or you can invite them via the Supabase Dashboard.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '~/stores/users';
import { useAuth } from '~/composables/useAuth';
import { storeToRefs } from 'pinia';
import AdminHeader from '~/components/admin/Header.vue';
import ErrorState from '~/components/shared/ErrorState.vue';

const usersStore = useUsersStore();
const { user: currentUser } = useAuth();
const { items: users, loading, error } = storeToRefs(usersStore);

onMounted(() => {
  usersStore.fetchUsers();
});

const clearError = () => usersStore.clearError();

const updateRole = async (id: string, role: string) => {
  if (confirm(`Change this user's role to ${role}?`)) {
    await usersStore.updateUserRole(id, role);
  }
};
</script>

<style scoped>
.avatar {
  width: 32px;
  height: 32px;
  font-size: 0.8rem;
}
</style>
