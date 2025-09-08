<template>
  <NuxtLayout name="reports">

    <!-- KPI / Stats with Sparklines (no hero/header) -->
    <section class="relative z-10 container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          v-for="k in kpis"
          :key="k.id"
          class="card bg-base-100/80 backdrop-blur border border-base-300/60 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,.35)] transition-shadow"
        >
          <div class="card-body">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="card-title text-base">{{ k.title }}</h2>
                <p class="text-xs opacity-70" v-if="k.caption">{{ k.caption }}</p>
              </div>
              <a :href="k.source.url" target="_blank" rel="noopener" class="btn btn-ghost btn-xs">Source ↗</a>
            </div>

            <div class="mt-3 flex items-end gap-2">
              <span class="text-4xl font-extrabold tabular-nums">{{ k.displayValue }}</span>
              <span class="text-xl opacity-70">{{ k.unit }}</span>
            </div>

            <ClientOnly>
              <div class="mt-3 h-[42px]">
                <canvas :ref="el => sparkRefs.set(k.id, el as HTMLCanvasElement)" class="w-full h-full"></canvas>
              </div>
            </ClientOnly>

            <div class="mt-2 text-[11px] opacity-70" v-if="k.footnote">{{ k.footnote }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Charts Row (fixed heights, colorful) -->
    <section class="relative z-10 container mx-auto px-4 pb-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Bar: Pillar Impact Scores -->
        <div class="card bg-base-100/80 backdrop-blur border border-base-300/60 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <div class="card-body">
            <div class="flex flex-wrap items-center justify-between">
              <h3 class="card-title">Pillar Impact Scores (0–100)</h3>
              <div class="flex gap-2">
                <a v-for="m in impactBadges" :key="m.url" :href="m.url" target="_blank" class="badge badge-outline">{{ m.label }}</a>
              </div>
            </div>
            <ClientOnly>
              <div class="mt-4 h-[300px]">
                <canvas ref="barEl" class="w-full h-full"></canvas>
              </div>
            </ClientOnly>
            <p class="mt-3 text-xs opacity-70">Editorial synthesis from linked sources; validate definitions as needed.</p>
          </div>
        </div>

        <!-- Scatter: Impact vs. Maturity -->
        <div class="card bg-base-100/80 backdrop-blur border border-base-300/60 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <div class="card-body">
            <h3 class="card-title">Impact vs. Maturity — Launches & Themes</h3>
            <ClientOnly>
              <div class="mt-4 h-[300px]">
                <canvas ref="scatterEl" class="w-full h-full"></canvas>
              </div>
            </ClientOnly>
            <p class="mt-3 text-xs opacity-70">Higher = more potential impact; right = more production-ready today.</p>
          </div>
        </div>

        <!-- Donut: Thematic Weighting -->
        <div class="card bg-base-100/80 backdrop-blur border border-base-300/60 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <div class="card-body">
            <h3 class="card-title">Theme Weighting (Editorial)</h3>
            <ClientOnly>
              <div class="mt-4 h-[300px]">
                <canvas ref="donutEl" class="w-full h-full"></canvas>
              </div>
            </ClientOnly>
            <div class="mt-3 text-xs opacity-70">Subjective split to guide attention for this report.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Developments Table -->
    <section class="relative z-10 container mx-auto px-4 pb-10">
      <div class="card bg-base-100/80 backdrop-blur border border-base-300/60 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h3 class="card-title">What Moved — Adoption, Agents, Infra, Research, Macro</h3>
          </div>

          <div class="overflow-x-auto rounded-2xl">
            <table class="table table-zebra">
              <thead class="sticky top-0 bg-base-100/90 backdrop-blur">
                <tr>
                  <th class="w-[12ch]">Area</th>
                  <th>Headline</th>
                  <th class="w-[14ch]">Priority</th>
                  <th class="w-[22ch]">Action</th>
                  <th class="w-[18ch]">Sources</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in filteredRows" :key="row.id">
                  <td>
                    <div :class="['badge badge-outline', areaBadge(row.area)]">{{ row.area }}</div>
                  </td>
                  <td>
                    <div class="font-medium">{{ row.title }}</div>
                    <div class="text-xs opacity-70 mt-1">{{ row.insight }}</div>
                  </td>
                  <td>
                    <div class="flex items-center gap-2">
                      <progress :class="['progress w-24', areaProgress(row.area)]" :value="row.priority" max="10"></progress>
                      <span class="text-xs tabular-nums">{{ row.priority }}/10</span>
                    </div>
                  </td>
                  <td>
                    <ul class="text-sm list-disc list-inside space-y-1">
                      <li v-for="(a,i) in row.actions" :key="i">{{ a }}</li>
                    </ul>
                  </td>
                  <td>
                    <div class="flex flex-wrap gap-2">
                      <a v-for="s in row.sources" :key="s.url" :href="s.url" target="_blank" class="btn btn-xs btn-ghost">{{ s.label }} ↗</a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </section>

    <!-- Sources Catalog -->
    <section class="relative z-10 container mx-auto px-4 pb-20">
      <div class="card bg-base-100/80 backdrop-blur border border-base-300/60 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h3 class="card-title">All Sources</h3>
            <div class="text-sm opacity-70">Always verify definitions and methodology.</div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div
              v-for="s in sources"
              :key="s.url"
              class="rounded-2xl p-4 border border-base-300/60 hover:border-primary/60 transition bg-base-100/60 backdrop-blur"
            >
              <div class="flex items-start gap-3">
                <img :src="favicon(s.url)" class="w-5 h-5 rounded" :alt="s.domain + ' favicon'" />
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <a :href="s.url" target="_blank" class="font-medium hover:underline">{{ s.title }}</a>
                    <span class="badge badge-outline">{{ s.topic }}</span>
                  </div>
                  <div class="text-xs opacity-70 mt-1">{{ s.domain }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'reports',
  title: 'AI × DeFi — Key Developments (Aug 30, 2025)',
  description: 'Adoption, AI agents, Uniswap v4 hooks, The Graph, research, and macro/RWA—visualized for decision-makers. Fixed-height colorful charts with linked sources.',
})

import { onMounted, onBeforeUnmount, ref, computed } from 'vue'

// ===== Sources (from your content) =====
const sources = ref([
  { title: "JPMorgan's $500M Bet on Numerai", url: 'https://www.ainvest.com/news/jpmorgan-500m-bet-numerai-wall-street-driven-catalyst-ai-powered-crypto-growth-2508/?utm_source=chatgpt.com', domain: 'ainvest.com', topic: 'Adoption' }, // [1]
  { title: 'The Emergence of Integrating AI in Crypto', url: 'https://cryptoadventure.com/the-emergence-of-integrating-ai-in-crypto/?utm_source=chatgpt.com', domain: 'cryptoadventure.com', topic: 'Adoption' }, // [2]
  { title: 'The Rise of AI Agents in Crypto', url: 'https://tokenminds.co/blog/knowledge-base/ai-agents-for-crypto?utm_source=chatgpt.com', domain: 'tokenminds.co', topic: 'Agents' }, // [3]
  { title: 'AI Agents in Crypto: Complete Guide', url: 'https://webisoft.com/articles/ai-agents-in-crypto/?utm_source=chatgpt.com', domain: 'webisoft.com', topic: 'Agents' }, // [4]
  { title: 'Uniswap', url: 'https://en.wikipedia.org/wiki/Uniswap?utm_source=chatgpt.com', domain: 'wikipedia.org', topic: 'Infra' }, // [5]
  { title: 'The Graph', url: 'https://en.wikipedia.org/wiki/The_Graph?utm_source=chatgpt.com', domain: 'wikipedia.org', topic: 'Data' }, // [6]
  { title: 'AI-Driven Vulnerability Analysis (Smart Contracts)', url: 'https://arxiv.org/abs/2506.06735?utm_source=chatgpt.com', domain: 'arxiv.org', topic: 'Security' }, // [7]
  { title: 'AI Risk Mgmt for Distributed Arbitrage', url: 'https://arxiv.org/abs/2503.18265?utm_source=chatgpt.com', domain: 'arxiv.org', topic: 'Arbitrage' }, // [8]
  { title: 'Hybrid Stabilization Protocol (Cross-Chain + AI)', url: 'https://arxiv.org/abs/2506.05708?utm_source=chatgpt.com', domain: 'arxiv.org', topic: 'Cross-chain' }, // [9]
  { title: 'Top DeFi Trends 2025 (RWA, AI, Interop)', url: 'https://www.blockchainappfactory.com/blog/2025-biggest-defi-trends-real-world-assets-to-ai-protocols/?utm_source=chatgpt.com', domain: 'blockchainappfactory.com', topic: 'Macro' }, // [10]
  { title: 'Altcoins Drive 2025 AI × DeFi Innovation', url: 'https://www.ainvest.com/news/altcoins-drive-2025-crypto-innovation-ai-defi-real-world-assets-2507/?utm_source=chatgpt.com', domain: 'ainvest.com', topic: 'Altcoins' }, // [11]
])

// ===== KPI data (editorial, directional) =====
const kpis = ref([
  {
    id: 'adoption',
    title: 'AI × DeFi Adoption',
    displayValue: '88',
    numericValue: 88,
    unit: '/100',
    caption: 'Institutional conviction (Numerai)',
    footnote: 'Directional index; see AInvest.',
    source: { label: 'AInvest', url: sources.value[0].url },
    spark: [52, 58, 64, 70, 79, 88],
  },
  {
    id: 'agents',
    title: 'Agentic Workflows',
    displayValue: '84',
    numericValue: 84,
    unit: '/100',
    caption: 'Trading • LP • DAO • AML',
    footnote: 'TokenMinds/Webisoft coverage.',
    source: { label: 'TokenMinds', url: sources.value[2].url },
    spark: [40, 49, 59, 68, 77, 84],
  },
  {
    id: 'infra',
    title: 'Protocol Innovation',
    displayValue: '79',
    numericValue: 79,
    unit: '/100',
    caption: 'Uniswap v4 hooks • The Graph',
    footnote: 'Hooks & indexing stack.',
    source: { label: 'Wikipedia', url: sources.value[4].url },
    spark: [33, 45, 58, 66, 73, 79],
  },
  {
    id: 'research',
    title: 'AI-first Security',
    displayValue: '74',
    numericValue: 74,
    unit: '/100',
    caption: 'GNNs • Transformers',
    footnote: 'arXiv snapshots.',
    source: { label: 'arXiv', url: sources.value[6].url },
    spark: [28, 38, 44, 57, 66, 74],
  },
  {
    id: 'macro',
    title: 'Macro & RWA',
    displayValue: '70',
    numericValue: 70,
    unit: '/100',
    caption: 'RWA tokenization & interop',
    footnote: 'BAppFactory view.',
    source: { label: 'BlockAppFactory', url: sources.value[9].url },
    spark: [24, 30, 41, 52, 62, 70],
  },
])

// ===== Table rows =====
const rows = ref([
  {
    id: 'adopt-1',
    area: 'Adoption',
    title: 'Wall Street steps in (JPMorgan → Numerai)',
    insight: 'Institutional belief in AI-driven DeFi accelerates adoption.',
    priority: 8,
    actions: ['Prepare enterprise-grade data rooms', 'Map compliance for AI-exec strategies'],
    sources: [
      { label: 'AInvest', url: sources.value[0].url },
      { label: 'CryptoAdventure', url: sources.value[1].url },
    ],
  },
  {
    id: 'agents-1',
    area: 'Agents',
    title: 'Autonomous agents manage trading, LP, DAO, fraud',
    insight: 'Full-stack architecture: data → logic → execution → feedback.',
    priority: 9,
    actions: ['Ship guardrails (kill-switch, velocity limits)', 'Add anomaly detection & audit logs'],
    sources: [
      { label: 'TokenMinds', url: sources.value[2].url },
      { label: 'Webisoft', url: sources.value[3].url },
    ],
  },
  {
    id: 'infra-1',
    area: 'Infra',
    title: 'Uniswap v4 hooks enable adaptive on-chain behavior',
    insight: 'AI can drive dynamic fees & smart liquidity logic at AMM layer.',
    priority: 8,
    actions: ['Prototype hook strategies', 'Evaluate gas/slippage trade-offs per chain'],
    sources: [
      { label: 'Uniswap (Wiki)', url: sources.value[4].url },
    ],
  },
  {
    id: 'data-1',
    area: 'Data',
    title: 'The Graph as decentralized data layer',
    insight: 'Real-time indexing across chains powers AI agents.',
    priority: 7,
    actions: ['Adopt Subgraphs/Substreams', 'Design multi-source fallback plans'],
    sources: [
      { label: 'The Graph (Wiki)', url: sources.value[5].url },
    ],
  },
  {
    id: 'research-1',
    area: 'Research',
    title: 'AI-first security for smart contracts',
    insight: 'GNNs/Transformers outperform traditional static analysis on classes of bugs.',
    priority: 8,
    actions: ['Blend fuzzing + ML triage', 'Build vuln classifiers for CI'],
    sources: [
      { label: 'arXiv 2506.06735', url: sources.value[6].url },
    ],
  },
  {
    id: 'arbitrage-1',
    area: 'Arbitrage',
    title: 'AI-enhanced arb with risk-managed design',
    insight: 'Caching & resilience improve low-latency DeFi strategies.',
    priority: 7,
    actions: ['Productize arb orchestration', 'Define failover SLOs & monitoring'],
    sources: [
      { label: 'arXiv 2503.18265', url: sources.value[7].url },
      { label: 'arXiv 2506.05708', url: sources.value[8].url },
    ],
  },
  {
    id: 'macro-1',
    area: 'Macro',
    title: 'RWA tokenization & interop drive maturation',
    insight: 'Non-crypto beta flows enter DeFi; altcoins as innovation labs.',
    priority: 6,
    actions: ['Model RWA valuation/oracle redundancy', 'Assess partnerships with AI-DeFi alt protocols'],
    sources: [
      { label: 'BAppFactory', url: sources.value[9].url },
      { label: 'AInvest (Altcoins)', url: sources.value[10].url },
    ],
  },
])

const query = ref('')
const filteredRows = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return rows.value
  return rows.value.filter(r => (
    r.area.toLowerCase().includes(q) ||
    r.title.toLowerCase().includes(q) ||
    r.insight.toLowerCase().includes(q) ||
    r.sources.some(s => s.label.toLowerCase().includes(q))
  ))
})

// ===== Color helpers (DaisyUI → hex) =====
function cssVars() {
  const s = getComputedStyle(document.documentElement)
  function hslToHex(h: string, sV: string, l: string) {
    const hue = parseFloat(h)
    const sat = parseFloat(sV) / 100
    const lig = parseFloat(l) / 100
    const c = (1 - Math.abs(2 * lig - 1)) * sat
    const x = c * (1 - Math.abs((hue / 60) % 2 - 1))
    const m = lig - c / 2
    let r = 0, g = 0, b = 0
    if (0 <= hue && hue < 60) { r = c; g = x; b = 0 }
    else if (60 <= hue && hue < 120) { r = x; g = c; b = 0 }
    else if (120 <= hue && hue < 180) { r = 0; g = c; b = x }
    else if (180 <= hue && hue < 240) { r = 0; g = x; b = c }
    else if (240 <= hue && hue < 300) { r = x; g = 0; b = c }
    else { r = c; g = 0; b = x }
    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }
  const parse = (key: string) => {
    const raw = s.getPropertyValue(key).trim() // '259 94% 51%'
    if (!raw) return '#7c3aed'
    const [h, sv, lv] = raw.split(' ')
    return hslToHex(h, sv.replace('%',''), lv.replace('%',''))
  }
  return {
    primary: parse('--p'),
    secondary: parse('--s'),
    accent: parse('--a'),
    info: parse('--in'),
    success: parse('--su'),
    warning: parse('--wa'),
    error: parse('--er'),
  }
}

function areaBadge(area: string) {
  switch (area) {
    case 'Infra': return 'badge-secondary'
    case 'Data': return 'badge-info'
    case 'Agents': return 'badge-success'
    case 'Adoption': return 'badge-primary'
    case 'Research': return 'badge-info'
    case 'Arbitrage': return 'badge-warning'
    case 'Macro': return 'badge-accent'
    default: return 'badge-ghost'
  }
}
function areaProgress(area: string) {
  switch (area) {
    case 'Infra': return 'progress-secondary'
    case 'Data': return 'progress-info'
    case 'Agents': return 'progress-success'
    case 'Adoption': return 'progress-primary'
    case 'Research': return 'progress-info'
    case 'Arbitrage': return 'progress-warning'
    case 'Macro': return 'progress-accent'
    default: return 'progress-primary'
  }
}

// ===== Charts =====
const barEl = ref<HTMLCanvasElement | null>(null)
const scatterEl = ref<HTMLCanvasElement | null>(null)
const donutEl = ref<HTMLCanvasElement | null>(null)
const sparkRefs = new Map<string, HTMLCanvasElement>()
let barChart: any = null
let scatterChart: any = null
let donutChart: any = null
const sparkCharts: Record<string, any> = {}

const impactBadges = [
  { label: 'AInvest', url: sources.value[0].url },
  { label: 'TokenMinds', url: sources.value[2].url },
  { label: 'Wikipedia', url: sources.value[4].url },
  { label: 'arXiv', url: sources.value[6].url },
  { label: 'BAppFactory', url: sources.value[9].url },
]

onMounted(async () => {
  try {
    const ChartModule: any = await import('chart.js/auto')
    const Chart = ChartModule.default || ChartModule
    const c = cssVars()

    // Gradient helper
    function makeGrad(ctx: CanvasRenderingContext2D, from: string, to: string) {
      const g = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
      g.addColorStop(0, from)
      g.addColorStop(1, to)
      return g
    }

    // Bar chart: Pillar Impact
    if (barEl.value) {
      const ctx = barEl.value.getContext('2d')!
      barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Adoption', 'Agents', 'Infra', 'Research', 'Macro'],
          datasets: [
            {
              label: 'Impact',
              data: [88, 84, 79, 74, 70],
              backgroundColor: [
                makeGrad(ctx, c.primary, c.accent),
                makeGrad(ctx, c.success, c.primary),
                makeGrad(ctx, c.secondary, c.info),
                makeGrad(ctx, c.info, c.secondary),
                makeGrad(ctx, c.accent, c.primary),
              ],
              borderRadius: 12,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: '#a6adbb' }, grid: { display: false } },
            y: {
              beginAtZero: true, max: 100,
              ticks: { color: '#a6adbb', callback: (v: any) => `${v}` },
              grid: { color: 'rgba(166,173,187,0.18)' }
            },
          },
        },
      })
    }

    // Scatter: Impact vs Maturity
    if (scatterEl.value) {
      const ctx = scatterEl.value.getContext('2d')!
      const points = [
        { x: 8.5, y: 8.8, label: 'Adoption momentum', color: c.primary, src: sources.value[0].url },
        { x: 7.8, y: 8.4, label: 'Agent workflows', color: c.success, src: sources.value[2].url },
        { x: 7.2, y: 7.9, label: 'Uniswap v4 hooks', color: c.secondary, src: sources.value[4].url },
        { x: 6.5, y: 7.4, label: 'AI security research', color: c.info, src: sources.value[6].url },
        { x: 6.8, y: 7.0, label: 'RWA & macro tailwinds', color: c.accent, src: sources.value[9].url },
      ]
      scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: points.map(p => ({
            label: p.label,
            data: [{ x: p.x, y: p.y }],
            pointRadius: 6,
            pointHoverRadius: 9,
            pointBackgroundColor: p.color,
            pointBorderColor: '#00000055',
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { min: 0, max: 10, title: { display: true, text: 'Maturity' }, ticks: { color: '#a6adbb' }, grid: { color: 'rgba(166,173,187,0.15)' } },
            y: { min: 0, max: 10, title: { display: true, text: 'Impact' }, ticks: { color: '#a6adbb' }, grid: { color: 'rgba(166,173,187,0.15)' } },
          },
        },
      })
    }

    // Donut: Theme Weighting
    if (donutEl.value) {
      const ctx = donutEl.value.getContext('2d')!
      donutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Adoption', 'Agents', 'Infra', 'Research', 'Macro'],
          datasets: [{
            data: [26, 24, 18, 16, 16],
            backgroundColor: [c.primary, c.success, c.secondary, c.info, c.accent],
            borderWidth: 0,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: { legend: { position: 'bottom', labels: { color: '#a6adbb' } } },
        },
      })
    }

    // KPI Sparklines (colored)
    const Spark = (ctx: CanvasRenderingContext2D, color: string, data: number[]) => new Chart(ctx, {
      type: 'line',
      data: { labels: data.map((_, i) => i + 1), datasets: [{ data, borderColor: color, backgroundColor: color + '33', fill: true, tension: .4, pointRadius: 0 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } }},
    })

    kpis.value.forEach(k => {
      const el = sparkRefs.get(k.id)
      if (!el) return
      const ctx = el.getContext('2d')!
      const color =
        k.id === 'adoption' ? cssVars().primary :
        k.id === 'agents' ? cssVars().success :
        k.id === 'infra' ? cssVars().secondary :
        k.id === 'research' ? cssVars().info :
        cssVars().accent
      sparkCharts[k.id] = Spark(ctx, color, k.spark)
    })
  } catch (error) {
    console.error('Chart init error:', error)
  }
})

onBeforeUnmount(() => {
  barChart?.destroy?.()
  scatterChart?.destroy?.()
  donutChart?.destroy?.()
  Object.values(sparkCharts).forEach(ch => ch?.destroy?.())
})

// ===== Utilities =====
function favicon(url: string) {
  try { const { origin } = new URL(url); return `${origin}/favicon.ico` } catch { return '/favicon.ico' }
}
</script>

<style scoped>
/* Table head polish */
.table :where(thead, tfoot) th { @apply bg-base-200; }
</style>
