<template>
  <section class="relative isolate">
    <div class="container mx-auto max-w-6xl px-4 pt-12 md:pt-20 grid md:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
      <div>
        <h1 class="text-4xl md:text-6xl leading-tight font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
          Agentic Crypto
        </h1>
        <p class="opacity-80 text-lg md:text-xl max-w-2xl">
          Hi, I’m Chris, and I contribute to shaping the future of <b>AI x Crypto</b>. Let <span class="font-semibold">AI agents & capital work for you</span>.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a href="#reports" class="btn bg-gradient-to-r from-primary via-secondary to-accent animate-gradient text-base-100 border-0">Market Reports</a>
          <a href="#work" class="btn btn-outline">Businesses</a>
        </div>
        <div class="mt-6 text-sm opacity-70">
          <span class="inline-flex items-center gap-2">The Future is Automated & Decentralized</span>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="avatar">
          <div class="w-48 rounded-2xl ring-gradient ringring-offset-2 ring-offset-base-100 shadow-xl rounded-full">
            <img :src="profileImage" alt="Chris profile" class=""/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ profileImage?: string }>()
const profileImage = computed(() => props.profileImage ?? '/profile.jpg')
</script>
