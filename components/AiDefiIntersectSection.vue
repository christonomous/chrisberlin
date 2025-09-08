<template>
  <section id="ai-defi-intersect" class="relative z-10 container mx-auto px-4 py-8 space-y-6">
    <!-- Title + micro-copy -->
    <div class="flex flex-col gap-2">
      <h2 class="text-2xl md:text-3xl font-bold tracking-tight">AI × DeFi Market (Modeled Intersection)</h2>
      <p class="text-base-content/70 max-w-3xl">
        Indicative sizing of the <span class="font-semibold">AI-enabled DeFi</span> revenue pool. We combine
        independent market estimates and apply transparent assumptions. Hover the chart for exact values.
      </p>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card bg-base-200">
        <div class="card-body">
          <div class="badge badge-primary w-fit">Base case</div>
          <h3 class="card-title">2025e AI×DeFi</h3>
          <p class="text-3xl font-extrabold">{{ formatUSD(kpis.y2025Base) }}</p>
          <p class="text-xs opacity-70">Derived from AI-in-FinTech × DeFi-share-of-FinTech</p>
        </div>
      </div>
      <div class="card bg-base-200">
        <div class="card-body">
          <div class="badge badge-accent w-fit">Runway</div>
          <h3 class="card-title">2030e AI×DeFi</h3>
          <p class="text-3xl font-extrabold">{{ formatUSD(kpis.y2030Base) }}</p>
          <p class="text-xs opacity-70">Assumes stated CAGRs continue through 2030</p>
        </div>
      </div>
      <div class="card bg-base-200">
        <div class="card-body">
          <div class="badge badge-ghost w-fit">Context</div>
          <h3 class="card-title">DeFi TVL (live)</h3>
          <a href="https://defillama.com" target="_blank" rel="noopener" class="link link-primary text-lg font-semibold">
            Check DeFiLlama
          </a>
          <p class="text-xs opacity-70">External dashboard for liquidity context</p>
        </div>
      </div>
    </div>

    <!-- Line Chart (fixed height, colorful) -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <h3 class="card-title">AI × DeFi — Historical & Forecast (Scenarios)</h3>
          <div class="flex items-center gap-2 text-xs">
            <span class="badge badge-outline">Conservative</span>
            <span class="badge badge-outline badge-primary">Base</span>
            <span class="badge badge-outline badge-accent">Aggressive</span>
          </div>
        </div>
        <p class="text-sm opacity-70">Fixed 320px height. Colors set explicitly to avoid theme bleed.</p>

        <client-only>
          <apexchart
            type="line"
            :height="320"
            :options="chart.options"
            :series="chart.series"
            class="w-full"
          />
        </client-only>
      </div>
    </div>

    <!-- Table -->
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <h3 class="card-title">Year-by-Year (USD Billions)</h3>
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Year</th>
                <th>AI-in-FinTech</th>
                <th>DeFi Market</th>
                <th>Total FinTech Revenues</th>
                <th>DeFi Share</th>
                <th class="text-right">AI×DeFi (Cons.)</th>
                <th class="text-right text-primary">AI×DeFi (Base)</th>
                <th class="text-right text-accent">AI×DeFi (Aggr.)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in tableRows" :key="row.year">
                <td class="font-semibold">{{ row.year }}</td>
                <td>{{ formatUSD(row.aiFintech) }}</td>
                <td>{{ formatUSD(row.defiMarket) }}</td>
                <td>{{ formatUSD(row.fintechRev) }}</td>
                <td>{{ (row.share * 100).toFixed(1) }}%</td>
                <td class="text-right">{{ formatUSD(row.intersectionConservative) }}</td>
                <td class="text-right text-primary font-semibold">{{ formatUSD(row.intersectionBase) }}</td>
                <td class="text-right text-accent font-semibold">{{ formatUSD(row.intersectionAggressive) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-xs opacity-70 mt-2">
          Note: 2030 AI-in-FinTech is a one-year extrapolation of the 2025–2029 CAGR; DeFi path is back-solved from 2030 target using the cited CAGR.
        </p>
      </div>
    </div>

    <!-- Tiny summary -->
    <div class="alert bg-base-200">
      <span class="text-sm">
        TL;DR — Our <span class="font-semibold">Base Case</span> points to ~
        <span class="font-semibold">{{ formatUSD(kpis.y2025Base) }}</span> in 2025e growing to ~
        <span class="font-semibold">{{ formatUSD(kpis.y2030Base) }}</span> by 2030 as DeFi expands its share of overall FinTech and AI-in-FinTech scales.
      </span>
    </div>

    <!-- Sources (always link) -->
    <div class="collapse bg-base-200">
      <input type="checkbox" />
      <div class="collapse-title text-md font-medium">Sources & methodology</div>
      <div class="collapse-content text-sm space-y-2">
        <p>
          <strong>AI in FinTech:</strong>
          <a class="link link-accent" target="_blank" rel="noopener"
             href="https://www.researchandmarkets.com/reports/5767241/ai-in-fintech-market-report">
            Research & Markets (2025 report)
          </a>
          — 2025: $17.79B; 2029: ~$52.19B; CAGR ≈ 30.9%.
        </p>
        <p>
          <strong>DeFi market:</strong>
          <a class="link link-accent" target="_blank" rel="noopener"
             href="https://www.grandviewresearch.com/industry-analysis/decentralized-finance-market-report">
            Grand View Research (DeFi Market)
          </a>
          — 2024: $20.48B; 2030: $231.19B; 2025–2030 CAGR 53.7%.
        </p>
        <p>
          <strong>FinTech revenues:</strong>
          <a class="link link-accent" target="_blank" rel="noopener"
             href="https://bankingjournal.aba.com/2025/06/report-fintech-firms-show-strong-fundamentals-growth/">
            ABA Banking Journal (2025-06-10)
          </a>
          citing
          <a class="link link-accent" target="_blank" rel="noopener"
             href="https://www.bcg.com/publications/2024/global-fintech-prudence-profits-and-growth">
            BCG/QED (to $1.5T by 2030)
          </a>
          — 2024 revenue ≈ $378B; path to ~$1.5T by 2030.
        </p>
        <p>
          <strong>TVL context:</strong>
          <a class="link link-accent" target="_blank" rel="noopener" href="https://defillama.com/">
            DeFiLlama
          </a>
          (live dashboard, not used in the sizing formula).
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Assumptions (from sources)
const ai2025 = 17.79;           // $B (Research & Markets)
const aiCAGR = 0.309;           // 30.9% to 2029
const defi2030 = 231.19;        // $B (Grand View Research)
const defiCAGR = 0.537;         // 53.7% 2025–2030 (global)
const fintech2024 = 378;        // $B (ABA/BCG)
const fintech2030 = 1500;       // $B (BCG/QED)

// Helper: compute CAGR from start->end across n years
const toCAGR = (start: number, end: number, years: number) => Math.pow(end / start, 1 / years) - 1;

// Backsolve DeFi 2025 from 2030 and CAGR (so 2025→2030 hits target)
const defi2025 = defi2030 / Math.pow(1 + defiCAGR, 5);

// FinTech CAGR from 2024 to 2030
const fintechCAGR = toCAGR(fintech2024, fintech2030, 6);

// Build series 2025..2030
const years = [2025, 2026, 2027, 2028, 2029, 2030];

// AI-in-FinTech series (compounded from 2025)
const aiSeries = years.map((y, i) => +(ai2025 * Math.pow(1 + aiCAGR, i)).toFixed(3));

// DeFi series (compounded from 2025 backsolved)
const defiSeries = years.map((y, i) => +(defi2025 * Math.pow(1 + defiCAGR, i)).toFixed(3));

// FinTech revenue series (compounded from 2024 base)
const fintechSeries = years.map((y, i) => +(fintech2024 * Math.pow(1 + fintechCAGR, i + 1)).toFixed(3));

// Share and intersection
const shareSeries = years.map((_, i) => +(defiSeries[i] / fintechSeries[i]));
const baseIntersect = years.map((_, i) => +(aiSeries[i] * shareSeries[i]).toFixed(3));
const consIntersect = baseIntersect.map(v => +(v * 0.75).toFixed(3));
const aggrIntersect = baseIntersect.map(v => +(v * 1.25).toFixed(3));

// Table rows
const tableRows = years.map((year, i) => ({
  year,
  aiFintech: aiSeries[i],
  defiMarket: defiSeries[i],
  fintechRev: fintechSeries[i],
  share: shareSeries[i],
  intersectionConservative: consIntersect[i],
  intersectionBase: baseIntersect[i],
  intersectionAggressive: aggrIntersect[i],
}));

// KPIs
const kpis = {
  y2025Base: baseIntersect[0],
  y2030Base: baseIntersect[5],
};

// Chart (fixed height, colorful)
const chart = {
  series: [
    { name: 'Conservative', data: consIntersect },
    { name: 'Base',         data: baseIntersect },
    { name: 'Aggressive',   data: aggrIntersect },
  ],
  options: {
    chart: {
      id: 'ai-defi-intersection',
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: true },
    },
    colors: ['#FB7185', '#60A5FA', '#34D399'], // colorful & legible on dark/light
    stroke: { width: 3, curve: 'smooth' },
    xaxis: { categories: years, title: { text: 'Year' } },
    yaxis: {
      title: { text: 'USD Billions' },
      labels: {
        formatter: (val: number) => `$${val.toFixed(1)}B`,
      },
      min: 0,
    },
    grid: { strokeDashArray: 4 },
    tooltip: {
      y: { formatter: (val: number) => `$${val.toFixed(2)}B` },
    },
    legend: { position: 'top' },
  },
};

// Format helper
function formatUSD(billions: number) {
  const v = billions * 1e9;
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', notation: 'compact' }).format(v);
}

defineProps<{}>();
</script>
