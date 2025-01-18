<template>
  <div class="min-h-screen bg-base-300" data-theme="dark">
    <HeroSection />
    <Features />
    <BusinessShowcase />
    <ContactCTA />
  </div>
</template>

<script setup>
import HeroSection from './components/HeroSection.vue'
import Features from './components/Features.vue'
import BusinessShowcase from './components/BusinessShowcase.vue'
import ContactCTA from './components/ContactCTA.vue'
</script>

<style>
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.btn-gradient {
  background-image: linear-gradient(to right, theme('colors.primary'), theme('colors.secondary'), theme('colors.accent'));
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
  border: none;
  color: theme('colors.base-100');
}

.btn-gradient:hover {
  opacity: 0.9;
}

.ring-gradient {
  position: relative;
}

.ring-gradient::before {
  content: '';
  position: absolute;
  inset: -6px;
  padding: 6px;
  transform: translate(2px, -2px);
  border-radius: 50%;
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  background: linear-gradient(to right, theme('colors.primary'), theme('colors.secondary'), theme('colors.accent'));
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}
</style>
