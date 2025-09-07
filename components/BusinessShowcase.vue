<template>
  <div class="py-20 bg-gradient-to-br from-base-300 via-base-200 to-base-300">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-6" data-aos="fade-down">
        Time-Saving Solutions
      </h2>
      <div class="max-w-3xl mx-auto mb-8 text-center" data-aos="fade-up" data-aos-delay="100">
        <p class="text-base-content/80">
          I specialize in building automated systems that give you back your time. By combining AI, and advanced coding, I create solutions that work 24/7 so you don't have to. These aren't just tools - they're your personal time-multipliers.
        </p>
      </div>

     <!--  <div class="max-w-3xl mx-auto mb-12 text-center bg-base-100 p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="200">
        <h3 class="text-2xl font-bold mb-4">⚡ Featured: Time Automation Suite</h3>
        <p class="text-base-content/80 mb-6">
          Introducing the <strong>Time Automation Suite</strong> - an integrated system combining AI, custom coding, and crypto automation. Built to handle complex tasks, manage digital assets, and optimize processes automatically. Your personal time-buying machine.
        </p>
        <div class="inline-flex items-center gap-2 text-primary">
          <span class="text-xl">🔄</span>
          <span class="font-semibold">Automated 24/7 operation for maximum time leverage</span>
        </div>
      </div> -->
      
      <div class="max-w-7xl mx-auto">
        <a v-for="(business, index) in businessList" 
          :key="business.title" 
          :href="business.title === 'Revoro Consulting' ? 'https://revoro.consulting' : 'https://revoro.consulting'"
          target="_blank"
          rel="noopener noreferrer"
          class="card bg-base-100 shadow-xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden cursor-pointer" 
          :data-aos="'fade-up'" 
          :data-aos-delay="400 + (index * 100)">
          
          <div class="card-body relative">
            <!-- Logo -->
            <div class="w-16 h-16 rounded-full bg-base-100 p-1 shadow-lg mb-4 mx-auto">
              <img src="https://revoro.consulting/logo_light.svg" class="w-full h-full object-cover rounded-full">
            </div>
            
            <!-- Title and Description -->
            <div class="text-center">
              <h3 class="text-2xl font-bold mb-2 text-center">Revoro Consulting</h3>
              <p class="text-base-content/70 mb-6">We cut your development costs by up to 70% while delivering 5x faster and more efficient solutions through AI-powered development. </p>
            </div>
            
            <!-- Stats -->
            <div class="px-4 md:px-8">
              <div class="flex flex-row justify-center mb-6 max-w-lg mx-auto">
                <div class="text-center">
                  <div class="text-2xl font-bold text-primary">70%</div>
                  <div class="text-sm text-base-content/70">Average reduction in development costs</div>
                </div>

                <div class="text-center">
                  <div class="text-2xl font-bold text-primary">5x</div>
                  <div class="text-sm text-base-content/70">Faster development and deployment cycles</div>
                </div>
              </div>
            </div>
            
            <!-- Features -->
            <!-- <div class="mb-6">
              <h4 class="font-semibold mb-3">Platform Features</h4>
              <div class="grid grid-cols-2 gap-2">
                <div v-for="feature in business.features" :key="feature" class="flex items-center gap-2">
                  <div class="text-primary">✓</div>
                  <div class="text-sm">{{ feature }}</div>
                </div>
              </div>
            </div> -->
            
            <!-- Badges -->
            <div class="card-actions justify-between items-center mt-4">
              <!-- <div class="flex gap-2">
                <div v-for="badge in business.badges" :key="badge.text" :class="`badge badge-${badge.color}`">{{ badge.text }}</div>
              </div> -->
              <div class="badge badge-outline">Launched February 2024</div>
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
