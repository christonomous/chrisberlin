<template>
  <div class="py-20 bg-base-300">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold text-center mb-2" data-aos="fade-down">
        Buy Back Your Most Precious Asset: Time
      </h1>
      <h2 class="text-xl text-center text-base-content/70 mb-10" data-aos="fade-up" data-aos-delay="100">
        Automation is the key to freedom
      </h2>
      <p class="text-center max-w-3xl mx-auto mb-12 text-base-content/70" data-aos="fade-up" data-aos-delay="100">
        I leverage <strong>AI, coding, and crypto expertise</strong> to help you <strong>reclaim your time through automation</strong>. By combining <strong>cutting-edge technology with practical solutions</strong>, I create systems that work for you 24/7. Transform your <strong>time-consuming tasks</strong> into <strong>automated workflows</strong> that run themselves — giving you back hours every day for what truly matters.
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
    emoji: "🤖",
    title: "AI Automation",
    description: "Harness the power of artificial intelligence to automate repetitive tasks and decision-making processes, freeing up your valuable time.",
    items: [
      "Custom AI solutions development",
      "Workflow automation systems",
      "Smart decision algorithms"
    ]
  },
  {
    emoji: "⚡",
    title: "Code & Integration",
    description: "Expert development services to create efficient, scalable systems that connect your tools and automate your processes end-to-end.",
    items: [
      "Custom software development",
      "API integrations & automation",
      "Technical architecture design"
    ]
  },
  {
    emoji: "📈",
    title: "Crypto & DeFi",
    description: "Leverage blockchain technology and DeFi protocols to create automated income streams and optimize your crypto investments.",
    items: [
      "Smart contract development",
      "DeFi automation strategies",
      "Crypto portfolio optimization"
    ]
  }
]


</script>
