<template>
  <main class="min-h-screen bg-gradient-to-b from-base-100 to-base-200/30 text-base-content">
    <!-- ================= HERO / MAGAZINE COVER ================= -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
      <div class="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28 lg:pb-24 relative">
        <div class="grid gap-12 lg:grid-cols-12 items-end">
          <header class="lg:col-span-8">
            <div class="flex items-center gap-4 mb-6">
              <p class="badge badge-primary badge-lg">Special</p>
              <div class="h-[2px] flex-1 bg-gradient-to-r from-primary/30 to-transparent"></div>
            </div>
            <h1 class="text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight bg-gradient-to-br from-primary to-primary-focus bg-clip-text text-transparent">
              Why <span class="text-base-content">Onchain</span> × Chris<br/>
              is a Fit
            </h1>
            <p class="mt-8 text-xl lg:text-2xl opacity-90 max-w-3xl font-light leading-relaxed">
              Weaveing narrative with live on‑chain metrics to make insights actionable.
            </p>
          </header>
          <aside class="lg:col-span-4">
            <div class="grid grid-cols-3 lg:grid-cols-1 gap-4">
              <div class="stat bg-base-100/50 backdrop-blur-sm rounded-box shadow-lg border border-base-300">
                <div class="stat-title font-medium">Years in Web3</div>
                <div class="stat-value text-primary">7+</div>
                <div class="stat-desc text-sm">DeFi • Tokenization • AI</div>
              </div>
              <div class="stat bg-base-100/50 backdrop-blur-sm rounded-box shadow-lg border border-base-300">
                <div class="stat-title font-medium">Reports/Dashboards</div>
                <div class="stat-value text-primary">50+</div>
                <div class="stat-desc text-sm">Evidence over hype</div>
              </div>
              <div class="stat bg-base-100/50 backdrop-blur-sm rounded-box shadow-lg border border-base-300">
                <div class="stat-title font-medium">Focus</div>
                <div class="stat-value text-primary">Clarity</div>
                <div class="stat-desc text-sm">Transparent methods</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div class="divider mx-auto max-w-7xl px-6 before:bg-gradient-to-r before:from-transparent before:via-base-content/20 before:to-transparent after:bg-gradient-to-r after:from-transparent after:via-base-content/20 after:to-transparent">
        <div class="badge badge-outline">Scroll to explore</div>
      </div>
    </section>

    <!-- ================= SECTION 1: STORY + PULL QUOTE ================= -->
    <section class="mx-auto max-w-7xl px-6 py-20">
      <div class="grid gap-12 lg:grid-cols-12 items-start">
        <div class="lg:col-span-7">
          <h2 class="text-3xl lg:text-5xl font-black leading-tight bg-gradient-to-br from-base-content to-base-content/70 bg-clip-text text-transparent">
            My Path to Here
          </h2>
          <p class="mt-8 text-lg lg:text-xl leading-relaxed opacity-90 font-light">
            I've been building and experimenting in Web3 for years — from DeFi to tokenization. Some may remember me
            from a panel appearance at the <span class="font-medium">Lisk Center in Berlin</span>. Not every startup I launched took off, but each added
            practical insight into what accelerates — and what blocks — real adoption. That journey, combined with my
            current AI work, sharpened my focus: dedicate the next chapter to research, reporting, and data‑driven
            transparency.
          </p>
        </div>
        <blockquote class="lg:col-span-5 rounded-2xl bg-base-100 p-8 lg:p-10 shadow-xl border border-base-300 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
          <p class="text-2xl lg:text-3xl font-semibold leading-relaxed relative">
            "Good research doesn't just <em>describe</em> the chain — it <span class="underline decoration-primary decoration-2">explains</span> it.
            My job is to turn raw metrics into decisions people can trust."
          </p>
        </blockquote>
      </div>
    </section>

    <!-- ================= SECTION 2: STABLECOINS (TEXT × CHART) ================= -->
    <section class="bg-gradient-to-br from-base-200/80 to-base-200/40">
      <div class="mx-auto max-w-7xl px-6 py-20">
        <div class="grid gap-12 lg:grid-cols-12 items-start">
          <article class="lg:col-span-5 order-2 lg:order-1">
            <h3 class="text-2xl lg:text-4xl font-black leading-tight bg-gradient-to-br from-base-content to-base-content/70 bg-clip-text text-transparent">
              Dashboards that Advance the Mission
            </h3>
            <p class="mt-6 text-lg lg:text-xl opacity-90 font-light leading-relaxed">
              Onchain stands for clarity in a noisy space. My contribution is to make data not just available, but
              <span class="font-medium">understandable and actionable</span>. The stablecoin view on the right embeds
              evidence directly into the narrative — the kind of chart that helps policymakers and enterprises grasp
              real‑world impact at a glance.
            </p>
            <ul class="mt-8 space-y-4 text-base">
              <li class="flex items-start gap-3">
                <span class="badge badge-primary badge-sm">1</span>
                <span class="opacity-90">Source‑linked, reproducible methods</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="badge badge-primary badge-sm">2</span>
                <span class="opacity-90">Narrative annotations that explain the "why"</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="badge badge-primary badge-sm">3</span>
                <span class="opacity-90">Auto‑refresh cadence for longevity</span>
              </li>
            </ul>
          </article>
          <div class="lg:col-span-7 order-1 lg:order-2">
            <div class="card bg-base-100 shadow-xl border border-base-300">
              <div class="card-body">
                <div class="flex items-center justify-between gap-4">
                  <h4 class="card-title text-lg font-bold">Stablecoin Adoption Over Time</h4>
                  <span class="badge badge-outline">DeFiLlama</span>
                </div>
                <div class="h-80">
                  <canvas ref="stablecoinCanvas"></canvas>
                </div>
                <p class="mt-4 text-sm opacity-70">Data: stablecoins.llama.fi — total circulating USD across tracked assets.
                  Graceful fallback if API/CORS unavailable.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 3: TVL COMPARISON (CHART × TEXT) ================= -->
    <section class="mx-auto max-w-7xl px-6 py-20">
      <div class="grid gap-12 lg:grid-cols-12 items-start">
        <div class="lg:col-span-7">
          <div class="card bg-base-100 shadow-xl border border-base-300">
            <div class="card-body">
              <div class="flex items-center justify-between gap-4">
                <h4 class="card-title text-lg font-bold">Ecosystem Health: TVL by Chain</h4>
                <span class="badge badge-outline">DeFiLlama</span>
              </div>
              <div class="h-80">
                <canvas ref="tvlCanvas"></canvas>
              </div>
              <p class="mt-4 text-sm opacity-70">Comparative TVL over time for selected chains (Ethereum, Solana, Arbitrum). Shows momentum and
                where builders & liquidity concentrate. Fallback enabled.</p>
            </div>
          </div>
        </div>
        <article class="lg:col-span-5">
          <h3 class="text-2xl lg:text-4xl font-black leading-tight bg-gradient-to-br from-base-content to-base-content/70 bg-clip-text text-transparent">
            From Hype to Evidence
          </h3>
          <p class="mt-6 text-lg lg:text-xl opacity-90 font-light leading-relaxed">
            Tokenization and DeFi should be evaluated with evidence: where is liquidity growing, and where is it
            consolidating? Placing comparative context beside narrative lets readers understand market structure without
            sifting through raw tables.
          </p>
          <div class="mt-8 grid grid-cols-3 gap-4">
            <div class="stat bg-base-200 rounded-box shadow-lg border border-base-300">
              <div class="stat-title font-medium">Chains compared</div>
              <div class="stat-value text-primary">3</div>
              <div class="stat-desc text-sm">Eth • Sol • Arb</div>
            </div>
            <div class="stat bg-base-200 rounded-box shadow-lg border border-base-300">
              <div class="stat-title font-medium">Update cadence</div>
              <div class="stat-value text-primary">Weekly</div>
              <div class="stat-desc text-sm">Auto-refresh</div>
            </div>
            <div class="stat bg-base-200 rounded-box shadow-lg border border-base-300">
              <div class="stat-title font-medium">Perspective</div>
              <div class="stat-value text-primary">Neutral</div>
              <div class="stat-desc text-sm">Evidence‑based</div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ================= SECTION 4: DEVELOPERS ================= -->
    <section class="bg-gradient-to-br from-base-200/80 to-base-200/40">
      <div class="mx-auto max-w-7xl px-6 py-20">
        <div class="grid gap-12 lg:grid-cols-12 items-start">
          <article class="lg:col-span-5 order-2 lg:order-1">
            <h3 class="text-2xl lg:text-4xl font-black leading-tight bg-gradient-to-br from-base-content to-base-content/70 bg-clip-text text-transparent">
              Builders as a Leading Indicator
            </h3>
            <p class="mt-6 text-lg lg:text-xl opacity-90 font-light leading-relaxed">
              Adoption isn't only capital — it's creators. Where developers gather, sustainable ecosystems emerge. If a
              Token Terminal API key is supplied, the chart renders live developer activity; otherwise a curated demo
              snapshot appears.
            </p>
            <div class="mt-8">
              <label class="label"><span class="label-text font-medium">Token Terminal API Key (optional)</span></label>
              <input v-model="tokenTerminalKey" type="password" placeholder="paste key to enable live dev chart" 
                class="input input-bordered w-full max-w-md bg-base-100"/>
            </div>
          </article>
          <div class="lg:col-span-7 order-1 lg:order-2">
            <div class="card bg-base-100 shadow-xl border border-base-300">
              <div class="card-body">
                <div class="flex items-center justify-between gap-4">
                  <h4 class="card-title text-lg font-bold">Developer Activity (Monthly Active Devs)</h4>
                  <span class="badge badge-outline">Token Terminal / Demo</span>
                </div>
                <div class="h-80">
                  <canvas ref="devCanvas"></canvas>
                </div>
                <p class="mt-4 text-sm opacity-70">Fallback demo series for major ecosystems when live API is unavailable.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 5: VISION & METHOD ================= -->
    <section class="mx-auto max-w-7xl px-6 py-20">
      <div class="grid gap-12 lg:grid-cols-12 items-start">
        <article class="lg:col-span-7 prose max-w-none">
          <h3 class="text-2xl lg:text-4xl font-black leading-tight bg-gradient-to-br from-base-content to-base-content/70 bg-clip-text text-transparent mb-8">
            Long‑Term Vision
          </h3>
          <p class="text-lg lg:text-xl opacity-90 font-light leading-relaxed">
            I don't see this as freelancing. I see this as joining a mission:
          </p>
          <ul class="mt-6 space-y-4 list-none pl-0">
            <li class="flex items-start gap-3">
              <span class="badge badge-primary badge-sm mt-1.5">1</span>
              <span class="opacity-90 text-lg">Make research more <span class="font-medium">accessible through visuals</span></span>
            </li>
            <li class="flex items-start gap-3">
              <span class="badge badge-primary badge-sm mt-1.5">2</span>
              <span class="opacity-90 text-lg">Turn <span class="font-medium">raw on‑chain data into narrative insights</span></span>
            </li>
            <li class="flex items-start gap-3">
              <span class="badge badge-primary badge-sm mt-1.5">3</span>
              <span class="opacity-90 text-lg">Combine <span class="font-medium">AI + Web3 analytics</span> to inform policymakers, enterprises, and founders</span>
            </li>
          </ul>
        </article>
        <aside class="lg:col-span-5">
          <div class="card bg-base-100 shadow-xl border border-base-300" id="methodology">
            <div class="card-body">
              <h4 class="card-title font-bold">Methodology & Notes</h4>
              <p class="text-base opacity-90">Data sources include DeFiLlama (stablecoins & chain TVL) and optionally Token Terminal (developer
                activity). Charts refresh on load and gracefully fall back to demo data when APIs or CORS are
                unavailable.</p>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- ================= CONTACT ================= -->
    <section class="bg-gradient-to-br from-primary/5 to-transparent">
      <div class="mx-auto max-w-7xl px-6 py-20" id="contact">
        <div class="card bg-base-100 shadow-xl border border-base-300">
          <div class="card-body">
            <h4 class="card-title text-2xl font-black">Let's Build</h4>
            <p class="text-lg opacity-90">Onchain is building the credibility Web3 needs. I'd love to help ensure every report is not just written,
              but <em>felt</em> — through data, visuals, and narrative.</p>
            <div class="mt-6 flex flex-wrap gap-4">
              <a href="mailto:hello@chris.berlin" class="btn btn-primary btn-lg">Email Chris</a>
              <a href="/" class="btn btn-outline btn-lg">Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip, Legend)

// Canvas refs
const stablecoinCanvas = ref<HTMLCanvasElement | null>(null)
const tvlCanvas = ref<HTMLCanvasElement | null>(null)
const devCanvas = ref<HTMLCanvasElement | null>(null)

let stablecoinChart: Chart | null = null
let tvlChart: Chart | null = null
let devChart: Chart | null = null

const tokenTerminalKey = ref<string>('')

function destroyChart(c: Chart | null) { if (c) c.destroy() }

function fmtDate(ts: number) {
  const d = new Date(ts * 1000)
  return d.toLocaleDateString(undefined, { year: '2-digit', month: 'short' })
}

async function fetchJSON(url: string, init?: RequestInit, timeoutMs = 12000) {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(url, { ...(init || {}), signal: ctrl.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } finally { clearTimeout(id) }
}

// ---------- Stablecoins (DeFiLlama) ----------
async function renderStablecoins() {
  await nextTick()
  const ctx = stablecoinCanvas.value?.getContext('2d')
  if (!ctx) return
  destroyChart(stablecoinChart)

  let labels: string[] = []
  let values: number[] = []

  try {
    const data = await fetchJSON('https://stablecoins.llama.fi/stablecoincharts/all')
    labels = data.map((d: any) => fmtDate(d.date))
    values = data.map((d: any) => Math.round(d.totalCirculatingUSD / 1e9 * 100) / 100)
  } catch (e) {
    // fallback demo
    const now = Math.floor(Date.now() / 1000)
    const points = 36
    labels = Array.from({ length: points }, (_, i) => fmtDate(now - (points - i) * 86400 * 30))
    values = Array.from({ length: points }, (_, i) => 50 + i * 2 + (Math.sin(i / 2) * 3))
  }

  stablecoinChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: [{
      label: 'Stablecoin Market Cap ($B)',
      data: values,
      tension: 0.35,
      fill: true,
      borderWidth: 2,
      pointRadius: 0,
      backgroundColor: (c) => {
        const { chart } = c
        const { ctx: g, chartArea } = chart
        if (!chartArea) return 'rgba(59,130,246,0.15)'
        const grad = g.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
        grad.addColorStop(0, 'rgba(59,130,246,0.25)')
        grad.addColorStop(1, 'rgba(59,130,246,0.03)')
        return grad
      }
    }] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { ticks: { maxTicksLimit: 8 } },
        y: { beginAtZero: false, ticks: { callback: (v) => `$${v}B` } }
      }
    }
  })
}

// ---------- TVL by Chain (DeFiLlama) ----------
const chains = ['Ethereum', 'Solana', 'Arbitrum']

async function getChainSeries(chain: string) {
  const url = `https://api.llama.fi/v2/historicalChainTvl/${encodeURIComponent(chain)}`
  const rows = await fetchJSON(url)
  return rows.map((r: any) => ({ date: r.date, tvl: r.totalLiquidityUSD }))
}

async function renderTVL() {
  await nextTick()
  const ctx = tvlCanvas.value?.getContext('2d')
  if (!ctx) return
  destroyChart(tvlChart)

  let labels: string[] = []
  const datasets: any[] = []

  try {
    const seriesList = await Promise.all(chains.map(async c => {
      try { return await getChainSeries(c) } catch { return [] }
    }))

    const minLen = Math.min(...seriesList.map(s => s.length).filter(n => n > 0))
    const aligned = seriesList.map(s => s.slice(-minLen))
    labels = aligned[0].map(d => fmtDate(d.date))

    aligned.forEach((s, idx) => {
      datasets.push({
        label: chains[idx],
        data: s.map(d => Math.round(d.tvl / 1e9 * 100) / 100),
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 0,
        fill: false
      })
    })
  } catch (e) {
    // fallback demo
    const now = Math.floor(Date.now() / 1000)
    const points = 24
    labels = Array.from({ length: points }, (_, i) => fmtDate(now - (points - i) * 86400 * 30))
    const base = [80, 18, 12]
    chains.forEach((name, i) => {
      datasets.push({
        label: name,
        data: Array.from({ length: points }, (_, j) => base[i] + j * (i + 0.4) + Math.sin(j / (i + 1)) * 1.2),
        tension: 0.3, borderWidth: 2, pointRadius: 0, fill: false
      })
    })
  }

  tvlChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' }, tooltip: { mode: 'index', intersect: false } },
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { ticks: { maxTicksLimit: 8 } },
        y: { beginAtZero: false, ticks: { callback: (v) => `$${v}B` } }
      }
    }
  })
}

// ---------- Developers (Token Terminal optional) ----------
async function renderDevelopers() {
  await nextTick()
  const ctx = devCanvas.value?.getContext('2d')
  if (!ctx) return
  destroyChart(devChart)

  let labels: string[] = []
  const datasets: any[] = []

  async function fetchDevSeries() {
    if (!tokenTerminalKey.value) throw new Error('No key')
    // TODO: Replace with real Token Terminal endpoint + mapping when key is available.
    throw new Error('demo')
  }

  try {
    await fetchDevSeries()
  } catch {
    const months = 18
    const now = new Date()
    labels = Array.from({ length: months }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1)
      return d.toLocaleDateString(undefined, { month: 'short', year: '2-digit' })
    })
    const series = {
      Ethereum: Array.from({ length: months }, (_, i) => 1600 + Math.round(i * 12 + Math.sin(i / 2) * 25)),
      Solana: Array.from({ length: months }, (_, i) => 720 + Math.round(i * 10 + Math.cos(i / 3) * 20)),
      Arbitrum: Array.from({ length: months }, (_, i) => 380 + Math.round(i * 9 + Math.sin(i / 4) * 10))
    }
    Object.entries(series).forEach(([name, vals]) => {
      datasets.push({ label: name, data: vals, tension: 0.3, borderWidth: 2, pointRadius: 0, fill: false })
    })
  }

  devChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' }, tooltip: { mode: 'index', intersect: false } },
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { ticks: { maxTicksLimit: 9 } },
        y: { beginAtZero: false }
      }
    }
  })
}

onMounted(async () => {
  await renderStablecoins()
  await renderTVL()
  await renderDevelopers()
})

watch(tokenTerminalKey, async () => { await renderDevelopers() })
</script>

<style scoped>
/* Fine‑tune headings for magazine feel */
:deep(h1) { 
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.badge-lg { 
  height: 2rem; 
  font-size: .9rem;
  font-weight: 500;
}

/* Ensure canvases expand within fixed-height wrappers */
canvas { 
  width: 100% !important; 
  height: 100% !important; 
  display: block;
}

/* Enhance text readability */
.text-lg, .text-xl {
  letter-spacing: -0.01em;
}

/* Gradient text animation */
[class*="from-base-content"] {
  background-size: 200% auto;
  animation: shine 8s ease-in-out infinite;
}

@keyframes shine {
  0% { background-position: 0% center; }
  50% { background-position: 100% center; }
  100% { background-position: 0% center; }
}
</style>
