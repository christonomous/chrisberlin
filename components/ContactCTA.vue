<script setup lang="ts">
import { ref } from 'vue'
import { useSubscribe } from '../modules/subscription/runtime/composables/useSubscribe'

const { subscribe, subscribing, error, success } = useSubscribe()
const email = ref('')

const handleSubscribe = async () => {
  await subscribe(email.value)
  if (success.value) {
    email.value = ''
  }
}
</script>

<template>
  <div class="py-20 bg-base-200">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto space-y-12">
        <!-- Newsletter Section -->
        <div class="card bg-base-100 shadow-xl" data-aos="fade-down">
          <div class="card-body text-center">
            <h2 class="text-3xl font-bold mb-6">Get your time back</h2>
            <p class="mb-8 text-lg text-base-content/80">
              Receive exclusive automation strategies and insights on buying back your time!
            </p>
            <div class="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input 
                v-model="email"
                type="email" 
                placeholder="Enter your email" 
                class="input input-bordered flex-grow" 
                :class="{ 'input-error': error }"
                @keyup.enter="handleSubscribe"
              />
              <button 
                class="btn btn-gradient" 
                :class="{ 'loading': subscribing }"
                @click="handleSubscribe"
                :disabled="subscribing"
              >
                Subscribe
              </button>
              <div v-if="error" class="text-error text-sm mt-2">{{ error }}</div>
              <div v-if="success" class="text-success text-sm mt-2">Successfully subscribed!</div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="w-full gap-6">
          <!-- Activate Assistant -->
          <div class="card bg-base-100 shadow-xl text-center" data-aos="fade-up" data-aos-delay="200">
            <div class="card-body items-center text-center">
              <h3 class="card-title flex gap-2 justify-center">
                <span class="text-2xl">⚡</span>
                Your Personal AI Assistant
              </h3>
              <p class="text-base-content/70 mb-4">
                Access my AI assistant - powered by my expertise in automation, coding, and crypto - to discover personalized ways to buy back your time through technology. No complexity. Just pure time-saving solutions.
              </p>
              <button class="btn btn-gradient w-full" @click="$emit('open-chat')">
                Activate the Assistant
              </button>
            </div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="flex justify-center gap-4" data-aos="fade-up" data-aos-delay="600">
          <a href="https://www.linkedin.com/in/christonomous/" target="_blank" class="btn btn-circle btn-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://www.youtube.com/@Christonomous" target="_blank" class="btn btn-circle btn-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
          </a>
          <a href="https://soundcloud.com/equaliser" target="_blank" class="btn btn-circle btn-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 17.939h-1v-8.068c.308-.231.639-.429 1-.566v8.634zm3 0h1v-9.224c-.229.265-.443.548-.621.857l-.379-.184v8.551zm-2 0h1v-8.848c-.508-.079-.623-.05-1-.01v8.858zm-4 0h1v-7.02c-.312.458-.555.971-.692 1.535l-.308-.182v5.667zm-3-5.25c-.606.547-1 1.354-1 2.268 0 .914.394 1.721 1 2.268v-4.536zm18.879-.671c-.204-2.837-2.404-5.079-5.117-5.079-1.022 0-1.964.328-2.762.877v10.123h9.089c1.607 0 2.911-1.393 2.911-3.106 0-2.233-2.168-3.772-4.121-2.815zm-16.879-.027c-.302-.024-.526-.03-1 .122v5.689c.446.143.636.138 1 .138v-5.949z"/></svg>
          </a>
          <a href="https://github.com/christonomous" target="_blank" class="btn btn-circle btn-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>

        <!-- Copyright -->
        <div class="text-center mt-8">
          <span class="text-sm text-base-content/70" data-aos="fade-up" data-aos-delay="800">All rights reserved</span>
        </div>
      </div>
    </div>
  </div>
</template>
