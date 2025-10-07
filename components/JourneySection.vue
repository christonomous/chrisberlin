<template>
  <section class="container mx-auto max-w-6xl px-4 mt-16 mb-16">
    <div class="text-center mb-12 w-full">
      <h2 class="text-3xl text-left font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
        My Journey
      </h2>
      <p class="text-lg text-left opacity-80 max-w-3xl">
        A story of relentless learning, bold pivots, and the unwavering belief in automating the future for everyone
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-12 items-center mb-16">
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
            <div class="mt-4 flex flex-wrap gap-3">
              <a href="https://x.com/cunorofinance"
                 target="_blank"
                 class="btn btn-outline btn-sm">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Old Twitter Account
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Visual Content -->
      <div class="space-y-6">
        <div class="card bg-base-200/60 border border-base-300/20 shadow-xl">
          <div class="card-body">
            <h3 class="text-xl font-semibold mb-4">Cunoro Finance (Disolved)</h3>
            <div class="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center border-2 border-dashed border-base-300/50">
              <img src="/imgs/startups/photo_2025-10-07_12-24-56.jpg" alt="">
            </div>
          </div>
        </div>

        <div class="card bg-base-200/60 border border-base-300/20 shadow-xl">
          <div class="card-body">
            <h3 class="text-xl font-semibold mb-4">Builders on the Block Interview</h3>
            <div class="aspect-video bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg flex items-center justify-center border-2 border-dashed border-base-300/50">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/vn4Z-F8iuWg?si=qsaEPAqGjCQ2vYvd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- The Learning Curve Section -->
    <div class="grid md:grid-cols-3 gap-8 mb-16">
      <div class="card bg-base-200/40 border border-base-300/20 shadow-lg">
        <div class="card-body text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-error/20 to-warning/20 flex items-center justify-center">
            <svg class="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Painful Lessons</h3>
          <p class="opacity-80 text-sm">
            The crypto winter taught me resilience. Every failure became a lesson in building antifragile systems.
          </p>
        </div>
      </div>

      <div class="card bg-base-200/40 border border-base-300/20 shadow-lg">
        <div class="card-body text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-info/20 to-primary/20 flex items-center justify-center">
            <svg class="w-8 h-8 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Ecosystem Building</h3>
          <p class="opacity-80 text-sm">
            From 140 LinkedIn followers to a network of builders, each connection expanded my vision for autonomous systems.
          </p>
        </div>
      </div>

      <div class="card bg-base-200/40 border border-base-300/20 shadow-lg">
        <div class="card-body text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-success/20 to-accent/20 flex items-center justify-center">
            <svg class="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">The AI Pivot</h3>
          <p class="opacity-80 text-sm">
            $100k in revenue and countless AI implementations later, I knew it was time to merge AI with DeFi.
          </p>
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
