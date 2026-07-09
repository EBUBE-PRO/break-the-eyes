<template>
  <div class="auth-layout">
    <!-- Left Branding Panel -->
    <div class="auth-brand d-none d-lg-flex flex-column justify-content-between">
      <div class="brand-content">
        <img src="../../assets/images/brand-eye-black.svg" alt="Break The Eyes" height="48" class="mb-5 invert-img">
        <h1 class="display-5 fw-black text-white lh-sm">Join the<br>creative team.</h1>
        <p class="text-white opacity-75 mt-3 lead">Create your account to start managing content, projects, and media on the BTE platform.</p>
      </div>
      <div class="brand-features d-flex flex-column gap-3">
        <div class="feature-row d-flex align-items-center gap-3">
          <div class="feature-icon"><i class="bi bi-shield-lock-fill"></i></div>
          <span class="text-white small">Secure Supabase Authentication</span>
        </div>
        <div class="feature-row d-flex align-items-center gap-3">
          <div class="feature-icon"><i class="bi bi-cloud-check-fill"></i></div>
          <span class="text-white small">Cloud-powered real-time CMS</span>
        </div>
        <div class="feature-row d-flex align-items-center gap-3">
          <div class="feature-icon"><i class="bi bi-people-fill"></i></div>
          <span class="text-white small">Role-based team access</span>
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
          <h2 class="fw-black auth-title">Create account</h2>
          <p class="text-muted">Fill in your details to get started</p>
        </div>

        <!-- Success message -->
        <div v-if="successMsg" class="alert d-flex align-items-center gap-2 rounded-3 mb-4 py-3 border-0" style="background:#f0fff4; color:#15803d;">
          <i class="bi bi-check-circle-fill"></i>
          <span class="small">{{ successMsg }}</span>
        </div>

        <!-- Error alert -->
        <div v-if="errorMsg" class="alert d-flex align-items-center gap-2 rounded-3 mb-4 py-3 border-0" style="background:#fff0f0;">
          <i class="bi bi-exclamation-triangle-fill text-danger"></i>
          <span class="small text-danger">{{ errorMsg }}</span>
          <button type="button" class="btn-close ms-auto" @click="errorMsg = ''" style="font-size:0.65rem"></button>
        </div>

        <form @submit.prevent="handleSignup">
          <div class="row g-3 mb-3">
            <div class="col-12">
              <label class="form-label fw-semibold small text-dark">Username</label>
              <div class="input-group-custom">
                <i class="bi bi-person input-icon"></i>
                <input v-model="username" type="text" class="auth-input" placeholder="johndoe" required autocomplete="username" />
              </div>
            </div>
            <div class="col-12">
              <label class="form-label fw-semibold small text-dark">Email Address</label>
              <div class="input-group-custom">
                <i class="bi bi-envelope input-icon"></i>
                <input v-model="email" type="email" class="auth-input" placeholder="you@breaktheeyes.com" required autocomplete="email" />
              </div>
            </div>
            <div class="col-12">
              <label class="form-label fw-semibold small text-dark">Password</label>
              <div class="input-group-custom">
                <i class="bi bi-lock input-icon"></i>
                <input v-model="password" :type="showPwd ? 'text' : 'password'" class="auth-input" placeholder="Min 6 characters" required autocomplete="new-password" />
                <button type="button" class="toggle-password" @click="showPwd = !showPwd">
                  <i :class="showPwd ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
            </div>
            <div class="col-12 mb-2">
              <label class="form-label fw-semibold small text-dark">Confirm Password</label>
              <div class="input-group-custom">
                <i class="bi bi-lock-fill input-icon"></i>
                <input v-model="confirmPassword" :type="showPwd2 ? 'text' : 'password'" class="auth-input" :class="{ 'input-error': confirmPassword && password !== confirmPassword }" placeholder="Repeat your password" required autocomplete="new-password" />
                <button type="button" class="toggle-password" @click="showPwd2 = !showPwd2">
                  <i :class="showPwd2 ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
              <small v-if="confirmPassword && password !== confirmPassword" class="text-danger mt-1 d-block">Passwords do not match</small>
            </div>
          </div>

          <button type="submit" class="auth-btn w-100 mb-4" :disabled="loading || (!!confirmPassword && password !== confirmPassword)">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            <span>{{ loading ? 'Creating Account...' : 'Create Account' }}</span>
            <i v-if="!loading" class="bi bi-arrow-right ms-2"></i>
          </button>
        </form>

        <p class="text-center text-muted small">
          Already have an account?
          <NuxtLink to="/admin/login" class="auth-link fw-bold">Sign In</NuxtLink>
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
import { useSupabase } from '~/composables/useSupabase';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPwd = ref(false);
const showPwd2 = ref(false);
const loading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

definePageMeta({ layout: false });

async function handleSignup() {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match.';
    return;
  }
  if (password.value.length < 6) {
    errorMsg.value = 'Password must be at least 6 characters.';
    return;
  }

  loading.value = true;
  errorMsg.value = '';
  successMsg.value = '';

  try {
    const supabase = useSupabase();
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: { username: username.value }
      }
    });

    if (error) throw error;

    successMsg.value = 'Account created! Check your email to confirm, then sign in.';
    setTimeout(() => navigateTo('/admin/login'), 3000);
  } catch (err: any) {
    errorMsg.value = err.message || 'Failed to create account. Please try again.';
  } finally {
    loading.value = false;
  }
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
.brand-content { position: relative; z-index: 1; }
.invert-img { filter: invert(1) brightness(2); }

.feature-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.9rem;
  flex-shrink: 0;
}
.brand-features { position: relative; z-index: 1; }

/* ---- Right Form ---- */
.auth-form-panel {
  flex: 1;
  background: #fafafa;
  padding: 40px 20px;
}
.auth-form-inner {
  max-width: 440px;
  margin: 0 auto;
}
.auth-title {
  font-size: 2rem;
  color: #0a0a0a;
}

/* ---- Inputs ---- */
.input-group-custom { position: relative; }
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
.auth-input.input-error { border-color: #ef4444; }
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
.auth-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.auth-link { color: #B22222; text-decoration: none; }
.auth-link:hover { text-decoration: underline; }

@media (max-width: 991.98px) {
  .auth-form-panel { padding: 40px 24px; }
  .auth-title { font-size: 1.7rem; }
}
</style>
