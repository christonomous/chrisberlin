<template>
  <div class="py-20 bg-base-300">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12" data-aos="fade-down">My AI Solopreneur Engine for you</h2>
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
    emoji: "🔍",
    title: "Finding Your Niche",
    description: "AI-powered market analysis to identify high-potential business opportunities",
    items: [
      "Market Trend Analysis",
      "Customer Pain Points",
      "Underserved Segments"
    ]
  },
  {
    emoji: "🏗️",
    title: "Rapid MVP Development",
    description: "Streamlined product development using AI automation tools",
    items: [
      "Automated Coding",
      "UI/UX Design",
      "Third-party Integration"
    ]
  },
  {
    emoji: "📢",
    title: "Storytelling & Marketing",
    description: "AI-driven content creation and marketing campaign automation",
    items: [
      "Content Generation",
      "Multi-channel Marketing",
      "SEO Optimization"
    ]
  },
  {
    emoji: "💰",
    title: "Sales Automation",
    description: "Intelligent lead generation and prospect engagement systems",
    items: [
      "AI Chatbots",
      "Email Sequences",
      "Data-driven Strategies"
    ]
  },
  {
    emoji: "⚙️",
    title: "Automated Business Operation",
    description: "Set-and-forget systems for running your business autonomously",
    items: [
      "Automated Customer Support",
      "Revenue Management",
      "Performance Monitoring"
    ]
  },
  {
    emoji: "💸",
    title: "Maximize Capital",
    description: "Automated cash-flow and investment management for optimal returns",
    items: [
      "Cash-flow Strategy",
      "Investment Automation",
      "Financial Optimization"
    ]
  }
]
</script>
