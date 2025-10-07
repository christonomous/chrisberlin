<template>
  <section class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-16 mb-16">
    <div class="text-center sm:text-left mb-8 sm:mb-12">
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
        My Journey
      </h2>
      <p class="text-base sm:text-lg lg:text-xl opacity-80 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
        A story of relentless learning, bold pivots, and the unwavering belief in automating the future for everyone.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12 lg:mb-16">
      <!-- Story Content -->
      <div class="space-y-6">
        <div class="card bg-base-200/40 border border-base-300/20 shadow-lg">
          <div class="card-body">
            <h3 class="text-xl font-semibold mb-4 text-primary">The Foundation Years</h3>
            <p class="opacity-90 leading-relaxed">
              I always believed in automating the future and building a future that belongs to the people.
              My journey began as a call agent for web hosting and server administration. Even then, I knew
              everything I'd learn would give me the foundation to understand technologies that shape our future.
            </p>
          </div>
        </div>

        <div class="card bg-base-200/40 border border-base-300/20 shadow-lg">
          <div class="card-body">
            <h3 class="text-xl font-semibold mb-4 text-secondary">The Freelance Bridge</h3>
            <p class="opacity-90 leading-relaxed">
              Those early experiences became my vehicle. I transitioned into freelancing, mastering software
              development, product design, business operations, and branding. Each skill wasn't just a job -
              it was another tool for understanding how technology could serve humanity.
            </p>
          </div>
        </div>

        <div class="card bg-base-200/40 border border-base-300/20 shadow-lg">
          <div class="card-body">
            <h3 class="text-xl font-semibold mb-4 text-accent">The Crypto Awakening</h3>
            <p class="opacity-90 leading-relaxed">
              When I entered crypto, I knew I wanted to build machines that make money. I launched
              <strong>Cunoro Finance</strong> with its deflationary token "Bend" - an on-chain bonding treasury
              for arbitrage trading. We hit a $45k market cap during summer 2022.
            </p>
          </div>
        </div>
      </div>

      <!-- Visual Content -->
      <div class="space-y-4 sm:space-y-6">
        <div class="card bg-base-200/60 border border-base-300/20 shadow-xl">
          <div class="card-body p-4 sm:p-6">
            <h3 class="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Builders on the Block Interview</h3>
            <p class="text-sm sm:text-base mb-4">ecosis Network is now rebranded to Autonomous Enterprises.</p>
            <div class="relative w-full aspect-video bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg overflow-hidden border-2 border-dashed border-base-300/50">
              <iframe
                class="w-full h-full"
                src="https://www.youtube.com/embed/vn4Z-F8iuWg?si=qsaEPAqGjCQ2vYvd"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen>
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- The Culmination -->
    <div class="card bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 shadow-xl">
      <div class="card-body text-center">
        <h3 class="text-2xl font-bold mb-4">The Perfect Storm</h3>
        <p class="opacity-90 leading-relaxed max-w-4xl mx-auto mb-6">
          My experience spans software development, product design, business operations, AI, crypto, and branding.
          Each chapter wasn't random - it was preparation. Now I'm building autonomous AI agents that manage on-chain capital,
          combining the best of both worlds to create something that serves everyone, not just institutions.
        </p>
        <div class="flex flex-wrap justify-center gap-4 text-sm opacity-70">
          <span class="badge badge-primary">Software Development</span>
          <span class="badge badge-secondary">Product Design</span>
          <span class="badge badge-accent">Business Operations</span>
          <span class="badge badge-info">AI & Automation</span>
          <span class="badge badge-success">DeFi & Crypto</span>
          <span class="badge badge-warning">Branding & Growth</span>
        </div>
      </div>
    </div>
  </section>
</template>
