<template>
  <section class="py-16 bg-base-200">
    <div class="container mx-auto px-4">
      <h2 
        class="text-4xl font-bold text-center mb-12"
        data-aos="fade-up"
      >
        All about Mindset
      </h2>
      <div class="columns-1 md:columns-2 lg:columns-3 gap-8">
        <template v-for="(image, index) in images" :key="image">
          <div 
            v-show="!imageErrors[index]"
            class="relative overflow-hidden rounded-lg shadow-xl group break-inside-avoid mb-8"
            :data-aos="index % 2 === 0 ? 'fade-left' : 'fade-right'"
            :data-aos-delay="index * 100"
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
  </section>
</template>

<script setup>
import { usePostImages } from '~/composables/usePostImages'
import { ref } from 'vue'

const { images } = usePostImages()
const imageErrors = ref(Array(20).fill(false))
</script>
