<script setup>
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

 
  import { Swiper, SwiperSlide } from 'swiper/vue';

  
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';
  import 'swiper/css/autoplay';

const modules = [Navigation, Pagination, A11y, Autoplay]


const testimonials = [
  {
    quote:
      '“Break the Eyes Media completely transformed our brand! Their creativity, attention to detail, and innovative approach helped us stand out in ways we never imagined. Truly a game-changer!”',
    author: '— Alex Thompson, CEO of VisionTech',
  },
  {
    quote:
      '“Professional, fast, and outstanding quality. We saw results within weeks.”',
    author: '— Sarah Mensah, Marketing Director',
  },
  {
    quote:
      '“The team delivered beyond expectations. Smooth process and beautiful outcomes.”',
    author: '— David A., Founder',
  },
]
</script>

<template>
  <ClientOnly>
    <section class="testimonial-section position-relative">
      <!-- Full width swiper as requested -->
      <Swiper
        :modules="modules"
        :loop="true"
        :centered-slides="true"
        :slides-per-view="1"
        :space-between="0"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :navigation="true"
        class="t-swiper w-100"
      >
        <SwiperSlide v-for="(t, i) in testimonials" :key="i">
          <div class="row m-0 p-0 w-100">
            <div class="col-12 p-0">
              <figure class="t-quote">
                <blockquote>{{ t.quote }}</blockquote>
                <figcaption>{{ t.author }}</figcaption>
              </figure>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  </ClientOnly>
</template>

<style scoped>
.testimonial-section {
  background: #fff; 
  color: #111;
  overflow: hidden;
  padding-top: 10rem;
  padding-bottom: 10rem;
}
.t-quote {
  max-width: 1200px; 
  margin: 0 auto;
  text-align: center;
  padding: 0 4rem;
}
.t-quote blockquote {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem); 
  line-height: 1.0;
  font-weight: 200; 
  color: #111;     
  margin-bottom: 2rem;
}
.t-quote figcaption {
  margin-top: 1.5rem;
  font-size: clamp(1.1rem, 1.5vw, 1.5rem);
  opacity: 0.9;
  letter-spacing: 1px;
}

.t-swiper :deep(.swiper-button-prev),
.t-swiper :deep(.swiper-button-next) {
  color: #111;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

/* Hide default Swiper chevron font icon */
.t-swiper :deep(.swiper-button-prev)::after,
.t-swiper :deep(.swiper-button-next)::after {
  display: none;
}

.t-swiper :deep(.swiper-button-prev) {
  left: 1rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='19' y1='12' x2='5' y2='12'%3E%3C/line%3E%3Cpolyline points='12 19 5 12 12 5'%3E%3C/polyline%3E%3C/svg%3E");
}

/* Custom SVG Stem Arrow - Right */
.t-swiper :deep(.swiper-button-next) {
  right: 1rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='5' y1='12' x2='19' y2='12'%3E%3C/line%3E%3Cpolyline points='12 5 19 12 12 19'%3E%3C/polyline%3E%3C/svg%3E");
}

/* Show arrows only on larger screens to avoid cluttering mobile if they aren't needed */
@media (max-width: 768px) {
  .t-swiper :deep(.swiper-button-prev),
  .t-swiper :deep(.swiper-button-next) {
    display: none;
  }
}
</style>
