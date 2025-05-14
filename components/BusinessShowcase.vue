<template>
  <div class="py-20 bg-gradient-to-br from-base-300 via-base-200 to-base-300">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-6" data-aos="fade-down">Monthly Business Launches</h2>
      <div class="max-w-3xl mx-auto mb-8 text-center" data-aos="fade-up" data-aos-delay="100">
        <p class="text-base-content/80">
          Beginning 2024 I have successfully launched my <b>AI Automation Agency BRANE Media Ltd</b>. Now the next steps are to <b>launch one SaaS after another to achieve passive income</b> and I want to show you how you can do as well.
        </p>
      </div>
      <div class="max-w-3xl mx-auto mb-12 text-center bg-base-100 p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="200">
        <h3 class="text-2xl font-bold mb-4">30-Day Business Challenge</h3>
        <p class="text-base-content/80 mb-6">
          I'm not just teaching—I'm doing. In February 2025, I'll prove you can build a profitable online business in just 30 days using my AI Solopreneur Engine. Each business launched will be a proof of concept, demonstrating how you can leverage my tools to do the same effortlessly.
        </p>
        <div class="inline-flex items-center gap-2 text-primary">
          <span class="text-xl">🚀</span>
          <span class="font-semibold">Follow my journey to see exactly how it's done</span>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div v-for="(business, index) in businessList" :key="business.title" class="card bg-base-100 shadow-xl hover:shadow-primary/20 transition-all duration-300" :data-aos="'fade-up'" :data-aos-delay="400 + (index * 100)">
          <figure class="px-6 pt-6">
            <div class="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <span class="text-4xl">{{ business.emoji }}</span>
            </div>
          </figure>
          <div class="card-body">
            <h3 class="card-title">{{ business.title }}</h3>
            <p class="text-base-content/70">{{ business.description }}</p>
            <div class="card-actions justify-end mt-4">
              <div v-for="badge in business.badges" :key="badge.text" :class="`badge badge-${badge.color}`">{{ badge.text }}</div>
              <div class="badge badge-outline">Launched {{ formatDate(business.launch_date) }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-12 flex flex-col justify-center items-center" data-aos="fade-up" data-aos-delay="800">
        <h3 class="text-2xl font-bold text-center mb-6">Time till {{ isFirstLaunch ? 'first' : 'next' }} Business Launch</h3>
        <div class="grid auto-cols-max grid-flow-col gap-5 text-center" data-aos="zoom-in" data-aos-delay="1000">
          <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
            <span class="countdown font-mono text-5xl">
              <span :style="`--value:${countdown.days}`"></span>
            </span>
            days
          </div>
          <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
            <span class="countdown font-mono text-5xl">
              <span :style="`--value:${countdown.hours}`"></span>
            </span>
            hours
          </div>
          <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
            <span class="countdown font-mono text-5xl">
              <span :style="`--value:${countdown.minutes}`"></span>
            </span>
            min
          </div>
          <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
            <span class="countdown font-mono text-5xl">
              <span :style="`--value:${countdown.seconds}`"></span>
            </span>
            sec
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, onMounted, onUnmounted } from 'vue'

const { data: businessList } = await useFetch('/api/launches')

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
    return new Date('2025-05-21')
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
