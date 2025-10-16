<template>
  <div class="min-h-screen bg-base-100 text-base-content relative overflow-hidden">
    <!-- Background Accents -->
    <div class="pointer-events-none fixed inset-0 opacity-40">
      <div class="absolute -top-24 -right-24 w-[40rem] h-[40rem] rounded-full blur-3xl bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 animate-gradient"></div>
      <div class="absolute -bottom-24 -left-24 w-[32rem] h-[32rem] rounded-full blur-3xl bg-gradient-to-r from-accent/20 via-secondary/20 to-primary/20 animate-gradient [animation-delay:2s]"></div>
    </div>

    <!-- Chat Widget -->
    <div v-if="isOpen" class="fixed bottom-24 right-5 z-50 w-[400px]">
      <ChatWidget @close="closeWidget" />
    </div>

    <!-- Page Sections -->
    <div class="min-h-screen">
      <HeroSection :profile-image="profileImage" />
      <SocialLinks />
    </div>
    <AiDefiIntersectSection class="container mx-auto" />
    <TimelineSection />
    <OfferSection />
    <DifferentiatorsSection />
    <WorkHighlights />
    <ReportsSection />
    <FAQSection />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import ChatWidget from '~/components/chat/ChatWidget.vue'
import HeroSection from '~/components/HeroSection.vue'
import SocialLinks from '~/components/SocialLinks.vue'
import TimelineSection from '~/components/TimelineSection.vue'
import OfferSection from '~/components/OfferSection.vue'
import DifferentiatorsSection from '~/components/trading/DifferentiatorsSection.vue'
import WorkHighlights from '~/components/WorkHighlights.vue'
import ReportsSection from '~/components/ReportsSection.vue'
import FAQSection from '~/components/FAQSection.vue'
import FooterSection from '~/components/FooterSection.vue'
import AiDefiIntersectSection from '~/components/AiDefiIntersectSection.vue'
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

const props = defineProps<{ profileImage?: string }>()
const profileImage = computed(() => props.profileImage ?? '/profile.jpg')
const isOpen = ref(false)

const toggleWidget = () => {
  isOpen.value = !isOpen.value
}

const closeWidget = () => {
  isOpen.value = false
}

const form = reactive({
  name: '',
  email: '',
  company: '',
  goal: '',
  ndacall: false,
})
const submitted = ref(false)

function onSubmit(){
  // TODO: integrate with your backend or form tool
  console.log('Lead', { ...form })
  submitted.value = true
}
</script>

<style>
/* Animated brand gradient utility (used by headings & buttons) */
.animate-gradient{ background-size:300% 300%; animation:gradientShift 8s ease infinite; }
@keyframes gradientShift{ 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

/* Card glow on hover for the Apple/Revolut vibe */
.card:hover{ box-shadow: 0 10px 30px 0 rgb(0 0 0 / .25), 0 0 0 1px color-mix(in oklab, var(--fallback-p,oklch(var(--p))), transparent 85%); transition: box-shadow .3s ease; }
</style>
