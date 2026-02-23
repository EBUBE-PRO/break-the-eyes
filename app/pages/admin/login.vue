<template>
  <div class="admin-login-layout d-flex align-items-center justify-content-center min-vh-100">
    <div class="login-card p-4 p-md-5 shadow-lg rounded-4 bg-white border">
      <div class="text-center mb-5">
        <img src="../../assets/images/brand-eye-black.svg" alt="BTE" class="mb-4" height="60">
        <h2 class="fw-bold h3 text-dark">Admin Dashboard</h2>
        <p class="text-muted small">Sign in to manage your content</p>
      </div>

      <form @submit.prevent="handleLogin" class="needs-validation">
        <div class="mb-4">
          <label for="email" class="form-label fw-semibold mb-2">Email Address</label>
          <input 
            v-model="email" 
            type="email" 
            id="email" 
            class="form-control form-control-lg custom-field" 
            placeholder="admin@breaktheeyes.com" 
            required 
          />
        </div>

        <div class="mb-5">
          <label for="password" class="form-label fw-semibold mb-2">Password</label>
          <input 
            v-model="password" 
            type="password" 
            id="password" 
            class="form-control form-control-lg custom-field" 
            placeholder="Enter your security key" 
            required 
          />
        </div>

        <button 
          type="submit" 
          class="btn btn-dark w-100 btn-lg shadow-sm py-3 mb-3 d-flex align-items-center justify-content-center"
          :disabled="loading"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
          <span>{{ loading ? 'Authenticating...' : 'Sign In' }}</span>
        </button>

        <p v-if="errorMsg" class="text-danger text-center small mt-3 fw-bold">
          {{ errorMsg }}
        </p>
      </form>

      <div class="mt-4 text-center">
        <p class="small text-muted">
          Don't have an account? 
          <NuxtLink to="/admin/signup" class="text-danger fw-bold text-decoration-none hover-link">Sign Up</NuxtLink>
        </p>
      </div>

      <div class="mt-4 text-center">
        <NuxtLink to="/" class="text-muted text-decoration-none small hover-link">
          <i class="bi bi-arrow-left me-2"></i>Back to Website
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

definePageMeta({
  layout: false,
  middleware: ['auth'] // Though we allow login, the middleware is set to ignore /admin/login
})

// Redirect if already logged in
watchEffect(() => {
  if (user.value) {
    navigateTo('/admin')
  }
})

async function handleLogin() {
  try {
    loading.value = true
    errorMsg.value = ''
    console.log('Attempting login for:', email.value)
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) {
      console.error('Login error:', error)
      throw error
    }
    
    console.log('Login successful:', data)
    await navigateTo('/admin', { replace: true })
  } catch (error) {
    errorMsg.value = error.message || 'Failed to sign in. Please check your credentials.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-login-layout {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.login-card {
  width: 100%;
  max-width: 450px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.custom-field {
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.custom-field:focus {
  border-color: #B22222;
  box-shadow: 0 0 0 4px rgba(178, 34, 34, 0.1);
  background: #fff;
}

.btn-dark {
  background: #111;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-dark:hover:not(:disabled) {
  background: #B22222;
  transform: translateY(-2px);
}

.hover-link:hover {
  color: #B22222 !important;
}

.rounded-4 {
  border-radius: 20px !important;
}
</style>
