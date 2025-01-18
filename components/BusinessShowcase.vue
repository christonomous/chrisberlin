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
    </div>
  </div>
</template>

<script setup>
const { businesses } = useFetchContent()
</script>
