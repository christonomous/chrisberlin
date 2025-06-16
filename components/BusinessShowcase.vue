<template>
  <div class="py-20 bg-gradient-to-br from-base-300 via-base-200 to-base-300">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-6" data-aos="fade-down">
        Tools I Build to Grow on Autopilot
      </h2>
      <div class="max-w-3xl mx-auto mb-8 text-center" data-aos="fade-up" data-aos-delay="100">
        <p class="text-base-content/80">
          I don't build startups. I build systems. Each tool I launch solves a real need in my own business — then becomes something others can use to do the same. These aren’t experiments. They’re working pieces of a quiet, self-sustaining growth engine.
        </p>
      </div>

      <div class="max-w-3xl mx-auto mb-12 text-center bg-base-100 p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="200">
        <h3 class="text-2xl font-bold mb-4">🛠️ Now Live: Effortless Sales</h3>
        <p class="text-base-content/80 mb-6">
          The first product in the stack is <strong>Sales on Autopilot</strong> — a complete system for lead generation, outreach, smart follow-ups, and dynamic landing pages. Built to run my agency pipeline without manual effort. Now, it’s available to help you fill yours.
        </p>
        <div class="inline-flex items-center gap-2 text-primary">
          <span class="text-xl">🧩</span>
          <span class="font-semibold">Part 1 of a 3-part AI growth engine</span>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto">
        <a v-for="(business, index) in businessList" 
          :key="business.title" 
          :href="business.title === 'BRANE Media Ltd' ? 'https://brane.media' : '#'"
          target="_blank"
          rel="noopener noreferrer"
          class="card bg-base-100 shadow-xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden cursor-pointer" 
          :data-aos="'fade-up'" 
          :data-aos-delay="400 + (index * 100)">
          
          <div class="card-body relative">
            <!-- Logo -->
            <div class="w-16 h-16 rounded-full bg-base-100 p-1 shadow-lg mb-4 mx-auto">
              <img :src="business.logo" :alt="business.title + ' logo'" class="w-full h-full object-cover rounded-full">
            </div>
            
            <!-- Title and Description -->
            <div class="text-center">
              <h3 class="text-2xl font-bold mb-2 text-center">{{ business.title }}</h3>
              <p class="text-base-content/70 mb-6">{{ business.description }}</p>
            </div>
            
            <!-- Stats -->
            <div class="px-4 md:px-8">
              <div class="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-3 mb-6 max-w-lg mx-auto">
                <div v-for="stat in business.stats" :key="stat.label" class="text-center">
                  <div class="text-2xl font-bold text-primary">{{ stat.value }}</div>
                  <div class="text-sm text-base-content/70">{{ stat.label }}</div>
                </div>
              </div>
            </div>
            
            <!-- Features -->
            <div class="mb-6">
              <h4 class="font-semibold mb-3">Platform Features</h4>
              <div class="grid grid-cols-2 gap-2">
                <div v-for="feature in business.features" :key="feature" class="flex items-center gap-2">
                  <div class="text-primary">✓</div>
                  <div class="text-sm">{{ feature }}</div>
                </div>
              </div>
            </div>
            
            <!-- Badges -->
            <div class="card-actions justify-between items-center mt-4">
              <div class="flex gap-2">
                <div v-for="badge in business.badges" :key="badge.text" :class="`badge badge-${badge.color}`">{{ badge.text }}</div>
              </div>
              <div class="badge badge-outline">Launched {{ formatDate(business.launch_date) }}</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, onMounted, onUnmounted, ref } from 'vue'

const { data: businessList } = await useFetch('/api/launches')
const showStartupsModal = ref(false)

// Get all startup images
const startupImages = ref([])
onMounted(() => {
  // Get all images from the startups folder
  const images = []
  for (let i = 1; i <= 19; i++) {
    images.push(`/imgs/startups/photo_${i}_2025-05-15_12-31-16.jpg`)
  }
  startupImages.value = images
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Determine if this is the first business launch
const isFirstLaunch = computed(() => {
  return !businessList.value || businessList.value.length === 0
})

// Find the latest launch date and set target date to 30 days after that
const getLatestLaunchDate = computed(() => {
  if (!businessList.value || businessList.value.length === 0) {
    // If no businesses, set to February 19th 2025
    return new Date('2025-06-21')
  }
  
  const latestBusiness = businessList.value.reduce((latest, current) => {
    const currentDate = new Date(current.launch_date)
    const latestDate = new Date(latest.launch_date)
    return currentDate > latestDate ? current : latest
  }, businessList.value[0])
  
  const launchDate = new Date(latestBusiness.launch_date)
  return new Date(launchDate.getTime() + (30 * 24 * 60 * 60 * 1000))
})

// Reactive countdown values
const countdown = reactive({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

// Update countdown
const updateCountdown = () => {
  const now = new Date().getTime()
  const targetDate = getLatestLaunchDate.value
  const distance = targetDate.getTime() - now

  if (distance < 0) {
    countdown.days = 0
    countdown.hours = 0
    countdown.minutes = 0
    countdown.seconds = 0
    return
  }

  countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24))
  countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000)
}

// Update countdown every second
onMounted(() => {
  updateCountdown()
  const timer = setInterval(updateCountdown, 1000)
  
  onUnmounted(() => {
    clearInterval(timer)
  })
})
</script>
