<template>
  <header>
    <nav class="navbar navbar-expand-lg">
      <!-- NAVBAR POSITIONING: mt-3 keeps the navbar with top margin spacing - DO NOT REMOVE -->
      <div class="container-fluid navbar-custom-container mt-3">
        <!-- Brand + Toggler -->
        <div
          class="d-flex align-items-center w-100 justify-content-between "
        >
        <div class="_btheNavbar d-flex align-items-center">
                    <NuxtLink class="navbar-brand d-flex align-items-center" to="/">
            <img
              src="../assets/images/break-the-eyes-logo.svg"
              alt="Logo"
              width="100"
              height="60"
            />
          </NuxtLink>

          <div
            class="collapse navbar-collapse d-none d-lg-block"
            id="navbarNav"
          >
            <ul class="navbar-nav">
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/">Home</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/the-tribe">The Tribe</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/services"
                  >Our Services</NuxtLink
                >
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/projects"
                  >Our Projects</NuxtLink
                >
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/contact">Contact us</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
          <div class="custom-hr my-2 d-none d-lg-block"></div>

          <!-- Social pills (desktop) -->
          <div class="d-none d-lg-flex align-items-center _bthePills gap-2">
             <a
              href="https://www.instagram.com/breaktheeyes/"
              class="btn _btheBttn btn-black"
              target="_blank"
              rel="noopener"
              >
             <i class="bi bi-instagram"></i>Instagram</a
            >
            <a
              href="https://www.youtube.com/@breaktheeyesmedia209"
              class="btn _btheBttn btn-red"
              target="_blank"
              rel="noopener"
              ><i class="bi bi-youtube"></i>Youtube</a
            >
           
          </div>

          <!-- Mobile toggler -->
          <button
            class="navbar-toggler b-0"
            type="button"
            :aria-expanded="mobileOpen"
            aria-controls="mobileMenu"
            @click="openMenu"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        <!-- Desktop nav -->
      </div>
    </nav>
  </header>

  <!-- OFF-CANVAS (Bottom) -->
  <div
    id="mobileMenu"
    class="bth-offcanvas"
    role="dialog"
    aria-modal="true"
    aria-labelledby="mobileMenuTitle"
    :class="{ 'is-open': mobileOpen }"
    @click.self="closeMenu"
  >
    <div class="bth-offcanvas-panel">
      <div
        class="offcanvas-header d-flex justify-content-between align-items-center mb-4"
      >
        <NuxtLink to="/">
          <img class="brand-logo" src="../assets/images/break-the-eyes-logo.svg" alt="Break The Eyes Logo" width="80" />
        </NuxtLink>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeMenu"
        ></button>
      </div>

      <div class="offcanvas-body">
        <ul class="nav flex-column">
          <li class="nav-item mobile-nav">
            <NuxtLink
              class="nav-link px-0 py-2 _bthe_mobile_menu_text underline-animation"
              to="/"
              >Home</NuxtLink
            >
          </li>
           <li class="nav-item mobile-nav">
            <NuxtLink
              class="nav-link px-0 py-2 _bthe_mobile_menu_text underline-animation"
              to="/the-tribe"
              >The Tribe</NuxtLink
            >
          </li>
          <li class="nav-item mobile-nav">
            <NuxtLink
              class="nav-link px-0 py-2 _bthe_mobile_menu_text underline-animation"
              to="/services"
              >Our Services</NuxtLink
            >
          </li>
         
          <li class="nav-item mobile-nav">
            <NuxtLink
              class="nav-link px-0 py-2 _bthe_mobile_menu_text underline-animation"
              to="/projects"
              >Our Projects</NuxtLink
            >
          </li>
          <li class="nav-item mobile-nav">
            <NuxtLink
              class="nav-link px-0 py-2 _bthe_mobile_menu_text underline-animation"
              to="/contact"
              >Contact us</NuxtLink
            >
          </li>
        </ul>

        <!-- Social pills (mobile) -->
        <div class="d-flex align-items-center gap-3 mt-3">
          <a
            href="https://www.youtube.com/@breaktheeyesmedia209"
            class="text-danger fs-2"
            target="_blank"
            rel="noopener"
            aria-label="Youtube"
            ><i class="bi bi-youtube"></i
          ></a>
          <a
            href="https://www.instagram.com/breaktheeyes/"
            class="text-black fs-2"
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
            ><i class="bi bi-instagram"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const mobileOpen = ref(false);

function openMenu() {
  mobileOpen.value = true;
  document.body.style.overflow = "hidden"; // prevent background scroll
}
function closeMenu() {
  mobileOpen.value = false;
  document.body.style.overflow = ""; // restore scroll
}

// ESC to close
function onKey(e: KeyboardEvent) {
  if (e.key === "Escape" && mobileOpen.value) closeMenu();
}
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<style scoped>
/* Off-canvas backdrop + container */
.bth-offcanvas {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 1050; /* above navbar */
}

/* Side Panel (Right) */
.bth-offcanvas .bth-offcanvas-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: auto; /* Reset left */
  width: 85%;
  max-width: 350px;
  background: #fff; /* White background */
  color: #000;      /* Black text */
  transform: translateX(100%); /* Slide from right */
  transition: transform 0.3s ease;
  height: 100%;
  overflow-y: auto;
  padding: 24px;
  box-shadow: -2px 0 8px rgba(0,0,0,0.1);
}

/* Visible state */
.bth-offcanvas.is-open {
  opacity: 1;
  pointer-events: auto;
}
.bth-offcanvas.is-open .bth-offcanvas-panel {
  transform: translateX(0);
}

/* Make Bootstrap toggler icon visible without JS bundle */
.navbar-toggler {
  border: none;
}
.navbar-toggler-icon {
  width: 1.5rem;
  height: 1.5rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 0, 0, 0.55)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

/* Mobile Nav Links */
.bth-offcanvas-panel .nav-link {
  color: #000 !important;
  font-size: 1.25rem !important; /* Reduced size */
  font-weight: 500;
}
.bth-offcanvas-panel .nav-link:hover {
  color: #333 !important;
}

/* Fix underline animation for white background (black line) */
:deep(.bth-offcanvas-panel .underline-animation::after) {
  background-color: #000 !important;
}
</style>
