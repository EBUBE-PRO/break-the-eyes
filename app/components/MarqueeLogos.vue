<template>
  <div class="slider" aria-label="Our partners" :style="{'--duration': durationSec + 's'}">
    <div class="_logo_track" ref="track">
    
      <div class="marquee-logo_wrapper" v-for="(logo, i) in logos" :key="'a-' + i">
        <img class="marquee-logo" :src="logo.src" :alt="logo.alt || ''" :height="logoHeight" />
      </div>
  
      <div class="marquee-logo_wrapper" v-for="(logo, i) in logos" :key="'b-' + i" aria-hidden="true">
        <img class="marquee-logo" :src="logo.src" alt="" :height="logoHeight" />
      </div>
    </div>

 
    <div class="marquee_overlay"></div>
    <div class="marquee_overlay is-right"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watchEffect } from 'vue'

type Logo = { src: string; alt?: string }

const props = withDefaults(defineProps<{
  logos: Logo[]
  pxPerSec?: number   
  logoHeight?: number 
  gap?: number       
}>(), {
  pxPerSec: 120,
  logoHeight: 80,
  gap: 32
})

const track = ref<HTMLElement | null>(null)
const durationSec = ref(0.2)

let ro: ResizeObserver | null = null

function calcDuration() {
  const el = track.value
  if (!el) return
  // track contains two identical sets; half its width is one set
  const halfWidth = el.scrollWidth / 2
  // time = distance / speed
  const t = Math.max(1, halfWidth / props.pxPerSec)
  durationSec.value = t
}

function onImgLoadOnce(img: HTMLImageElement) {
  if (img.complete) return
  img.addEventListener('load', calcDuration, { once: true })
}

onMounted(() => {
  // ensure gaps apply (CSS var)
  document.documentElement.style.setProperty('--logo-gap', props.gap + 'px')

  // recalc on resize & when images load
  ro = new ResizeObserver(calcDuration)
  if (track.value) ro.observe(track.value)
  track.value?.querySelectorAll('img').forEach(img => onImgLoadOnce(img as HTMLImageElement))

  // first calc
  calcDuration()
  window.addEventListener('resize', calcDuration)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', calcDuration)
  if (ro && track.value) ro.unobserve(track.value)
  ro = null
})
</script>

<style scoped>
.slider {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 134px;
  display: flex;
  align-items: center;
}

/* moving strip that already contains the duplicated set */
._logo_track {
  display: flex;
  gap: var(--logo-gap, 32px);
  width: max-content;
  will-change: transform;
  animation: marquee var(--duration, 0.3s) linear infinite;
}

/* seamless loop: move by one set (half of the doubled content) */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.marquee-logo_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.marquee-logo_wrapper img {
  display: block;
  height: v-bind('logoHeight + "px"');
  width: auto;
  object-fit: contain;
}




.marquee-logo{
  width: 165px !important;
}
.marquee_overlay.is-right {
  left: auto; right: 0;
  background: linear-gradient(to left, rgba(0,0,0,.15), rgba(0,0,0,0));
}

@media (prefers-reduced-motion: reduce) {
  ._logo_track { animation: none !important; transform: none !important; }
}
</style>
