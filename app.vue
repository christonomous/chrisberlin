<template>
  <div class="min-h-screen bg-base-300" data-theme="dark">
    <!-- Hero Section -->
    <div class="hero min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-300">
      <div class="hero-content text-center">
        <div class="max-w-3xl">
          <h1 class="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">Chris Berlin</h1>
          <div class="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
            <span class="text-4xl">🧑‍💻</span>
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-success to-accent">Grow on Autopilot</span>
            <span class="text-4xl">📈</span>
          </div>
          <p class="py-6 text-xl text-base-content/80">AI Solopreneur | SaaS Builder | Automation Expert</p>
          <button class="btn btn-primary btn-lg">Explore My Work</button>
        </div>
      </div>
    </div>

    <!-- Mission Statement -->
    <div class="py-20 bg-base-200">
      <div class="container mx-auto px-4">
        <div class="card bg-base-100 shadow-xl max-w-4xl mx-auto">
          <div class="card-body text-center">
            <div class="text-2xl space-y-2">
              <span class="text-3xl">💎</span>
              <p class="leading-relaxed">
                I empower you to find your leverage, so you can grow effortless on autopilot, 
                save time, and become free
                <span class="text-3xl">📈</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="py-20 bg-base-300">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">What Sets Me Apart</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div class="card bg-base-100 shadow-xl hover:shadow-accent/20 transition-all duration-300">
            <div class="card-body">
              <div class="text-4xl mb-4">🤖</div>
              <h3 class="card-title">AI-Powered Solutions</h3>
              <p>Building intelligent systems that automate complex workflows and business processes</p>
            </div>
          </div>
          <div class="card bg-base-100 shadow-xl hover:shadow-primary/20 transition-all duration-300">
            <div class="card-body">
              <div class="text-4xl mb-4">🚀</div>
              <h3 class="card-title">Monthly Business Launch</h3>
              <p>Consistently launching autonomous online businesses as proof of concept</p>
            </div>
          </div>
          <div class="card bg-base-100 shadow-xl hover:shadow-secondary/20 transition-all duration-300">
            <div class="card-body">
              <div class="text-4xl mb-4">⚡</div>
              <h3 class="card-title">Automation Expert</h3>
              <p>Creating systems that run on autopilot, giving you back your valuable time</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="py-20 bg-base-200">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold mb-6">Ready to Automate Your Success?</h2>
          <p class="mb-8 text-lg text-base-content/80">Join me in revolutionizing solopreneurship through automation and AI</p>
          <div class="flex gap-4 justify-center">
            <button class="btn btn-primary btn-lg">Get Started</button>
            <button class="btn btn-ghost btn-lg">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}
</style>
