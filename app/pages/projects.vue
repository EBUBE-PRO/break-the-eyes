<template>

  <div class="project-banner">
    <div class="container">
      <div class="row align-items-start">
        <div class="col-12 col-md-6">
          <h1 class="display-4 fw-bold mb-3">
            Where Ideas Take<br class="d-none d-md-inline" />
            Flight
          </h1>

          <p class="lead">From bold concepts to groundbreaking executions, our projects 
            <br> push creative boundaries and redefine digital experiences.
            <br> Explore the work that speaks for itself.</p>
        </div>

        <div class="col-12 col-md-6 text-center text-md-end mt-4 mt-md-0">
          <div class="tribe-stack projects-hero-img-wrapper">
            <img
              src="../assets/images/services.png"
              alt="services"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="projects-nav-container">
    <div class="container">
      <nav class="projects-nav">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="setCategory(cat)"
          class="projects-nav-item"
          :class="{ 'active': currentCategory === cat }"
        >
          {{ cat }}
        </button>
      </nav>
    </div>
  </div>

  <div class="container pb-5 min-vh-50">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-11">
        <TransitionGroup 
          name="project-fade" 
          tag="div" 
          class="row g-4 g-md-5"
        >
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="col-6 mb-4"
          >
            <div class="project-image w-100 p-0 text-center project-image-hover">
              <div class="project-img-wrapper position-relative overflow-hidden rounded-4">
                <img
                  :src="project.image_url"
                  :alt="project.title"
                  class="img-fluid w-100 project-main-img"
                />
                <button class="project-hover-btn" type="button">
                  <i class="bi bi-arrow-right-circle-fill"></i>
                </button>
              </div>
              <h4 class="fw-bold mt-3">{{ project.title }}</h4>
              <p class="lead text-muted">{{ project.description }}</p>
            </div>
          </div>
        </TransitionGroup>

        <!-- Custom Project Grid -->
        <div class="col-12 mt-5">
          <div class="row g-4">
            <!-- Project 1 -->
            <div class="col-12 col-md-6">
              <div class="project-item">
                <div class="tribe-img-hover-container position-relative overflow-hidden rounded-4">
                  <img src="../assets/images/Component 12.png" class="img-fluid w-100" alt="Project Image" />
                </div>
                <div class="mt-3">
                  <h4 class="fw-bold">Jane Egerton-Idehen</h4>
                  <p class="text-muted">Media and operation consultancy.</p>
                </div>
              </div>
            </div>

            <!-- Project 2 -->
            <div class="col-12 col-md-6">
              <div class="project-item">
                <div class="tribe-img-hover-container position-relative overflow-hidden rounded-4">
                  <img src="../assets/images/iphone.png" class="img-fluid w-100" alt="Project Image" />
                </div>
                <div class="mt-3">
                  <h4 class="fw-bold">NIGCOMSAT'S 'QUICK WINS' initiative</h4>
                  <p class="text-muted">Creative campaign and publicity.</p>
                </div>
              </div>
            </div>

            <!-- Project 3 -->
            <div class="col-12 col-md-6">
              <div class="project-item">
                <div class="tribe-img-hover-container position-relative overflow-hidden rounded-4">
                  <img src="../assets/images/book.png" class="img-fluid w-100" alt="Project Image" />
                </div>
                <div class="mt-3">
                  <h4 class="fw-bold">Corporate Organisations and Events</h4>
                  <p class="text-muted">High-Impact Branding & Digital Media Services.</p>
                </div>
              </div>
            </div>

            <!-- Project 4 -->
            <div class="col-12 col-md-6">
              <div class="project-item">
                <div class="tribe-img-hover-container position-relative overflow-hidden rounded-4">
                  <img src="../assets/images/Component 12.png" class="img-fluid w-100" alt="Project Image" />
                </div>
                <div class="mt-3">
                  <h4 class="fw-bold">Mr & Miss Akwa Ibom State 2024</h4>
                  <p class="text-muted">Event & PR Planning.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="tribe-form _btheBckblack text-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 col-lg-5 mb-5 mb-lg-0">
            <div class="ps-lg-5 ps-xl-0 text-start">
               <img src="../assets/images/bte white.png" alt="brand eyes" class="mb-4 tribe-form-logo">
               <h2 class="display-3 ">LET'S START <br> <span class="align-middle tribe-something-text">SOMETHING.</span></h2>
            </div>
          </div>
    
          <div class="col-12 col-lg-7">
            <!-- Global shift to maintain staggered look on all devices (mobile, tablet, desktop) -->
            <div class="tribe-contact tribe-form-shift">
              <form class="tribe-contact-card" @submit.prevent="handleSubmit">
                <p class="fw-bold fs-5 mb-4 text-center">Tell Us About Your Project</p>

                <div class="mb-3">
                  <label for="fullName">Full Name</label>
                  <input type="text" id="fullName" v-model="formData.full_name" class="tribe-contact-field form-control" placeholder="Your full name" required />
                </div>

                <div class="mb-3">
                  <label for="email">Email Address</label>
                  <input type="email" id="email" v-model="formData.email" class="tribe-contact-field form-control" placeholder="Your email address" required />
                </div>

                <div class="mb-4">
                  <label for="inquiry">How can we help?</label>
                  <textarea id="inquiry" v-model="formData.message" class="tribe-contact-field form-control" placeholder="Write your message here..." rows="4" required></textarea>
                </div>

                <button type="submit" class="tribe-contact-btn" :disabled="submitting">
                  <span v-if="submitting">Sending...</span>
                  <span v-else>Get in Touch <i class="bi bi-arrow-up-right"></i></span>
                </button>
                
                <p v-if="successMsg" class="mt-3 text-success small fw-bold text-center">{{ successMsg }}</p>
              </form> 
            </div>
          </div>
        </div>
      </div>
    </div>
  
  
</template>

<script lang="ts" setup>
import type { Database } from '~/types/supabase'

const supabase = useSupabaseClient<Database>();
const currentCategory = ref('All');

const categories = [
  'All',
  'Digital Branding & Strategy',
  'Multimedia Production',
  'Tech & Digital Solutions',
  'Events & PR Solutions'
];

const { data: projects } = await useAsyncData('projects', async () => {
  const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  return data || [];
});

const filteredProjects = computed(() => {
  if (currentCategory.value === 'All') return projects.value;
  return (projects.value as any[])?.filter((p: any) => p.category === currentCategory.value) || [];
});

const setCategory = (category: string) => {
  currentCategory.value = category;
};

// Form logic
const formData = ref({
  full_name: '',
  email: '',
  message: '',
  source_page: 'Projects'
});
const submitting = ref(false);
const successMsg = ref('');

async function handleSubmit() {
  try {
    submitting.value = true;
    const { error } = await supabase.from('leads').insert([formData.value]);
    
    if (error) throw error;
    
    successMsg.value = 'Success! Redirecting to WhatsApp...';
    
    // WhatsApp redirect
    const waUrl = getWhatsAppUrl('2349025837982', {
      name: formData.value.full_name,
      email: formData.value.email,
      message: formData.value.message
    });
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
      // Reset form
      formData.value = { full_name: '', email: '', message: '', source_page: 'Projects' };
      successMsg.value = '';
    }, 1500);
    
  } catch (error) {
    alert('Something went wrong. Please try again.');
  } finally {
    submitting.value = false;
  }
}
</script>

<style>
.project-image-hover .project-img-wrapper {
  position: relative;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.project-main-img {
  height: 400px;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.project-image-hover .project-img-wrapper:hover .project-main-img {
  transform: scale(1.1);
}

.project-hover-btn {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  background: rgba(0,0,0,0.5);
  color: #fff;
  border: none;
  border-radius: 0;
  font-size: 3rem;
  transition: all 0.3s ease;
  z-index: 2;
  backdrop-filter: blur(2px);
}

.project-image-hover .project-img-wrapper:hover .project-hover-btn {
  opacity: 1;
  pointer-events: auto;
}

.projects-nav-item {
  background: none;
  border: none;
  color: #888;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.projects-nav-item.active {
  color: #000;
}

.projects-nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 1.5rem;
  right: 1.5rem;
  height: 2px;
  background: #B22222;
}

.rounded-4 {
  border-radius: 1.5rem !important;
}

.min-vh-50 {
  min-height: 50vh;
}

/* Transition effects */
.project-fade-enter-active,
.project-fade-leave-active {
  transition: all 0.5s ease;
}

.project-fade-enter-from,
.project-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.project-fade-move {
  transition: transform 0.5s ease;
}

@media (max-width: 767.98px) {
  .project-main-img {
    height: 250px;
  }
}
</style>