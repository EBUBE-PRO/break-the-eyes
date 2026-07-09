<template>
  <div class="section-container">
    <AdminHeader 
      title="WhatsApp Messages" 
      subtitle="Track inquiries and respond to users"
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
    
    <div v-else-if="messages.length === 0" class="text-center py-5 bg-white rounded-4 border">
      <i class="bi bi-chat-dots display-4 text-muted mb-3 d-block"></i>
      <p class="text-muted">No messages found.</p>
    </div>

    <div v-else class="table-responsive bg-white rounded-4 border p-3">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th>Sender</th>
            <th>Message Preview</th>
            <th>Status</th>
            <th>Date</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="msg in messages" :key="msg.id">
            <td>
              <p class="mb-0 fw-bold">{{ msg.sender_name }}</p>
              <small class="text-muted">{{ msg.sender_phone }}</small>
            </td>
            <td style="max-width: 300px;" class="text-truncate">
              {{ msg.message }}
            </td>
            <td>
              <select 
                class="form-select form-select-sm w-auto rounded-3" 
                :class="{
                  'bg-success-subtle text-success': msg.status === 'replied',
                  'bg-warning-subtle text-warning': msg.status === 'new',
                  'bg-info-subtle text-info': msg.status === 'read'
                }"
                :value="msg.status"
                @change="(e) => updateStatus(msg.id, (e.target as HTMLSelectElement).value as any)"
              >
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </td>
            <td>{{ new Date(msg.created_at).toLocaleDateString() }}</td>
            <td class="text-end">
              <a :href="`https://wa.me/${msg.sender_phone.replace(/[^0-9]/g, '')}`" target="_blank" class="btn btn-sm btn-success me-2">
                <i class="bi bi-whatsapp"></i> Reply
              </a>
              <button class="btn btn-sm btn-outline-danger" @click="handleDelete(msg.id)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWhatsAppStore } from '~/stores/whatsapp_messages';
import { storeToRefs } from 'pinia';
import AdminHeader from '~/components/admin/Header.vue';
import ErrorState from '~/components/shared/ErrorState.vue';

const waStore = useWhatsAppStore();
const { items: messages, loading, error } = storeToRefs(waStore);

onMounted(() => {
  waStore.fetchMessages();
});

const clearError = () => waStore.error = null;

const updateStatus = async (id: number, status: 'new' | 'read' | 'replied') => {
  await waStore.updateStatus(id, status);
};

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this message record?')) {
    await waStore.deleteMessage(id);
  }
};
</script>
