<template>
  <div class="py-20 bg-gradient-to-br from-base-300 via-base-200 to-base-300">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Monthly Business Launches</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <!-- Business Card 1 -->
        <div class="card bg-base-100 shadow-xl hover:shadow-primary/20 transition-all duration-300">
          <figure class="px-6 pt-6">
            <div class="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <span class="text-4xl">🤖</span>
            </div>
          </figure>
          <div class="card-body">
            <h3 class="card-title">AutoContent Pro</h3>
            <p class="text-base-content/70">AI-powered content generation and scheduling platform for social media automation.</p>
            <div class="card-actions justify-end mt-4">
              <div class="badge badge-primary">AI</div>
              <div class="badge badge-secondary">SaaS</div>
            </div>
          </div>
        </div>

        <!-- Business Card 2 -->
        <div class="card bg-base-100 shadow-xl hover:shadow-secondary/20 transition-all duration-300">
          <figure class="px-6 pt-6">
            <div class="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
              <span class="text-4xl">📊</span>
            </div>
          </figure>
          <div class="card-body">
            <h3 class="card-title">MetricsMaster</h3>
            <p class="text-base-content/70">Automated analytics and reporting tool for data-driven business decisions.</p>
            <div class="card-actions justify-end mt-4">
              <div class="badge badge-secondary">Analytics</div>
              <div class="badge badge-accent">Dashboard</div>
            </div>
          </div>
        </div>

        <!-- Business Card 3 -->
        <div class="card bg-base-100 shadow-xl hover:shadow-accent/20 transition-all duration-300">
          <figure class="px-6 pt-6">
            <div class="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
              <span class="text-4xl">🔄</span>
            </div>
          </figure>
          <div class="card-body">
            <h3 class="card-title">WorkflowWizard</h3>
            <p class="text-base-content/70">No-code automation platform for streamlining business processes.</p>
            <div class="card-actions justify-end mt-4">
              <div class="badge badge-accent">Automation</div>
              <div class="badge badge-primary">No-Code</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Latest Launch Preview -->
      <div class="mt-16 card bg-base-100 shadow-xl max-w-4xl mx-auto">
        <div class="card-body">
          <div class="flex items-center gap-4 mb-4">
            <div class="badge badge-lg badge-primary">Latest Launch</div>
            <h3 class="card-title text-2xl">AIdeaFlow</h3>
          </div>
          <p class="text-base-content/70">
            An AI-powered brainstorming and idea validation platform that helps entrepreneurs 
            identify profitable business opportunities through market analysis and trend prediction.
          </p>
          <div class="card-actions justify-between items-center mt-6">
            <div class="flex gap-2">
              <div class="badge badge-outline">AI</div>
              <div class="badge badge-outline">Market Research</div>
              <div class="badge badge-outline">Validation</div>
            </div>
            <button class="btn btn-gradient">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
