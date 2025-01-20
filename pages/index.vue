<template>
  <div class="min-h-screen bg-base-300" data-theme="dark">
    <HeroSection />
    <Features />
    <BusinessShowcase />
    <ContactCTA />
  </div>
</template>

<script setup>
import HeroSection from '~/components/HeroSection.vue'
import Features from '~/components/Features.vue'
import BusinessShowcase from '~/components/BusinessShowcase.vue'
import ContactCTA from '~/components/ContactCTA.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 50
  })
})
</script>
