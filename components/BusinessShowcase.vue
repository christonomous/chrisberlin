<template>
  <div class="py-20 bg-gradient-to-br from-base-300 via-base-200 to-base-300">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Monthly Business Launches</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div v-for="business in businesses.launches" :key="business.title" class="card bg-base-100 shadow-xl hover:shadow-primary/20 transition-all duration-300">
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
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-12 flex flex-col justify-center items-center">
        <h3 class="text-2xl font-bold text-center mb-6">Time till launch a new Business</h3>
        <div class="grid auto-cols-max grid-flow-col gap-5 text-center">
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
const { businesses } = useFetchContent()

// Set target date (e.g., 1 month from now)
const targetDate = new Date()
targetDate.setMonth(targetDate.getMonth() + 1)

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
  const distance = targetDate.getTime() - now

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
