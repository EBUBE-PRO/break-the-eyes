<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-grid py-5">
      <div class="container py-5 text-center">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10">
            <h1 class="display-4 fw-bold mb-4">
              Architecting Digital Excellence,<br class="d-none d-md-inline" />
              Shattering Creative Limits.
            </h1>
            <div class="max-w-700 mx-auto px-md-4">
              <p class="lead text-dark fw-semibold mb-3">
                Unlocking the Power of Visual Experiences!
              </p>
              <p class="text-muted mb-4">
                Immerse yourself in the world of UI & UX design, where seamless interactions and captivating visuals converge. From crafting stunning designs to building powerful brands, we redefine digital experiences. Our expertise in digital marketing ensures your message reaches the right audience.
              </p>
              <p class="lead text-muted mb-5 italic">
                "We don't just provide services; we craft legacies. Dive into our ecosystem of 
                innovation where your vision meets our unparalleled creative precision."
              </p>
            </div>
            <div class="d-inline-flex gap-2">
              <a href="#branding" class="btn btn-dark btn-lg px-5"> Explore Our Craft  <i class="bi bi-arrow-down"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Services Ecosystem -->
    <div class="container py-5">
      
      <!-- Section 1: Digital Branding & Identity -->
      <section id="branding" class="row py-5 my-md-4 align-items-center">
        <div class="col-md-6 order-2 order-md-1">
          <h6 class="text-danger fw-bold text-uppercase mb-3 letter-spacing-2">Identity & Strategy</h6>
          <h2 class="title-text mb-4">We define legacies,<br>not just logos.</h2>
          <p class="lead mb-4">
            Your identity is the soul of your business. We delve deep into your brand's essence to create a visual and strategic language that commands attention and inspires trust.
          </p>
          <div class="row g-4 mb-4">
            <div class="col-sm-6">
              <h5 class="fw-bold mb-2">Visual Heritage</h5>
              <p class="text-muted small">Crafting timeless logo systems and comprehensive visual identities.</p>
            </div>
            <div class="col-sm-6">
              <h5 class="fw-bold mb-2">Market Authority</h5>
              <p class="text-muted small">Strategic positioning that places your brand at the forefront of the industry.</p>
            </div>
          </div>
          <NuxtLink to="/contact" class="btn btn-secondary px-4 py-2">Consult with Architects  <i class="bi bi-arrow-up-right"></i></NuxtLink>
        </div>
        <div class="col-md-5 offset-md-1 order-1 order-md-2 mb-4 mb-md-0">
          <div class="hover-image-container">
            <img src="../assets/images/brand-identity-development.jpg" class="img-fluid rounded shadow-lg service-main-img" alt="Branding & Strategy" />
          </div>
        </div>
      </section>

      <!-- Section 2: Cinematic Multimedia -->
      <section class="row py-5 align-items-center bg-light rounded-5 p-4 p-md-5 my-5 mx-0">
        <div class="col-md-5 mb-4 mb-md-0">
          <div class="hover-image-container">
            <img src="../assets/images/photo-and-video.jpg" class="img-fluid rounded shadow-lg service-main-img" alt="Multimedia Production" />
          </div>
        </div>
        <div class="col-md-6 offset-md-1">
          <h6 class="text-danger fw-bold text-uppercase mb-3 letter-spacing-2">Visual Storytelling</h6>
          <h2 class="title-text mb-4">Storytelling that breathes life into your vision.</h2>
          <p class="lead mb-4">
            Capturing the intangible. Our cinematic approach to photography and film transforms ordinary moments into extraordinary narratives that resonate on a primal level.
          </p>
          <ul class="list-unstyled mb-5 custom-check-list">
            <li><i class="bi bi-stars text-danger me-2"></i> High-End Commercial Cinematography</li>
            <li><i class="bi bi-stars text-danger me-2"></i> Editorial & Product Photography</li>
            <li><i class="bi bi-stars text-danger me-2"></i> Immersive Motion Graphics</li>
            <li><i class="bi bi-stars text-danger me-2"></i> Post-Production Excellence</li>
          </ul>
          <NuxtLink to="/contact" class="btn btn-dark px-4 py-2">Begin the Narrative  <i class="bi bi-arrow-up-right"></i></NuxtLink>
        </div>
      </section>

      <!-- Section 3: Precision Engineering -->
      <section class="row py-5 my-md-4 align-items-center">
        <div class="col-md-6 order-2 order-md-1">
          <h6 class="text-danger fw-bold text-uppercase mb-3 letter-spacing-2">Tech & Engineering</h6>
          <h2 class="title-text mb-4">Building robust digital foundations for tomorrow.</h2>
          <p class="lead mb-4">
            We don't just code; we engineer experiences. Our tech solutions are designed to be intuitive, powerful, and ready to scale with your ambitions.
          </p>
          <div class="row g-4 mb-4">
            <div class="col-sm-6">
              <h5 class="fw-bold mb-2">Bespoke Development</h5>
              <p class="text-muted small">Custom web and mobile applications tailored to unique business logic.</p>
            </div>
            <div class="col-sm-6">
              <h5 class="fw-bold mb-2">UI/UX Psychology</h5>
              <p class="text-muted small">Combining user-centered design principles with the latest industry trends to craft interfaces that delight users and drive engagement.</p> 
            </div>
          </div>
          <NuxtLink to="/contact" class="btn btn-secondary px-4 py-2">Deploy Your Vision  <i class="bi bi-arrow-up-right"></i></NuxtLink>
        </div>
        <div class="col-md-5 offset-md-1 order-1 order-md-2 mb-4 mb-md-0">
          <div class="hover-image-container">
            <img src="../assets/images/mobile-and-web-development.jpg" class="img-fluid rounded shadow-lg service-main-img" alt="Tech Solutions" />
          </div>
        </div>
      </section>

      <!-- Section 4: Experiential Events & PR -->
      <section class="row py-5 align-items-center bg-dark text-white rounded-5 p-4 p-md-5 my-5 mx-0 overflow-hidden position-relative">
        <div class="col-md-5 mb-4 mb-md-0 position-relative" style="z-index: 2;">
          <div class="hover-image-container">
            <img src="../assets/images/startup-solutions.jpg" class="img-fluid rounded shadow-lg service-main-img" alt="Events & PR" />
          </div>
        </div>
        <div class="col-md-6 offset-md-1 position-relative" style="z-index: 2;">
          <h6 class="text-danger fw-bold text-uppercase mb-3 letter-spacing-2">Influence & Activation</h6>
          <h2 class="title-text text-white mb-4">Turning brand moments into cultural movements.</h2>
          <p class="lead text-light mb-4">
            We craft designs that not only capture the essence of your brand but also resonate with your target audience. We manage perception and orchestrate impact.
          </p>
          <ul class="list-unstyled mb-5 custom-check-list light">
            <li><i class="bi bi-lightning-fill text-danger me-2"></i> Strategic Brand Activations</li>
            <li><i class="bi bi-lightning-fill text-danger me-2"></i> Influence & PR Management</li>
            <li><i class="bi bi-lightning-fill text-danger me-2"></i> High-Profile Event Production</li>
            <li><i class="bi bi-lightning-fill text-danger me-2"></i> Crisis Communication Mastery</li>
          </ul>
          <NuxtLink to="/contact" class="btn btn-outline-light px-4 py-2">Partner for Impact  <i class="bi bi-arrow-up-right"></i></NuxtLink>
        </div>
      </section>
    </div>

    <!-- Final CTA Section -->
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
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/types/supabase'

const supabase = useSupabaseClient<Database>();

// Form logic
const formData = ref({
  full_name: '',
  email: '',
  message: '',
  source_page: 'Services'
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
      formData.value = { full_name: '', email: '', message: '', source_page: 'Services' };
      successMsg.value = '';
    }, 1500);
    
  } catch (error) {
    alert('Something went wrong. Please try again.');
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.letter-spacing-2 {
  letter-spacing: 2px;
}

.max-w-700 {
  max-width: 700px;
}

.italic {
  font-style: italic;
}

.service-main-img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.hover-image-container {
  overflow: hidden;
  border-radius: 20px;
}

.hover-image-container:hover .service-main-img {
  transform: scale(1.05);
}

.custom-check-list li {
  margin-bottom: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.custom-check-list.light li {
  color: #ddd;
}

.tribe-contact-btn {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  background-color: #000;
  color: #fff;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.tribe-contact-btn:hover {
  background-color: #c01e1eff; /* Brand Dark Red */
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(192, 30, 30, 0.3);
}

@media (max-width: 991.98px) {
  .service-main-img {
    height: 350px;
  }
}

@media (max-width: 767.98px) {
  .display-4 {
    font-size: 2.25rem;
  }
  .title-text {
    font-size: 1.75rem;
  }
  .lead {
    font-size: 1rem;
  }
  .max-w-700 {
    max-width: 100%;
    padding: 0 10px;
  }
}
</style>
