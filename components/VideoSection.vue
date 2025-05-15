<script setup>
import { ref, onMounted } from 'vue'

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
</script>

<template>
  <section class="py-16 bg-base-200">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-4">My Old Startup Life</h2>
      <p class="text-center max-w-2xl mx-auto mb-8 text-lg">
        Through my journey of unsuccessful startups in the past, I've gained invaluable experience and wisdom. Each failure has been a stepping stone to greater understanding and resilience. <br> The most important lesson I've learned is to <b>never give up</b> - persistence and continuous learning are the keys to eventual success.
      </p>
      <div class="flex justify-center">
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/vn4Z-F8iuWg?si=lLS2ImOnXckVIgaT" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" 
          allowfullscreen
          class="rounded-lg shadow-lg"
        ></iframe>
      </div>
      <div class="mt-8 text-center italic text-lg text-gray-400 max-w-2xl mx-auto">
        <p>
          Special thanks to the guys from Lisk and Builders On The Block for the massive support. You definitely should check out 
          <a href="https://onchain.org/foundation/" class="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
            Onchain Foundation
          </a>
        </p>
      </div>
      
      <!-- Button to show startup materials -->
      <div class="mt-8 text-center">
        <button 
          class="btn btn-outline"
          @click="showStartupsModal = true"
        >
          View Startup Journey Materials
        </button>
      </div>
    </div>

    <!-- Modal for startup materials -->
    <dialog :class="['modal', showStartupsModal ? 'modal-open' : '']">
      <div class="modal-box max-w-7xl">
        <h3 class="font-bold text-2xl mb-2">Startup Journey Materials</h3>
        <p class="text-base-content/70 mb-6">These materials showcase my past startup ventures which are now closed. They represent valuable learning experiences that have shaped my current approach to business.</p>
        <!-- Masonry grid -->
        <div class="columns-2 md:columns-3 lg:columns-4 gap-4">
          <div v-for="(image, index) in startupImages" :key="index" class="break-inside-avoid mb-4">
            <img 
              :src="image" 
              :alt="`Startup material ${index + 1}`"
              class="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        </div>
        <div class="modal-action">
          <button class="btn" @click="showStartupsModal = false">Close</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop" @click="showStartupsModal = false">
        <button>close</button>
      </form>
    </dialog>
  </section>
</template>
