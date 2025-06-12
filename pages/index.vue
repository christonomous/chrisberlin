<template>
  <div class="min-h-screen bg-base-300" data-theme="dark">
    <!-- Chat Button -->
    <button 
      class="btn bg-gradient-to-r from-primary via-secondary to-accent animate-gradient text-white btn-circle btn-lg fixed bottom-5 right-5 shadow-lg hover:shadow-xl transition-shadow z-50"
      @click="toggleWidget"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>

    <!-- Chat Widget -->
    <div v-if="isOpen" class="fixed bottom-24 right-5 z-50 w-[400px]">
      <ChatWidget/>
    </div>

    <HeroSection />
    <Features />
    <BusinessShowcase />
    <ImageGrid />
    <VideoSection />
    <ContactCTA />
  </div>
</template>

<script setup>
import HeroSection from '~/components/HeroSection.vue'
import Features from '~/components/Features.vue'
import BusinessShowcase from '~/components/BusinessShowcase.vue'
import ContactCTA from '~/components/ContactCTA.vue'
import ImageGrid from '~/components/ImageGrid.vue'
import VideoSection from '~/components/VideoSection.vue'
import ChatWidget from '~/components/chat/ChatWidget.vue'
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

const isOpen = ref(false)

const toggleWidget = () => {
  isOpen.value = !isOpen.value
  trackButtonClick('chat_toggle')
}
</script>

<style scoped>
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}
</style>