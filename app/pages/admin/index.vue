<template>
  <div class="admin-dashboard min-vh-100 bg-light">
    <!-- Sidebar -->
    <aside class="admin-sidebar shadow-sm bg-white position-fixed h-100 p-4">
      <div class="text-center mb-5">
        <img src="../../assets/images/brand-eye-black.svg" alt="BTE" height="50">
      </div>

      <nav class="nav flex-column gap-2">
        <button 
          v-for="item in menuItems" 
          :key="item.id"
          @click="currentTab = item.id"
          class="nav-link btn text-start d-flex align-items-center rounded-3 p-3 transition-all"
          :class="currentTab === item.id ? 'active-link bg-dark text-white' : 'text-muted hover-bg'"
        >
          <i :class="item.icon" class="me-3 fs-5"></i>
          <span class="fw-semibold">{{ item.label }}</span>
        </button>
      </nav>

      <div class="mt-auto pt-5">
        <button @click="handleLogout" class="btn btn-outline-danger w-100 rounded-3 p-2 d-flex align-items-center justify-content-center">
          <i class="bi bi-box-arrow-left me-2"></i>Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="admin-main p-4 p-md-5">
      <header class="d-flex align-items-center justify-content-between mb-5">
        <div>
          <h1 class="h2 fw-bold text-dark">{{ activeMenuLabel }}</h1>
          <p class="text-muted small">Manage your business operations efficiently</p>
        </div>
        <div v-if="currentTab !== 'leads'">
          <button class="btn btn-dark px-4 py-2 rounded-3 shadow-sm" @click="openAddModal">
            <i class="bi bi-plus-lg me-2"></i>Add New
          </button>
        </div>
      </header>

      <!-- Leads Section -->
      <section v-if="currentTab === 'leads'" class="section-card bg-white p-4 rounded-4 shadow-sm border">
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-dark" role="status"></div>
        </div>
        <div v-else-if="leads.length === 0" class="text-center py-5">
          <i class="bi bi-envelope-open display-4 text-muted mb-3 d-block"></i>
          <p class="text-muted">No leads found yet.</p>
        </div>
        <div v-else class="table-responsive">
          <table class="table align-middle">
            <thead class="text-muted small border-top-0">
              <tr>
                <th class="ps-0 py-3">NAME</th>
                <th class="py-3">EMAIL</th>
                <th class="py-3">MESSAGE</th>
                <th class="py-3">DATE</th>
                <th class="text-end py-3">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lead in leads" :key="lead.id" class="border-bottom">
                <td class="ps-0 py-3">
                  <span class="fw-bold">{{ lead.full_name }}</span>
                </td>
                <td class="py-3 text-muted">{{ lead.email }}</td>
                <td class="py-3">
                  <span class="text-truncate d-inline-block text-muted" style="max-width: 300px;">
                    {{ lead.message }}
                  </span>
                </td>
                <td class="py-3 text-muted small">{{ formatDate(lead.created_at) }}</td>
                <td class="text-end py-3">
                  <a :href="'https://wa.me/2349025837982?text=Hello ' + lead.full_name + ', replying to your inquiry: ' + lead.message" 
                     target="_blank" 
                     class="btn btn-sm btn-outline-success rounded-pill px-3">
                    <i class="bi bi-whatsapp me-1"></i>Reply
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Projects Section -->
      <section v-else-if="currentTab === 'projects'" class="section-container">
        <div class="row g-4">
          <div v-for="project in projects" :key="project.id" class="col-md-6 col-xl-4">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <img :src="project.image_url" class="card-img-top" height="200" style="object-fit: cover;">
              <div class="card-body p-4">
                <span class="badge bg-light text-dark mb-2 px-3 rounded-pill">{{ project.category }}</span>
                <h5 class="fw-bold mb-3">{{ project.title }}</h5>
                <p class="text-muted small line-clamp-3">{{ project.description }}</p>
                <div class="d-flex gap-2 mt-4">
                  <button class="btn btn-sm btn-light flex-grow-1 py-2 rounded-3 border">Edit</button>
                  <button @click="deleteItem('projects', project.id)" class="btn btn-sm btn-outline-danger py-2 rounded-3">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Add Project Modal -->
        <div v-if="showModal" class="modal-overlay d-flex align-items-center justify-content-center">
          <div class="modal-card bg-white p-4 p-md-5 rounded-4 shadow-lg border w-100" style="max-width: 600px;">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h3 class="fw-bold m-0">Add New Project</h3>
              <button @click="showModal = false" class="btn-close"></button>
            </div>

            <form @submit.prevent="saveProject">
              <div class="mb-3">
                <label class="form-label fw-bold small">Project Title</label>
                <input v-model="newProject.title" type="text" class="form-control rounded-3 py-2" placeholder="e.g. Jane Egerton-Idehen" required>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold small">Category</label>
                <select v-model="newProject.category" class="form-select rounded-3 py-2" required>
                  <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold small">Image URL</label>
                <input v-model="newProject.image_url" type="text" class="form-control rounded-3 py-2" placeholder="Paste image link here" required>
                <small class="text-muted">Tip: Use a direct link to an image.</small>
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold small">Description</label>
                <textarea v-model="newProject.description" class="form-control rounded-3 py-2" rows="3" placeholder="Brief project summary..." required></textarea>
              </div>

              <div class="d-flex gap-3">
                <button type="button" @click="showModal = false" class="btn btn-light flex-grow-1 py-2 rounded-3 border">Cancel</button>
                <button type="submit" class="btn btn-dark flex-grow-1 py-2 rounded-3" :disabled="saving">
                  <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- Services Section placeholder -->
      <section v-else-if="currentTab === 'services'" class="bg-white p-5 rounded-4 text-center border">
        <h3 class="text-muted">Services Management coming soon</h3>
      </section>
    </main>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const currentTab = ref('leads')
const loading = ref(true)
const leads = ref([])
const projects = ref([])
const showModal = ref(false)
const saving = ref(false)
const newProject = ref({
  title: '',
  category: 'Digital Branding & Strategy',
  description: '',
  image_url: ''
})

const categories = [
  'Digital Branding & Strategy',
  'Multimedia Production',
  'Tech & Digital Solutions',
  'Events & PR Solutions'
];

definePageMeta({
  middleware: ['auth']
})

const menuItems = [
  { id: 'leads', label: 'Inquiries & Leads', icon: 'bi bi-envelope-heart' },
  { id: 'projects', label: 'Manage Projects', icon: 'bi bi-grid-1x2' },
  { id: 'services', label: 'Brand Services', icon: 'bi bi-award' }
]

const activeMenuLabel = computed(() => {
  return menuItems.find(item => item.id === currentTab.value)?.label
})

onMounted(() => {
  fetchData()
})

watch(currentTab, () => {
  fetchData()
})

async function fetchData() {
  loading.value = true
  if (currentTab.value === 'leads') {
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
    leads.value = data || []
  } else if (currentTab.value === 'projects') {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    projects.value = data || []
  }
  loading.value = false
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

async function handleLogout() {
  await supabase.auth.signOut()
  navigateTo('/admin/login')
}

// Modal functionality
function openAddModal() {
  newProject.value = { title: '', category: 'Digital Branding & Strategy', description: '', image_url: '' }
  showModal.value = true
}

async function saveProject() {
  try {
    saving.value = true
    const { error } = await supabase.from('projects').insert([newProject.value])
    if (error) throw error
    
    showModal.value = false
    fetchData()
  } catch (error) {
    alert(error.message)
  } finally {
    saving.value = false
  }
}

async function deleteItem(table, id) {
  if (confirm('Are you sure you want to delete this?')) {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (!error) fetchData()
  }
}
</script>

<style scoped>
.admin-sidebar {
  width: 280px;
  background: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.admin-main {
  margin-left: 280px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.nav-link {
  border: none;
  background: none;
  transition: all 0.2s ease;
}

.hover-bg:hover {
  background-color: rgba(0,0,0,0.05) !important;
  transform: translateX(5px);
}

.active-link {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-container {
  min-height: 500px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(5px);
  z-index: 2000;
  padding: 20px;
}

.modal-card {
  max-height: 90vh;
  overflow-y: auto;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}

@media (max-width: 991.98px) {
  .admin-sidebar {
    width: 80px;
    padding: 20px 10px !important;
  }
  .admin-sidebar span, .admin-sidebar .mt-auto span {
    display: none;
  }
  .admin-main {
    margin-left: 80px;
  }
  .admin-sidebar .me-3 {
    margin-right: 0 !important;
  }
}
</style>
