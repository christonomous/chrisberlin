<template>
  <div class="min-h-screen bg-base-300" data-theme="dark">
    <HeroSection />
    <MissionStatement />
    <Features />
    <BusinessShowcase />
    <ContactCTA />
  </div>
</template>

<script setup>
import HeroSection from './components/HeroSection.vue'
import MissionStatement from './components/MissionStatement.vue'
import Features from './components/Features.vue'
import BusinessShowcase from './components/BusinessShowcase.vue'
import ContactCTA from './components/ContactCTA.vue'
</script>
