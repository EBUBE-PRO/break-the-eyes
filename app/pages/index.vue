<template>
  <div>
    <section class="bg-grid">
      <div class="container py-5 text-center">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8">
            <!-- Headline -->
            <h1 class="display-4 fw-bold mb-3">
              Shattering Boundaries,<br class="d-none d-md-inline" />
              Creating Possibilities
            </h1>

            <!-- Subtext -->
            <p class="lead text-muted mb-4">
              Break The Eyes, where creativity meets excellence in media <br>&amp;
              digital solutions.
            </p>

            <!-- CTA -->
            <div class="d-inline-flex gap-2 mb-5">
              <NuxtLink to="/the-tribe" class="btn btn-dark btn-lg"> Learn More <i class="bi bi-arrow-up-right"></i></NuxtLink>
            </div>

            <!-- Image under -->
          </div>
        </div>
      </div>
      <div class="text-center mt-5" style="max-width: 1440px; margin: 0 auto">
        <img
          src="../assets/images/hero-section.png"
          alt="Creative showcase"
          class="img-fluid"
        />
      </div>
    </section>
    <section>
      <div class="container">
        <MarqueeLogos
          :logos="logos"
          :pxPerSec="120"
          :logoHeight="80"
          :gap="32"
        />
      </div>
    </section>
    <section class="home-section-2">
      <div class="container">
        <div class="row">
          <div class="col-md-6 order-2 order-md-1">
            <p class="lead mt-1">
              At Break the Eyes Media, we merge creativity with excellence to
              deliver impactful digital and media solutions. With bases in
              Nigeria and Cyprus and teams in Abuja and Lagos, we specialize in
              digital branding, offering services like web design, app
              development, UI/UX, content creation, video production and many
              more.
            </p>
          </div>
          <div class="col-md-6 order-1 order-md-2">
            <h2 class="title-text">We Create & Elevate Experiences</h2>
            <h4 class="lead">Your partner in digital innovation</h4>
            <NuxtLink to="/contact" class="btn btn-secondary">Work With Us  <i class="bi bi-arrow-up-right"></i></NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <section class="d-flex align-items-center masterpiece-section position-relative">
      <img src="../assets/images/masterpiece-section.svg" class="bg-svg-overlay" alt="" />
      <div class="container">
        <div class="row">
          
          <div class="col-md-8 d-flex align-items-center mb-5 mb-md-0 position-relative">
           
            <div class="text-white position-relative" style="z-index: 2;">
              <h2 class="title-text">
                Masterpieces <br />
                Unleashed
              </h2>
              <p class="lead mt-3">
                Our proud productions, Cherished creations and the art that
                doesn’t feel like labour
              </p>
              <button class="btn btn-light mt-3">View More  <i class="bi bi-arrow-up-right"></i></button>
            </div>
          </div>
          <div class="col-12 col-md-4 p-0 masterpiece-carousel-container">
            <div class="masterpiece-carousel-track">
              <!-- Set 1 -->
              <img src="../assets/images/production-image-one.jpg" class="img-fluid production-cube" alt="" />
              <img src="../assets/images/production-image-two.jpg" class="img-fluid production-cube" alt="" />
              <img src="../assets/images/production-image-three.jpg" class="img-fluid production-cube" alt="" />
              <!-- Set 2 (for seamless loop) -->
              <img src="../assets/images/production-image-one.jpg" class="img-fluid production-cube" alt="" />
              <img src="../assets/images/production-image-two.jpg" class="img-fluid production-cube" alt="" />
              <img src="../assets/images/production-image-three.jpg" class="img-fluid production-cube" alt="" />
            </div>
          </div>
          <!-- Mobile carousel uses animated container; stacked images removed -->
        </div>
      </div>
    </section>
    <section class="py-5">
      <div class="container">
        <div class="text-center my-5">
          <h2 class="title-text">What We Do</h2>
          <p class="lead">We offer a comprehensive suite of media and digital solutions.</p>
        </div>
        <div class="row py-5 align-items-center">
          <div class="col-md-5 order-2 order-md-1">
            <div class="hover-image-container shadow-lg">
              <img
                src="../assets/images/photo-and-video.jpg"
                class="img-fluid service-section-img"
                alt="Photo & Video Production"
              />
            </div>
          </div>

          <div class="col-md-6 offset-md-1 order-1 order-md-2">
            <div class="flex-column gap-3 mb-4">
              <span class="badge rounded-pill text-bg-blue mb-3">BTE Multimedia</span>
              <h2 class="fw-bold title-text">Photo & Video Production</h2>
              <p class="lead text-muted mt-3">
                Visual storytelling is a powerful tool. Our photo and video
                production services help you communicate your brand’s message
                effectively and creatively.
              </p>
              <NuxtLink to="/contact" class="btn btn-secondary mt-3">Contact us  <i class="bi bi-arrow-up-right"></i></NuxtLink>
            </div>
          </div>
        </div>
        <div class="row py-5 align-items-center">
          <div class="col-md-6 order-1 order-md-1">
            <div class="flex-column gap-3 mb-4 text-md-end">
              <span class="badge rounded-pill text-bg-blue mb-3">BTE Branding</span>
              <h2 class="fw-bold title-text">Brand Identity Development</h2>
              <p class="lead text-muted mt-3">
               We craft compelling brand identities that resonate with audiences and stand out in the digital landscape. Our branding services are designed to give your brand a unique voice and visual identity.
              </p>
              <NuxtLink to="/contact" class="btn btn-secondary mt-3">Contact us  <i class="bi bi-arrow-up-right"></i></NuxtLink>
            </div>
          </div>
          <div class="col-md-5 offset-md-1 order-1 order-md-2">
             <div class="hover-image-container shadow-lg">
                <img
                  src="../assets/images/brand-identity-development.jpg"
                  class="img-fluid service-section-img"
                  alt="Brand Identity Development"
                />
             </div>
          </div>
        </div>
        <div class="row py-5 align-items-center">
          <div class="col-md-5 order-2 order-md-1">
            <div class="hover-image-container shadow-lg">
              <img
                src="../assets/images/mobile-and-web-development.jpg"
                class="img-fluid service-section-img"
                alt="Mobile & Web Application Development"
              />
            </div>
          </div>

          <div class="col-md-6 offset-md-1 order-1 order-md-2">
            <div class="flex-column gap-3 mb-4">
              <span class="badge rounded-pill text-bg-blue mb-3">BTE Tech</span>
              <h2 class="fw-bold title-text">Mobile & Web Application Development</h2>
              <p class="lead text-muted mt-3">
               We create intuitive and robust applications that enhance user engagement and drive business growth. Our solutions are tailored to meet the specific needs of startups and established businesses alike.
              </p>
              <NuxtLink to="/contact" class="btn btn-secondary mt-3">Contact us  <i class="bi bi-arrow-up-right"></i></NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="services-section py-5">
  <div class="container">
     <div class="text-center my-5">
          <h2 class="title-text">Other Services</h2>
          <p class="lead">Explore our range of creative and tech-driven solutions.</p>
        </div>
    <div class="row g-4">
      <!-- Card 1 -->
      <div class="col-12 col-sm-6 col-md-6 mb-4">
        <div class="card h-100">
          <img src="../assets/images/product-design.jpg" class="card-img-top" alt="Product Design">
          <div class="card-body">
            <h5 class="card-title mt-2">Product Design</h5>
            <p class="card-text">From idea to execution, we craft intuitive and engaging digital products that blend aesthetics with functionality.</p>
            <NuxtLink to="/contact" class="btn btn-secondary">Contact Us  <i class="bi bi-arrow-up-right"></i></NuxtLink>
          </div>
        </div>
      </div>
      <!-- Card 2 -->
      <div class="col-12 col-sm-6 col-md-6 mb-4">
        <div class="card h-100">
          <img src="../assets/images/content-creation.jpg" class="card-img-top" alt="Content Creation">
          <div class="card-body">
            <h5 class="card-title mt-2">Content Creation</h5>
            <p class="card-text">We create compelling content and data-driven marketing strategies that boost engagement and build brand loyalty.</p>
            <NuxtLink to="/contact" class="btn btn-secondary">Contact Us  <i class="bi bi-arrow-up-right"></i></NuxtLink>
          </div>
        </div>
      </div>
      <!-- Card 3 -->
      <div class="col-12 col-sm-6 col-md-6 mb-4">
        <div class="card h-100">
          <img src="../assets/images/startup-solutions.jpg" class="card-img-top" alt="Startup & Innovation">
          <div class="card-body">
            <h5 class="card-title mt-2">Startup & Innovation Solutions</h5>
            <p class="card-text">We empower startups with the tools and guidance to transform ideas into successful businesses.</p>
            <NuxtLink to="/contact" class="btn btn-secondary">Contact Us  <i class="bi bi-arrow-up-right"></i></NuxtLink>
          </div>
        </div>
      </div>
      <!-- Card 4 -->
      <div class="col-12 col-sm-6 col-md-6 mb-4">
        <div class="card h-100">
          <img src="../assets/images/cyber-security.jpg" class="card-img-top" alt="Cyber Security">
          <div class="card-body">
            <h5 class="card-title mt-2">Cyber Security</h5>
            <p class="card-text">We provide robust cybersecurity solutions to protect your data and keep your business running securely.</p>
            <NuxtLink to="/contact" class="btn btn-secondary">Contact Us  <i class="bi bi-arrow-up-right"></i></NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<div class="insta-feed-section row g-0">
    <div class="col-md-4">
      <img src="../assets/images/coffee-camera.jpg" alt="coffee " class="img-fluid insta-section-img" />
    </div>
    <div class="col-md-8 d-flex align-items-center justify-content-left p-5 p-md-5 insta-section-txt">
      <div class="text-left text-md-start">
        <h2 class="fw-bold">Our Insta Feed</h2>
        <p class="lead mt-3">Where creativity meets inspiration – explore our world through every post</p>
        <a href="https://instagram.com" target="_blank" class="btn btn-light mt-3">Go To IG Page  <i class="bi bi-arrow-up-right"></i></a>
      </div>
    </div>
  </div>
</div>




<TestimonialSwiper class="w-100" />

  
</template>
<script setup lang="ts">
import absaLogo from "~/assets/images/brands/absa-logo.png";
import pageitLogo from "~/assets/images/brands/pageit-logo.png";
import tokoCyLogo from "~/assets/images/brands/toko-cy-logo.png";
import smartCoinLogo from "~/assets/images/brands/smart-coin-logo.png";
import ajuluAssociatesLogo from "~/assets/images/brands/ajulu-associates-logo.png";

const logos = [
  { src: absaLogo, alt: "Absa Logo" },
  { src: pageitLogo, alt: "Pageit Logo" },
  { src: tokoCyLogo, alt: "Toko Cy Logo" },
  { src: smartCoinLogo, alt: "Smart Coin Logo" },
  { src: ajuluAssociatesLogo, alt: "Ajulu Associates Logo" },
];
const instaImages = [
  { src:("../assets/images/coffee-camera.jpg"), alt: "Insta Feed 1" },
  { src:("../assets/images/Rectangle 9.png"), alt: "Insta Feed 2" },
  { src: ("../assets/images/Rectangle 10.png"), alt: "Insta Feed 3" },
// { src: new URL("../assets/images/rectangle 11.png", import.meta.url).href, alt: "Insta Feed 4" }
];
import { ref, onMounted, onUnmounted } from "vue";
const currentImage = ref(0);
let intervalId: any = null;
onMounted(() => {
  intervalId = setInterval(() => {
    currentImage.value = (currentImage.value + 1) % instaImages.length;
  }, 2500);
});
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>

.hover-image-container {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
}

.service-section-img {
  width: 100%;
  height: 450px;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.hover-image-container:hover .service-section-img {
  transform: scale(1.05);
}

.text-bg-blue {
  background-color: #BE1622 !important;
  color: #fff !important;
  padding: 0.5rem 1.2rem !important;
  font-size: 0.85rem !important;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Button hover: dark red background + horizontal arrow */
.btn {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

.bi-arrow-up-right {
  display: inline-block;
  transition: transform 0.3s ease, color 0.3s ease;
}

.btn:hover {
  background-color: #c01e1eff; /* original dark background */
  border-color: #212529;
  color: #fff;
}

.btn:hover .bi-arrow-up-right {
  transform: rotate(45deg);
  color: #fff;
}

.btn.btn-link:hover {
  background-color: transparent;
  border-color: transparent;
  color: #212529;
}
.btn.btn-link:hover .bi-arrow-up-right {
  transform: rotate(-45deg);
  color: #212529;
}

a:hover .bi-arrow-up-right {
  transform: rotate(-45deg);
}

@media (max-width: 767.98px) {
  .masterpiece-carousel-container {
    height: 280px;
    max-width: 280px;
    margin: 1rem auto;
    overflow: hidden;
  }
  .masterpiece-carousel-track {
    gap: 8px;
  }
  .production-cube {
    width: 100%;
    height: auto;
  }
}
@media (min-width: 768px) and (max-width: 991.98px) {
  .home-section-2 .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .display-4 {
    font-size: 2.5rem;
  }
  .lead {
    font-size: 1.15rem;
  }
  .masterpiece-carousel-container {
    max-width: 90vw;
    margin: 0 auto;
  }
  .service-images {
    max-width: 80vw;
    margin: 0 auto;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .title-text {
    font-size: 2rem;
  }
  .btn-lg, .btn-secondary, .btn-light {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }
  .row {
    margin-left: 0;
    margin-right: 0;
  }
  .col-md-6, .col-md-8, .col-md-4 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>