<template>
  <div class="py-20 bg-base-300">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold text-center mb-2" data-aos="fade-down">
        The Silent Path to Wealth
      </h1>
      <h2 class="text-xl text-center text-base-content/70 mb-10" data-aos="fade-up" data-aos-delay="100">
        Building for myself. Sharing with you.
      </h2>
      <p class="text-center max-w-3xl mx-auto mb-12 text-base-content/70" data-aos="fade-up" data-aos-delay="100">
        I’m building a <strong>self-sustaining stack of AI-powered tools</strong> to <strong>replace busywork with leverage</strong>. Each product I am building <strong>automates a critical piece of the solopreneur journey</strong>: selling, shipping, and scaling. What starts as an <strong>internal system</strong> becomes a <strong>tool others can use</strong> to <strong>grow on autopilot</strong> — without hustle, noise, or complexity.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div v-for="(feature, index) in features" :key="feature.title" class="card bg-base-100 shadow-xl hover:shadow-accent/20 transition-all duration-300" :data-aos="'fade-up'" :data-aos-delay="index * 100">
          <div class="card-body">
            <div class="text-4xl mb-4">{{ feature.emoji }}</div>
            <h3 class="card-title">{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            <ul class="mt-4 space-y-2 text-base-content/70">
              <li v-for="item in feature.items" :key="item" class="flex items-center gap-2" data-aos="zoom-in" data-aos-delay="50">
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
const features = [
  {
    emoji: "🚀",
    title: "Effortless Sales",
    description: "I replace cold outreach and client chasing. My handles lead gen, smart emails, replies, and custom landing pages — all on autopilot.",
    items: [
      "AI-powered outreach engine",
      "Personalized follow-ups & replies",
      "Dynamic pages for each prospect"
    ]
  },
  {
    emoji: "🏗️",
    title: "Autonomous Product Creation",
    description: "I’m building an AI-driven platform that lets me turn ideas into working SaaS apps without touching a line of code — so I can launch faster, with less friction.",
    items: [
      "Prompt-to-MVP system",
      "No-code backend + frontend",
      "Internal tools → public products"
    ]
  },
  {
    emoji: "💸",
    title: "Capital That Compounds",
    description: "The end goal isn’t just revenue — it’s automated wealth. Profits get reinvested through intelligent AI systems to create long-term freedom.",
    items: [
      "Smart allocation engine",
      "Passive investing logic",
      "Fully hands-off capital growth"
    ]
  }
]


</script>
