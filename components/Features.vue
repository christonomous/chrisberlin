<template>
  <div class="py-20 bg-base-300">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">My AI Solopreneur Engine for you</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div v-for="feature in features" :key="feature.title" class="card bg-base-100 shadow-xl hover:shadow-accent/20 transition-all duration-300">
          <div class="card-body">
            <div class="text-4xl mb-4">{{ feature.emoji }}</div>
            <h3 class="card-title">{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            <ul class="mt-4 space-y-2 text-base-content/70">
              <li v-for="item in feature.items" :key="item" class="flex items-center gap-2">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { features } = useFetchContent()
</script>
