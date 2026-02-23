<template>
  <div class="admin-login-layout d-flex align-items-center justify-content-center min-vh-100">
    <div class="login-card p-4 p-md-5 shadow-lg rounded-4 bg-white border">
      <div class="text-center mb-5">
        <img src="../../assets/images/brand-eye-black.svg" alt="BTE" class="mb-4" height="60">
        <h2 class="fw-bold h3 text-dark">Create Admin Account</h2>
        <p class="text-muted small">Join the team to manage content</p>
      </div>

      <form @submit.prevent="handleSignup" class="needs-validation">
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

        <div class="mb-4">
          <label for="password" class="form-label fw-semibold mb-2">Password</label>
          <input 
            v-model="password" 
            type="password" 
            id="password" 
            class="form-control form-control-lg custom-field" 
            placeholder="Create a secure password" 
            required 
          />
        </div>

        <div class="mb-5">
          <label for="confirmPassword" class="form-label fw-semibold mb-2">Confirm Password</label>
          <input 
            v-model="confirmPassword" 
            type="password" 
            id="confirmPassword" 
            class="form-control form-control-lg custom-field" 
            placeholder="Repeat your password" 
            required 
          />
        </div>

        <button 
          type="submit" 
          class="btn btn-dark w-100 btn-lg shadow-sm py-3 mb-3 d-flex align-items-center justify-content-center"
          :disabled="loading"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
          <span>{{ loading ? 'Creating Account...' : 'Sign Up' }}</span>
        </button>

        <p v-if="errorMsg" class="text-danger text-center small mt-3 fw-bold">
          {{ errorMsg }}
        </p>
        <p v-if="successMsg" class="text-success text-center small mt-3 fw-bold">
          {{ successMsg }}
        </p>
      </form>

      <div class="mt-4 text-center">
        <p class="small text-muted">
          Already have an account? 
          <NuxtLink to="/admin/login" class="text-danger fw-bold text-decoration-none hover-link">Sign In</NuxtLink>
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
const confirmPassword = ref('')
const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

definePageMeta({
  layout: false,
  middleware: ['auth']
})

// Redirect if already logged in
watchEffect(() => {
  if (user.value) {
    navigateTo('/admin')
  }
})

onMounted(() => {
  console.log('Supabase Client URL:', supabase.supabaseUrl)
  if (!supabase.supabaseUrl || supabase.supabaseUrl.includes('localhost')) {
    console.warn('Supabase URL might not be correctly set in the environment.')
  }
})

async function handleSignup() {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = "Passwords do not match."
    return
  }

  try {
    loading.value = true
    errorMsg.value = ''
    successMsg.value = ''
    console.log('Attempting signup for:', email.value)
    
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: `${window.location.origin}/admin/login`
      }
    })

    if (error) {
      console.error('Signup error:', error)
      throw error
    }
    
    console.log('Signup result:', data)
    
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      errorMsg.value = "This email is already registered."
    } else {
      successMsg.value = 'Account created successfully! Please check your email for confirmation.'
    }
    
  } catch (error) {
    errorMsg.value = error.message || 'Failed to sign up. Please try again.'
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
