<template>
  <section class="py-16 bg-base-200">
    <div class="container mx-auto px-4">
      <h2 
        class="text-4xl font-bold text-center mb-12"
        data-aos="fade-up"
      >
        All about Mindset
      </h2>
      
      <div class="collapse bg-base-100 shadow-xl rounded-box">
        <input type="checkbox" /> 
        <div class="collapse-title text-xl font-medium flex items-center justify-between">
          View Photo Gallery
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div class="collapse-content">
          <div class="columns-1 md:columns-2 lg:columns-3 gap-8 pt-4">
            <template v-for="(image, index) in images" :key="image">
              <div 
                v-show="!imageErrors[index]"
                class="relative overflow-hidden rounded-lg shadow-xl group break-inside-avoid mb-8"
              >
                <img 
                  :src="`/imgs/posts/${image}`"
                  loading="lazy"
                  :alt="`Mindset Photo ${index + 1}`"
                  class="w-full transform transition-transform duration-300 group-hover:scale-105"
                  @error="imageErrors[index] = true"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { usePostImages } from '~/composables/usePostImages'
import { ref } from 'vue'

const { images } = usePostImages()
const imageErrors = ref(Array(20).fill(false))
</script>
