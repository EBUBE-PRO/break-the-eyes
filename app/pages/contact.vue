<template>
  <div class="contact-page">
    <div class="container-fluid px-0">
      <div class="row align-items-center g-0">
        <!-- Image Column (Left) -->
        <div class="col-12 col-lg-6 text-start ps-0 mb-0 pb-0" style="margin-bottom:0;padding-bottom:0;">
          <!-- Removed rounded class -->
          <img src="../assets/images/Frame 106.png" class="img-fluid" alt="Frame" style="margin-bottom:0;padding-bottom:0;">
        </div>

        <!-- Content/Form Column (Right) -->
        <div class="col-12 col-lg-6">
          <!-- Removed padding to move inputs immediately next to image -->
          <div class="p-3 p-md-4 ps-lg-0">
            <h3 class="fw-bold fs-2 mb-3 ">Get Started</h3>
            <p class="mb-4 lead">Ready to elevate your brand with Break the Eyes Media? Get in touch with us today to discuss your project and see how we can help you achieve your goals.
            </p>

            <form @submit.prevent="handleSubmit">
              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <label for="firstname" class="form-label small fw-bold">First Name*</label>
                  <input type="text" id="firstname" v-model="formData.firstName" class="form-control contact-field" placeholder="First Name" required>
                </div>
                <div class="col-12 col-md-6">
                  <label for="lastname" class="form-label small fw-bold">Last Name*</label>
                  <input type="text" id="lastname" v-model="formData.lastName" class="form-control contact-field" placeholder="Last Name" required>
                </div>

                <div class="col-12">
                  <label for="email" class="form-label small fw-bold">Email*</label>
                  <input type="email" id="email" v-model="formData.email" class="form-control contact-field" placeholder="example@company.com" required>
                </div>

                <div class="col-12">
                  <label for="message" class="form-label small fw-bold">Message</label>
                  <textarea id="message" v-model="formData.message" class="form-control contact-field" rows="4" placeholder="Leave us a message..." required></textarea>
                </div>
              </div>

              <div class="mt-4">
                <p class="fw-bold mb-3">Services</p>
                <div class="row">
                  <div class="col-6">
                    <div v-for="service in servicesLeft" :key="service" class="form-check mb-2">
                      <input class="form-check-input" type="checkbox" :id="service" :value="service" v-model="formData.selectedServices">
                      <label class="form-check-label small" :for="service">{{ service }}</label>
                    </div>
                  </div>
                  
                  <div class="col-6">
                    <div v-for="service in servicesRight" :key="service" class="form-check mb-2">
                      <input class="form-check-input" type="checkbox" :id="service" :value="service" v-model="formData.selectedServices">
                      <label class="form-check-label small" :for="service">{{ service }}</label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-5">
                <button type="submit" class="tribe-contact-btn btn w-100" :disabled="submitting">
                  <span v-if="submitting">Sending...</span>
                  <span v-else>Get Started <i class="bi bi-arrow-up-right"></i></span>
                </button>
                <p v-if="successMsg" class="mt-3 text-success small fw-bold text-center">{{ successMsg }}</p>
              </div>
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

const servicesLeft = ['Product design', 'Content Creation', 'Event & PR Planning', 'Photography'];
const servicesRight = ['Startup Innovation', 'Others'];

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  selectedServices: [] as string[]
});

const submitting = ref(false);
const successMsg = ref('');

async function handleSubmit() {
  try {
    submitting.value = true;
    const fullName = `${formData.value.firstName} ${formData.value.lastName}`;
    const messageWithServices = `Services: ${formData.value.selectedServices.join(', ')}\n\nMessage:\n${formData.value.message}`;
    
    const { error } = await supabase.from('leads').insert([{
      full_name: fullName,
      email: formData.value.email,
      message: messageWithServices,
      source_page: 'Contact'
    }]);

    if (error) throw error;
    
    successMsg.value = 'Success! Redirecting to WhatsApp...';
    
    const waUrl = getWhatsAppUrl('2349025837982', {
      name: fullName,
      email: formData.value.email,
      message: messageWithServices
    });
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
      formData.value = { firstName: '', lastName: '', email: '', message: '', selectedServices: [] };
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
.tribe-contact-btn:hover {
  background-color: #c01e1eff; /* dark red */
  border-color: #c01e1eff;
  color: #fff;
}


</style>
