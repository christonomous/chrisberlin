<template>
  <section id="projects" class="container mx-auto max-w-6xl px-4 py-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
        Projects & Proofs
      </h2>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <!-- Zillions -->
      <div class="card bg-base-200/60 border border-base-300/20 shadow flex flex-col hover:shadow-xl">
        <div class="card-body flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span class="text-2xl font-bold text-base-100">Z</span>
            </div>
            <h3 class="card-title text-xl">Zillions</h3>
            <div class="badge badge-primary ml-auto">In Progress</div>
          </div>
          <p class="opacity-80 flex-grow">
            AI + DeFi trading engine. Using regime detection, market structure, and custom indicators, this system will manage capital with adjustable risk and open strategy modules.
          </p>
          <div class="card-actions justify-end mt-auto">
            <a href="https://github.com/zillionsapp/" target="_blank" class="btn btn-sm btn-outline">
              View Code
            </a>
            <a href="https://zillions.app" target="_blank" class="btn btn-sm btn-primary">
              Live Demo
            </a>
          </div>
        </div>
      </div>

      <!-- Cunoro Finance -->
      <div class="card bg-base-200/60 border border-base-300/20 shadow flex flex-col hover:shadow-xl">
        <div class="card-body flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center">
              <span class="text-2xl font-bold text-base-100">C</span>
            </div>
            <h3 class="card-title text-xl">Cunoro Finance / Bend Token</h3>
          </div>
          <p class="opacity-80 flex-grow">
            A past DeFi launch with real tokenomics, liquidity, and community engagement. Though small in market cap, it taught me product cycles, token incentives, and market dynamics.
          </p>
          <div class="card-actions justify-end mt-auto">
            <div class="text-xs opacity-60">
              Past Project • $45k Market Cap
            </div>
          </div>
        </div>
      </div>

      <!-- Autonomous Enterprises -->
      <div class="card bg-base-200/60 border border-base-300/20 shadow flex flex-col hover:shadow-xl">
        <div class="card-body flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center">
              <span class="text-2xl font-bold text-base-100">AE</span>
            </div>
            <h3 class="card-title text-xl">Autonomous Enterprises</h3>
            <div class="badge badge-secondary ml-auto">Q4 2025</div>
          </div>
          <p class="opacity-80 flex-grow">
            A vision and upcoming platform for autonomous capital managers / agents — enabling others to deploy their own AI-based capital strategies on-chain.
          </p>
          <div class="card-actions justify-end mt-auto">
            <a href="https://github.com/autonomousEnterprises/" target="_blank" class="btn btn-sm btn-outline">
              GitHub
            </a>
            <div class="tooltip" data-tip="Coming Q4 2025">
              <button class="btn btn-sm btn-disabled">
                Live Site
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Market Reports -->
      <div class="card bg-base-200/60 border border-base-300/20 shadow flex flex-col hover:shadow-xl">
        <div class="card-body flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg flex items-center justify-center">
              <span class="text-2xl font-bold text-base-100">📊</span>
            </div>
            <h3 class="card-title text-xl">Market Reports / Research</h3>
          </div>
          <p class="opacity-80 flex-grow">
            Published market insights, trend forecasts, strategy breakdowns, and commentary for the crypto community.
          </p>
          <div class="card-actions justify-end mt-auto">
            <a href="/reports" class="btn btn-sm btn-outline">
              View Reports
            </a>
            <a href="#performance" class="btn btn-sm btn-secondary">
              See Insights
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
