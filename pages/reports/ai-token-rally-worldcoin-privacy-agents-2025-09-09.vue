<template>
  <NuxtLayout name="reports">
    <!-- KPI / Stats -->
    <section class="relative z-10 container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          v-for="k in kpis"
          :key="k.id"
          class="card bg-base-100/80 backdrop-blur border border-base-300/60 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,.35)] transition-shadow"
        >
          <div class="card-body">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="card-title text-base">{{ k.title }}</h2>
                <p class="text-xs opacity-70" v-if="k.caption">{{ k.caption }}</p>
              </div>
              <div class="badge badge-secondary badge-outline">{{ k.tag }}</div>
            </div>

            <div class="mt-3">
              <div class="text-3xl font-bold">{{ k.value }}</div>
              <div
                class="mt-1 text-xs"
                :class="k.delta >= 0 ? 'text-primary' : 'text-error'"
                v-if="k.delta !== undefined && k.delta !== null"
              >
                <span v-if="k.delta >= 0">▲</span><span v-else>▼</span>
                {{ Math.abs(k.delta).toFixed(2) }}%
              </div>
            </div>

            <div class="mt-4 flex flex-wrap gap-2">
              <a
                v-for="s in k.sources"
                :key="s.href"
                :href="s.href"
                target="_blank"
                rel="noopener"
                class="btn btn-ghost btn-xs no-underline"
              >
                🔗 {{ s.label }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Chart: 24h Performance Snapshot (Chart.js) -->
    <section class="container mx-auto px-4 pb-8">
      <div class="card bg-base-100/80 border border-base-300/60">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h3 class="card-title">AI Tokens  -  24h Performance Snapshot</h3>
            <div class="flex gap-2">
              <a
                v-for="s in sources.performance"
                :key="s.href"
                class="btn btn-ghost btn-xs"
                :href="s.href"
                target="_blank"
                rel="noopener"
              >🔗 {{ s.label }}</a>
            </div>
          </div>

          <p class="text-sm opacity-80">
            The AI sector led gains with a broad move higher, while Worldcoin (WLD) spiked on fresh catalyst-driven flows.
          </p>

          <!-- Fixed-height wrapper; Chart.js uses maintainAspectRatio: false to fill -->
          <div class="mt-4 h-[320px]">
            <ClientOnly>
              <canvas ref="perfCanvas" class="w-full h-full"></canvas>
            </ClientOnly>
          </div>

          <p class="mt-4 text-sm">
            <span class="font-semibold">TL;DR:</span> AI category outperformed (+14.38%) with outlier momentum in WLD (~+50%), signaling
            speculative rotation into AI-adjacent narratives.
          </p>
        </div>
      </div>
    </section>

    <!-- Chart: Identity Momentum (Worldcoin) -->
    <section class="container mx-auto px-4 pb-8">
      <div class="card bg-base-100/80 border border-base-300/60">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h3 class="card-title">Identity Momentum  -  Verified vs. Target (Worldcoin)</h3>
            <div class="flex gap-2">
              <a
                v-for="s in sources.worldcoin"
                :key="s.href"
                class="btn btn-ghost btn-xs"
                :href="s.href"
                target="_blank"
                rel="noopener"
              >🔗 {{ s.label }}</a>
            </div>
          </div>

          <p class="text-sm opacity-80">
            Worldcoin’s recent surge coincided with a large purchase disclosure and growing biometric identity adoption.
          </p>

          <!-- Fixed-height wrapper -->
          <div class="mt-4 h-[320px]">
            <ClientOnly>
              <canvas ref="idCanvas" class="w-full h-full"></canvas>
            </ClientOnly>
          </div>

          <p class="mt-4 text-sm">
            <span class="font-semibold">TL;DR:</span> If execution stays on track, identity supply growth could continue to underpin WLD’s
            narrative; verification scale and privacy assurances remain crucial.
          </p>
        </div>
      </div>
    </section>

    <!-- Table: Snapshot of Themes -->
    <section class="container mx-auto px-4 pb-8">
      <div class="card bg-base-100/80 border border-base-300/60">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h3 class="card-title">Summary Snapshot</h3>
            <div class="flex gap-2">
              <a v-for="s in allSources" :key="s.href" class="btn btn-ghost btn-xs" :href="s.href" target="_blank" rel="noopener">
                🔗 {{ s.label }}
              </a>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>Trend</th>
                  <th>Key Figure / Insight</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>AI Token Surge</td>
                  <td>+14.38%, Worldcoin ~+50%</td>
                </tr>
                <tr>
                  <td>AI-DeFi Creator Ecosystem</td>
                  <td>Blazpay × StarAI partnership</td>
                </tr>
                <tr>
                  <td>Trading Transparency</td>
                  <td>On-chain AI demos (MAPB) w/ performance metrics</td>
                </tr>
                <tr>
                  <td>Privacy in AI-DeFi</td>
                  <td>iExec TEE on Arbitrum for confidential compute</td>
                </tr>
                <tr>
                  <td>AI Betting Tools</td>
                  <td>Interest rising; trust & performance lag</td>
                </tr>
                <tr>
                  <td>Identity Tokenization</td>
                  <td>$270M buy; 16M verified; 100M target</td>
                </tr>
                <tr>
                  <td>Agent-Managed TVL</td>
                  <td>$100B projection by 2028 (Theoriq)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="mt-4 text-sm">
            <span class="font-semibold">TL;DR:</span> Autonomy, privacy, and transparency are compounding across AI × DeFi. Disciplined,
            verifiable metrics should filter hype from durable adoption.
          </p>
        </div>
      </div>
    </section>

    <!-- Thematic Cards (short reads) -->
    <section class="container mx-auto px-4 pb-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Transparency -->
        <div class="card bg-base-100/80 border border-base-300/60">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <h3 class="card-title">On-Chain AI Transparency</h3>
              <a
                class="btn btn-ghost btn-xs"
                href="https://www.openpr.com/news/4174314/marlinn-group-elevates-transparency-in-ai-powered-defi-trading?utm_source=chatgpt.com"
                target="_blank" rel="noopener"
              >🔗 openPR</a>
            </div>
            <p class="text-sm opacity-80">
              MAPB’s public demos and metrics help separate real signal from backtested claims. Expect more audit-friendly AI execution layers.
            </p>
          </div>
        </div>

        <!-- Privacy -->
        <div class="card bg-base-100/80 border border-base-300/60">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <h3 class="card-title">Confidential Compute for AI & DeFi</h3>
              <a
                class="btn btn-ghost btn-xs"
                href="https://blockchainreporter.net/iexec-brings-confidential-computing-to-arbitrum-privacy-for-defi-ai-and-gaming/?utm_source=chatgpt.com"
                target="_blank" rel="noopener"
              >🔗 BlockchainReporter</a>
            </div>
            <p class="text-sm opacity-80">
              iExec brings TEE-based privacy to Arbitrum - useful for sensitive model inference, private orderflow, and data-protected strategies.
            </p>
          </div>
        </div>

        <!-- Agents -->
        <div class="card bg-base-100/80 border border-base-300/60">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <h3 class="card-title">Autonomous Agents for Capital</h3>
              <a
                class="btn btn-ghost btn-xs"
                href="https://www.ainvest.com/news/ai-driven-defi-innovation-token-economics-assessing-mignal-mgl-high-growth-entry-point-2509/?utm_source=chatgpt.com"
                target="_blank" rel="noopener"
              >🔗 AInvest</a>
            </div>
            <p class="text-sm opacity-80">
              Theoriq’s AlphaVaults target automated deployments at scale; governance, guardrails, and KPIs will define real-world stickiness.
            </p>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

/**
 * Fixed chart height for all charts (prevents infinite growth)
 */
const CHART_HEIGHT = 320

/**
 * Colors aligned to your theme (colorful)
 */
const chartColors = ['#00ff9d', '#7c3aed', '#ff006e', '#06b6d4', '#f59e0b', '#10b981']

/**
 * KPI cards
 */
const kpis = ref([
  {
    id: 'ai-sector',
    title: 'AI Sector (24h)',
    caption: 'Category move',
    value: '+14.38%',
    delta: 14.38,
    tag: 'Market',
    sources: [
      { label: 'CryptoRank', href: 'https://cryptorank.io/news/feed/2dbd4-live-crypto-news-today-latest-updates-for-sept-9-2025?utm_source=chatgpt.com' }
    ]
  },
  {
    id: 'wld',
    title: 'Worldcoin (24h)',
    caption: 'Token move',
    value: '~+50%',
    delta: 50,
    tag: 'Momentum',
    sources: [
      { label: 'NY Post', href: 'https://nypost.com/2025/09/08/business/why-sam-altmans-worldcoin-is-suddenly-skyrocketing/?utm_source=chatgpt.com' }
    ]
  },
  {
    id: 'wld-purchase',
    title: 'WLD Purchase',
    caption: 'Disclosed buy',
    value: '$270M',
    tag: 'Flows',
    sources: [
      { label: 'NY Post', href: 'https://nypost.com/2025/09/08/business/why-sam-altmans-worldcoin-is-suddenly-skyrocketing/?utm_source=chatgpt.com' }
    ]
  },
  {
    id: 'ids-verified',
    title: 'Identities Verified',
    caption: 'Worldcoin',
    value: '16M',
    tag: 'Identity',
    sources: [
      { label: 'NY Post', href: 'https://nypost.com/2025/09/08/business/why-sam-altmans-worldcoin-is-suddenly-skyrocketing/?utm_source=chatgpt.com' }
    ]
  },
  {
    id: 'agents-tvl',
    title: 'Agent-run TVL (’28)',
    caption: 'Projection',
    value: '$100B',
    tag: 'Forecast',
    sources: [
      { label: 'AInvest', href: 'https://www.ainvest.com/news/ai-driven-defi-innovation-token-economics-assessing-mignal-mgl-high-growth-entry-point-2509/?utm_source=chatgpt.com' }
    ]
  }
])

/**
 * Sources for quick links
 */
const sources = {
  performance: [
    { label: 'CryptoRank', href: 'https://cryptorank.io/news/feed/2dbd4-live-crypto-news-today-latest-updates-for-sept-9-2025?utm_source=chatgpt.com' },
    { label: 'NY Post', href: 'https://nypost.com/2025/09/08/business/why-sam-altmans-worldcoin-is-suddenly-skyrocketing/?utm_source=chatgpt.com' }
  ],
  worldcoin: [
    { label: 'NY Post', href: 'https://nypost.com/2025/09/08/business/why-sam-altmans-worldcoin-is-suddenly-skyrocketing/?utm_source=chatgpt.com' }
  ]
}

const allSources = computed(() => ([
  { label: 'CryptoRank', href: 'https://cryptorank.io/news/feed/2dbd4-live-crypto-news-today-latest-updates-for-sept-9-2025?utm_source=chatgpt.com' },
  { label: 'New York Post', href: 'https://nypost.com/2025/09/08/business/why-sam-altmans-worldcoin-is-suddenly-skyrocketing/?utm_source=chatgpt.com' },
  { label: 'BlockchainReporter (Blazpay×StarAI)', href: 'https://blockchainreporter.net/blazpay-and-starai-forge-alliance-to-build-creator-centric-ai-defi-ecosystem/?utm_source=chatgpt.com' },
  { label: 'openPR (MAPB)', href: 'https://www.openpr.com/news/4174314/marlinn-group-elevates-transparency-in-ai-powered-defi-trading?utm_source=chatgpt.com' },
  { label: 'BlockchainReporter (iExec TEE)', href: 'https://blockchainreporter.net/iexec-brings-confidential-computing-to-arbitrum-privacy-for-defi-ai-and-gaming/?utm_source=chatgpt.com' },
  { label: 'WIRED (AI Betting)', href: 'https://www.wired.com/story/sports-betting-crypto-artificial-intelligence-agents?utm_source=chatgpt.com' },
  { label: 'AInvest (Theoriq)', href: 'https://www.ainvest.com/news/ai-driven-defi-innovation-token-economics-assessing-mignal-mgl-high-growth-entry-point-2509/?utm_source=chatgpt.com' }
]))

/**
 * Chart.js setup (client-only)
 */
const perfCanvas = ref<HTMLCanvasElement | null>(null)
const idCanvas = ref<HTMLCanvasElement | null>(null)
let Chart: any | null = null
let perfChart: any | null = null
let idChart: any | null = null

onMounted(async () => {
  // Dynamically import Chart.js to avoid SSR issues
  const mod = await import('chart.js/auto')
  Chart = mod.default

  // Performance chart (vertical bar)
  if (perfCanvas.value) {
    const ctx = perfCanvas.value.getContext('2d')
    perfChart = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: ['AI Sector', 'Worldcoin (WLD)'],
        datasets: [
          {
            label: '24h % Change',
            data: [14.38, 50.0],
            backgroundColor: [chartColors[0], chartColors[2]],
            borderColor: [chartColors[0], chartColors[2]],
            borderWidth: 1,
            borderRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // fill fixed-height parent
        animation: { duration: 600 },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx:any) => `${ctx.dataset.label}: ${ctx.parsed.y ?? ctx.parsed.x}%`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { callback: (v:number) => `${v}%` },
            grid: { color: 'rgba(255,255,255,0.08)' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    })
  }

  // Identity Momentum chart (horizontal bar)
  if (idCanvas.value) {
    const ctx = idCanvas.value.getContext('2d')
    idChart = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: ['Verified (Current)', 'Target (Next Year)'],
        datasets: [
          {
            label: 'Count (M)',
            data: [16, 100],
            backgroundColor: [chartColors[1], chartColors[4]],
            borderColor: [chartColors[1], chartColors[4]],
            borderWidth: 1,
            borderRadius: 8
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 600 },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx:any) => `${ctx.dataset.label}: ${ctx.parsed.x ?? ctx.parsed.y}M`
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: { callback: (v:number) => `${v}M` },
            grid: { color: 'rgba(255,255,255,0.08)' }
          },
          y: { grid: { display: false } }
        }
      }
    })
  }
})

onBeforeUnmount(() => {
  if (perfChart) { perfChart.destroy(); perfChart = null }
  if (idChart) { idChart.destroy(); idChart = null }
})
</script>
