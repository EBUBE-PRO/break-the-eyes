<template>
  <div class="auth-layout">
    <!-- Left Branding Panel -->
    <div class="auth-brand d-none d-lg-flex flex-column justify-content-between">
      <div class="brand-content">
        <img src="../../assets/images/brand-eye-black.svg" alt="Break The Eyes" height="48" class="mb-5 invert-img">
        <h1 class="display-5 fw-black text-white lh-sm">Manage your<br>creative empire.</h1>
        <p class="text-white opacity-75 mt-3 lead">A powerful CMS built to handle all your content, projects and media in one place.</p>
      </div>
      <div class="brand-stats d-flex gap-4">
        <div class="stat-pill">
          <span class="stat-num">∞</span>
          <span class="stat-label">Projects</span>
        </div>
        <div class="stat-pill">
          <span class="stat-num">24/7</span>
          <span class="stat-label">Access</span>
        </div>
        <div class="stat-pill">
          <span class="stat-num">100%</span>
          <span class="stat-label">Secure</span>
        </div>
      </div>
    </div>

    <!-- Right Form Panel -->
    <div class="auth-form-panel d-flex align-items-center justify-content-center">
      <div class="auth-form-inner w-100">

        <!-- Mobile Logo -->
        <div class="text-center mb-4 d-lg-none">
          <img src="../../assets/images/brand-eye-black.svg" alt="BTE" height="40">
        </div>

        <div class="mb-5">
          <h2 class="fw-black auth-title">Welcome back</h2>
          <p class="text-muted">Sign in to your admin account to continue</p>
        </div>

        <!-- Error alert -->
        <div v-if="error" class="alert alert-danger d-flex align-items-center gap-2 rounded-3 mb-4 py-3 border-0" style="background:#fff0f0;">
          <i class="bi bi-exclamation-triangle-fill text-danger"></i>
          <span class="small">{{ error }}</span>
          <button type="button" class="btn-close ms-auto" @click="clearError" style="font-size:0.65rem"></button>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="form-label fw-semibold small text-dark">Email Address</label>
            <div class="input-group-custom">
              <i class="bi bi-envelope input-icon"></i>
              <input
                v-model="email"
                type="email"
                id="email"
                class="auth-input"
                placeholder="you@breaktheeyes.com"
                required
                autocomplete="email"
              />
            </div>
          </div>

          <div class="mb-5">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <label class="form-label fw-semibold small text-dark mb-0">Password</label>
            </div>
            <div class="input-group-custom">
              <i class="bi bi-lock input-icon"></i>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                class="auth-input"
                placeholder="••••••••••"
                required
                autocomplete="current-password"
              />
              <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
          </div>

          <button type="submit" class="auth-btn w-100 mb-4" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
            <i v-if="!loading" class="bi bi-arrow-right ms-2"></i>
          </button>
        </form>

        <p class="text-center text-muted small">
          Need an account?
          <NuxtLink to="/admin/signup" class="auth-link fw-bold">Create one</NuxtLink>
        </p>

        <div class="text-center mt-4">
          <NuxtLink to="/" class="text-muted text-decoration-none small">
            <i class="bi bi-arrow-left me-1"></i>Back to website
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';

const { login, loading, error, clearError, isAuthenticated } = useAuth();

const email = ref('');
const password = ref('');
const showPassword = ref(false);

definePageMeta({ layout: false });

watchEffect(() => {
  if (isAuthenticated.value) navigateTo('/admin');
});

async function handleLogin() {
  await login(email.value, password.value);
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

.auth-layout {
  display: flex;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

/* ---- Left Branding ---- */
.auth-brand {
  width: 45%;
  background: linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 50%, #111 100%);
  padding: 60px 56px;
  position: relative;
  overflow: hidden;
}
.auth-brand::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(178,34,34,0.15) 0%, transparent 70%);
  top: -100px;
  right: -150px;
}
.auth-brand::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(178,34,34,0.1) 0%, transparent 70%);
  bottom: 80px;
  left: -80px;
}
.brand-content {
  position: relative;
  z-index: 1;
}
.invert-img { filter: invert(1) brightness(2); }

.stat-pill {
  display: flex;
  flex-direction: column;
  padding: 12px 20px;
  border-radius: 14px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  position: relative;
  z-index: 1;
}
.stat-num {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 800;
}
.stat-label {
  color: rgba(255,255,255,0.5);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ---- Right Form ---- */
.auth-form-panel {
  flex: 1;
  background: #fafafa;
  padding: 40px 20px;
}
.auth-form-inner {
  max-width: 420px;
  margin: 0 auto;
}
.auth-title {
  font-size: 2rem;
  color: #0a0a0a;
}

/* ---- Inputs ---- */
.input-group-custom {
  position: relative;
}
.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 0.95rem;
  z-index: 2;
}
.auth-input {
  width: 100%;
  padding: 14px 16px 14px 44px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.95rem;
  background: #fff;
  color: #111;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.auth-input:focus {
  border-color: #111;
  box-shadow: 0 0 0 4px rgba(0,0,0,0.06);
}
.toggle-password {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
}

/* ---- Button ---- */
.auth-btn {
  background: #0a0a0a;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 15px 24px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s;
  cursor: pointer;
}
.auth-btn:hover:not(:disabled) {
  background: #B22222;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(178,34,34,0.25);
}
.auth-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.auth-link {
  color: #B22222;
  text-decoration: none;
}
.auth-link:hover { text-decoration: underline; }

@media (max-width: 991.98px) {
  .auth-form-panel { padding: 40px 24px; }
  .auth-title { font-size: 1.7rem; }
}
</style>
