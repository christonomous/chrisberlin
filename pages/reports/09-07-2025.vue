<template>
  <div class="min-h-screen bg-base-200 text-base-content">
    <!-- Header -->
    <div class="bg-gradient-to-b from-base-300/60 to-base-200 border-b border-base-300">
      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold tracking-tight">AI × DeFi — Daily Market Insights</h1>
            <p class="opacity-70 mt-1">Sun, Sep 7, 2025 • 09:00 CEST</p>
          </div>
          <div class="flex gap-2">
            <button class="btn btn-primary btn-sm" @click="downloadJSON">Download JSON</button>
            <a :href="primarySource?.url" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Primary Source</a>
          </div>
        </div>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="k in kpis" :key="k.id" class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="card-title text-lg">{{ k.title }}</h2>
                <p class="text-sm opacity-70 mt-1" v-if="k.caption">{{ k.caption }}</p>
              </div>
              <a :href="k.source.url" target="_blank" rel="noopener" class="btn btn-ghost btn-xs">Source ↗</a>
            </div>
            <div class="mt-4 flex items-end gap-2">
              <span class="text-4xl font-extrabold tabular-nums">{{ k.displayValue }}</span>
              <span class="text-xl opacity-70">{{ k.unit }}</span>
            </div>
            <div class="mt-2 text-xs opacity-70" v-if="k.footnote">{{ k.footnote }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="container mx-auto px-4 pb-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Bar Chart: Capital & Risk Snapshot -->
        <div class="card bg-base-100 shadow-xl lg:col-span-2">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <h3 class="card-title">Capital & Risk Snapshot (USD, Billions)</h3>
              <div class="flex gap-2">
                <a v-for="m in kpis" :key="m.id" :href="m.source.url" target="_blank" class="badge badge-outline">{{ m.source.label }}</a>
              </div>
            </div>
            <ClientOnly>
              <div class="mt-4">
                <canvas ref="barEl" class="w-full h-[280px]"></canvas>
              </div>
            </ClientOnly>
            <p class="mt-3 text-xs opacity-70">Bars visualize point-in-time magnitudes derived from today\'s narrative: security losses (H1\'25), ETH spot ETF net inflows (cum., Aug 20), and RWA outstanding (midpoint of reported range). Illustrative-only; see sources for definitions and methodology.</p>
          </div>
        </div>

        <!-- Scatter: Impact vs. Maturity -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">Impact vs. Maturity — Today\'s Launches & Themes</h3>
            <ClientOnly>
              <div class="mt-4">
                <canvas ref="scatterEl" class="w-full h-[280px]"></canvas>
              </div>
            </ClientOnly>
            <div class="mt-3 flex flex-wrap gap-2">
              <a v-for="t in tags" :key="t" class="badge badge-primary badge-outline">{{ t }}</a>
            </div>
            <p class="mt-3 text-xs opacity-70">Subjective editorial placement to guide prioritization. Higher = more potential impact; farther right = more production-ready.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Key Developments Table -->
    <div class="container mx-auto px-4 pb-10">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h3 class="card-title">What Moved — Infrastructure, Agents, Capital & Risk</h3>
            <div class="form-control">
              <label class="input input-bordered input-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 opacity-60"><path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 104.27 12.037l3.221 3.222a.75.75 0 101.06-1.06l-3.222-3.222A6.75 6.75 0 0010.5 3.75zm0 1.5a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z" clip-rule="evenodd" /></svg>
                <input type="text" class="grow" placeholder="Filter…" v-model="query" />
              </label>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th class="w-[12ch]">Area</th>
                  <th>Headline</th>
                  <th class="w-[14ch]">Priority</th>
                  <th class="w-[18ch]">Action</th>
                  <th class="w-[18ch]">Sources</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in filteredRows" :key="row.id">
                  <td>
                    <div class="badge badge-secondary badge-outline">{{ row.area }}</div>
                  </td>
                  <td>
                    <div class="font-medium">{{ row.title }}</div>
                    <div class="text-xs opacity-70 mt-1">{{ row.insight }}</div>
                  </td>
                  <td>
                    <div class="flex items-center gap-2">
                      <progress class="progress progress-primary w-24" :value="row.priority" max="10"></progress>
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
    </div>

    <!-- Sources Catalog -->
    <div class="container mx-auto px-4 pb-20">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h3 class="card-title">All Sources</h3>
            <div class="text-sm opacity-70">Always verify definitions and methodology.</div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div v-for="s in sources" :key="s.url" class="border border-base-300 rounded-2xl p-4 hover:border-primary/60 transition">
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
    </div>

    <!-- Footer -->
    <footer class="py-10 border-t border-base-300">
      <div class="container mx-auto px-4 text-sm opacity-70">
        <p>For decision support. Not financial advice. Built with Tailwind + DaisyUI, aligned with your dark theme.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'

// ===== Sources (link out) =====
const sources = ref([
  { title: '2025 Crypto Crime Mid-Year Update', url: 'https://www.chainalysis.com/blog/2025-crypto-crime-mid-year-update/?utm_source=chatgpt.com', domain: 'chainalysis.com', topic: 'Security' },
  { title: 'Ether Resurgence Gains Steam (Citi view)', url: 'https://www.coindesk.com/markets/2025/08/20/ether-resurgence-gains-steam-backed-by-spot-etf-demand-and-on-chain-growth-citi?utm_source=chatgpt.com', domain: 'coindesk.com', topic: 'Markets' },
  { title: 'Uniswap v4 launches on 12 chains', url: 'https://cointelegraph.com/news/uniswap-v4-launches-12-chains?utm_source=chatgpt.com', domain: 'cointelegraph.com', topic: 'DEX' },
  { title: 'Lit Protocol \u2014 Vincent Agents', url: 'https://www.cryptoninjas.net/news/1b-defi-potential-unlocked-lit-protocols-vincent-lets-ai-agents-trade/?utm_source=chatgpt.com', domain: 'cryptoninjas.net', topic: 'Agents' },
  { title: 'State of The Graph Q2 2025', url: 'https://messari.io/report/state-of-the-graph-q2-2025?utm_source=chatgpt.com', domain: 'messari.io', topic: 'Indexing' },
  { title: 'The Graph: Hypergraph is live', url: 'https://thegraph.com/blog/hypergraph-is-live/?utm_source=chatgpt.com', domain: 'thegraph.com', topic: 'Indexing' },
  { title: 'Tokenization of Real-World Assets: Opportunities & Challenges', url: 'https://katten.com/tokenization-of-real-world-assets-opportunities-challenges-and-the-path-ahead?utm_source=chatgpt.com', domain: 'katten.com', topic: 'RWA' },
])
const primarySource = computed(() => sources.value[0])

// ===== KPI data (point-in-time) =====
const kpis = ref([
  {
    id: 'security-losses',
    title: 'Security losses H1\'25',
    displayValue: '> $2.17',
    numericValue: 2.17,
    unit: 'B',
    caption: 'Mid-year snapshot',
    footnote: 'Chainalysis mid-year report.',
    source: { label: 'Chainalysis', url: sources.value[0].url },
  },
  {
    id: 'eth-etf-inflows',
    title: 'ETH spot ETF net inflows',
    displayValue: '> $13',
    numericValue: 13,
    unit: 'B',
    caption: 'Cumulative, as of Aug 20',
    footnote: 'See Citi/Coindesk coverage.',
    source: { label: 'CoinDesk', url: sources.value[1].url },
  },
  {
    id: 'rwa-outstanding',
    title: 'RWA on-chain outstanding',
    displayValue: '\u2248 $25.5',
    numericValue: 25.5, // midpoint of 24-27 range
    unit: 'B',
    caption: 'Range $24–27B (Aug 2025)',
    footnote: 'Illustrative midpoint; verify with source.',
    source: { label: 'Katten', url: sources.value[6].url },
  },
])

// ===== Table rows (editorial) =====
const rows = ref([
  {
    id: 'univ4',
    area: 'Infra',
    title: 'Uniswap v4 brings programmable liquidity (hooks)',
    insight: 'Custom pool logic (dynamic fees, limit orders, oracles) improves agent execution at AMM layer.',
    priority: 8,
    actions: ['Evaluate hook-based strategies for slippage & gas.', 'Assess governance and audit status per chain.'],
    sources: [
      { label: 'Uniswap v4 Docs', url: 'https://docs.uniswap.org/contracts/v4/overview?utm_source=chatgpt.com' },
      { label: 'Cointelegraph', url: sources.value[2].url },
    ],
  },
  {
    id: 'graph',
    area: 'Data',
    title: 'Indexing moves real-time (Substreams, Hypergraph)',
    insight: 'Lower-latency cross-chain feeds for model-driven decisions.',
    priority: 7,
    actions: ['Benchmark Substreams throughput for target chains.', 'Plan migration path for legacy subgraphs.'],
    sources: [
      { label: 'Messari', url: sources.value[4].url },
      { label: 'The Graph', url: sources.value[5].url },
    ],
  },
  {
    id: 'agents',
    area: 'Agents',
    title: 'Non-custodial agent execution (Lit Vincent)',
    insight: 'Policy-guarded keys enable borrow/swap/bridge under permissions.',
    priority: 7,
    actions: ['Define on-chain policy envelopes per venue.', 'Simulate failure modes (oracle stalls, revert storms).'],
    sources: [
      { label: 'CryptoNinjas', url: sources.value[3].url },
    ],
  },
  {
    id: 'etf',
    area: 'Markets',
    title: 'ETH institutional bid via spot ETFs',
    insight: 'Liquidity depth and developer activity tied to flows.',
    priority: 6,
    actions: ['Track net creations/redemptions vs. on-chain activity.', 'Stress-test strategies for ETH volatility clusters.'],
    sources: [
      { label: 'CoinDesk', url: sources.value[1].url },
    ],
  },
  {
    id: 'rwa',
    area: 'RWA',
    title: 'Tokenization compounding across treasuries & credit',
    insight: 'Expands non-crypto beta use cases for agent strategies.',
    priority: 6,
    actions: ['Map venue-level yields/risks (issuer, chain, KYC).', 'Identify composability with DeFi collateral.'],
    sources: [
      { label: 'Katten', url: sources.value[6].url },
    ],
  },
  {
    id: 'security',
    area: 'Risk',
    title: 'Security losses elevated (baseline risk context)',
    insight: 'Large single-venue compromises drive totals; enforce guardrails for automation.',
    priority: 9,
    actions: ['Enforce per-action policy and velocity limits.', 'Require multi-source data validation before execution.'],
    sources: [
      { label: 'Chainalysis', url: sources.value[0].url },
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

// ===== Charts =====
const barEl = ref<HTMLCanvasElement | null>(null)
const scatterEl = ref<HTMLCanvasElement | null>(null)
let barChart: any = null
let scatterChart: any = null

const tags = ['Programmable AMMs', 'Indexing', 'Agents', 'ETFs', 'RWA', 'Security']

function colorVars() {
  const s = getComputedStyle(document.documentElement)
  // DaisyUI maps primary/secondary/etc to CSS vars
  return {
    primary: s.getPropertyValue('--p') || '#00ff9d',
    secondary: s.getPropertyValue('--s') || '#7c3aed',
    accent: s.getPropertyValue('--a') || '#ff006e',
    info: s.getPropertyValue('--in') || '#3abff8',
    success: s.getPropertyValue('--su') || '#36d399',
    warning: s.getPropertyValue('--wa') || '#fbbd23',
    error: s.getPropertyValue('--er') || '#f87272',
    base: s.getPropertyValue('--b1') || '#1a1b1e',
  }
}

onMounted(async () => {
  const ChartModule: any = await import('chart.js/auto')
  const Chart = ChartModule.default || ChartModule
  const c = colorVars()

  // Bar
  if (barEl.value) {
    barChart = new Chart(barEl.value.getContext('2d'), {
      type: 'bar',
      data: {
        labels: kpis.value.map(k => k.title),
        datasets: [
          {
            label: 'USD Billions',
            data: kpis.value.map(k => k.numericValue),
            backgroundColor: [c.primary, c.secondary, c.accent],
            borderRadius: 12,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx: any) => `$${ctx.parsed.y.toLocaleString(undefined, { maximumFractionDigits: 2 })}B` } },
        },
        scales: {
          x: { ticks: { maxRotation: 0, minRotation: 0, color: '#a6adbb' }, grid: { display: false } },
          y: { beginAtZero: true, ticks: { color: '#a6adbb', callback: (v: any) => `$${Number(v).toFixed(0)}B` }, grid: { color: 'rgba(166,173,187,0.2)' } },
        },
      },
    })
  }

  // Scatter (Impact vs Maturity)
  if (scatterEl.value) {
    const points = [
      { x: 8.2, y: 6.8, label: 'Uniswap v4 hooks', color: c.secondary },
      { x: 7.4, y: 7.6, label: 'Hypergraph / Substreams', color: c.info },
      { x: 6.6, y: 6.9, label: 'Lit Vincent', color: c.success },
      { x: 6.0, y: 6.5, label: 'ETH ETFs', color: c.primary },
      { x: 7.2, y: 4.2, label: 'Security losses (risk)', color: c.error },
      { x: 8.1, y: 8.5, label: 'RWA tokenization', color: c.accent },
    ]

    scatterChart = new Chart(scatterEl.value.getContext('2d'), {
      type: 'scatter',
      data: {
        datasets: points.map(p => ({
          label: p.label,
          data: [{ x: p.x, y: p.y }],
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: p.color,
          pointBorderColor: '#00000040',
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { min: 0, max: 10, title: { display: true, text: 'Maturity' }, grid: { color: 'rgba(166,173,187,0.15)' }, ticks: { color: '#a6adbb' } },
          y: { min: 0, max: 10, title: { display: true, text: 'Impact' }, grid: { color: 'rgba(166,173,187,0.15)' }, ticks: { color: '#a6adbb' } },
        },
      },
    })
  }
})

onBeforeUnmount(() => {
  if (barChart) barChart.destroy()
  if (scatterChart) scatterChart.destroy()
})

// ===== Utilities =====
function favicon(url: string) {
  try {
    const { origin } = new URL(url)
    return `${origin}/favicon.ico`
  } catch {
    return '/favicon.ico'
  }
}

function downloadJSON() {
  const payload = {
    meta: { title: 'AI × DeFi — Daily Market Insights', date: '2025-09-07T09:00:00+02:00' },
    kpis: kpis.value,
    rows: rows.value,
    sources: sources.value,
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'ai-defi-daily-2025-09-07.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.card-title { letter-spacing: -0.02em; }
</style>
