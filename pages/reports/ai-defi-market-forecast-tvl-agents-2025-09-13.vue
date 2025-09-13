<template>
  <NuxtLayout name="reports">
    <!-- KPI / Stats -->
    <section class="relative z-10 container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <div
          v-for="k in kpis"
          :key="k.id"
          class="card bg-base-100/80 backdrop-blur border border-base-300/60 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,.35)] transition-shadow"
        >
          <div class="card-body">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="card-title text-base">{{ k.title }}</h2>
                <p class="text-xs opacity-70" v-if="k.caption">
                  <a :href="k.source" target="_blank" class="link link-primary">{{ k.caption }}</a>
                </p>
              </div>
              <div class="badge badge-secondary badge-outline">{{ k.tag }}</div>
            </div>
            <p class="text-2xl font-bold mt-2">{{ k.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Charts -->
    <section class="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Sector Size -->
      <div class="card bg-base-100/80 border border-base-300/60 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Sector Size Snapshot (Sep 2025)</h2>

          <!-- FIXED HEIGHT WRAPPER -->
          <div class="relative h-56 md:h-72">
            <canvas id="sectorBarChart" class="absolute inset-0 w-full h-full"></canvas>
          </div>

          <p class="text-xs opacity-70 mt-2">
            <b>Conclusion:</b> DeFi is the capital base; AI/agent tokens are a fast-growing overlay that will plug into AMMs, lending, and intents.
            <a href="https://defillama.com/" target="_blank" class="link link-primary">DeFiLlama</a> •
            <a href="https://www.coingecko.com/en/categories/artificial-intelligence" target="_blank" class="link link-primary">CoinGecko AI</a> •
            <a href="https://coinmarketcap.com/view/ai-agents/" target="_blank" class="link link-primary">CMC AI Agents</a>
          </p>
        </div>
      </div>

      <!-- Forecast -->
      <div class="card bg-base-100/80 border border-base-300/60 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Forecast: AI × DeFi Serviceable Market (2025 → 2028)</h2>

          <!-- FIXED HEIGHT WRAPPER -->
          <div class="relative h-56 md:h-72">
            <canvas id="forecastLineChart" class="absolute inset-0 w-full h-full"></canvas>
          </div>

          <p class="text-xs opacity-70 mt-2">
            <b>Conclusion:</b> Base case: AI-driven DeFi (agents, indexing, data, risk) monetizes ~1.5–3.0% of TVL by 2028, a ~$3–8B pool.
            <a href="https://dappradar.com/blog/defi-tvl-breaks-270b-ath-but-nfts-lead-in-users" target="_blank" class="link link-primary">DappRadar (ATH $270B, Aug 2025)</a> •
            <a href="https://defillama.com/" target="_blank" class="link link-primary">DeFiLlama baseline</a>
          </p>
        </div>
      </div>
    </section>

    <!-- Summary Table -->
    <section class="container mx-auto px-4 py-8">
      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body overflow-x-auto">
          <h2 class="card-title mb-4">Summary Snapshot</h2>
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>Trend</th>
                <th>Key Figure / Insight</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in summary" :key="row.trend">
                <td>{{ row.trend }}</td>
                <td>
                  {{ row.insight }}
                  <a v-if="row.source" :href="row.source" target="_blank" class="link link-primary">[Source]</a>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="text-xs opacity-70 mt-3">
            Notes: The Graph’s Q2’25 usage revenue is an infra proxy; Olas liquidity/treasury indicates early agent-economy depth; recent checks (e.g., MAIGA) show continued investor appetite.
          </p>
        </div>
      </div>
    </section>

    <!-- Conclusion -->
    <section class="container mx-auto px-4 py-8 prose prose-invert">
      <p>
        <b>AI is becoming DeFi’s execution & data co-pilot.</b> As TVL rebounds and agent frameworks mature,
        expect migration from manual strategies to autonomous flows with stronger monitoring and circuit breakers.
        Winners bundle <strong>agents + indexing + risk controls</strong> in intent-aware vaults and programmable AMMs.
      </p>
    </section>
  </NuxtLayout>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import {
  Chart,
  BarController, BarElement,
  LineController, LineElement, PointElement,
  CategoryScale, LinearScale,
  Tooltip, Legend, Filler,
} from "chart.js";

Chart.register(
  BarController, BarElement,
  LineController, LineElement, PointElement,
  CategoryScale, LinearScale,
  Tooltip, Legend, Filler
);

// Make charts respect fixed-height wrappers
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false; // IMPORTANT with fixed-height parent

// KPI values with sources (Sep 2025)
const kpis = [
  { id: 1, title: "DeFi TVL (ATH)", value: "$270B", tag: "Jul 2025", caption: "DappRadar", source: "https://dappradar.com/blog/defi-tvl-breaks-270b-ath-but-nfts-lead-in-users" },
  { id: 2, title: "AI Tokens Mkt Cap", value: "$33.1B", tag: "Now", caption: "CoinGecko", source: "https://www.coingecko.com/en/categories/artificial-intelligence" },
  { id: 3, title: "AI Agents Subsector", value: "$5.0B", tag: "Now", caption: "CoinMarketCap", source: "https://coinmarketcap.com/view/ai-agents/" },
  { id: 4, title: "The Graph Revenue (Q2’25)", value: "$128,862", tag: "Usage", caption: "Messari", source: "https://messari.io/report/state-of-the-graph-q2-2025" },
];

// Summary rows with sources
const summary = [
  { trend: "DeFi Capital Base", insight: "New ATH at $270B in July; market participation broadens.", source: "https://dappradar.com/blog/defi-tvl-breaks-270b-ath-but-nfts-lead-in-users" },
  { trend: "AI Tokens Layer", insight: "AI/Big Data tokens ~ $33B cap; developer interest growing.", source: "https://www.coingecko.com/en/categories/artificial-intelligence" },
  { trend: "Agent Economy", insight: "AI agents subsector near ~$5B cap; infra & tooling expanding.", source: "https://coinmarketcap.com/view/ai-agents/" },
  { trend: "Indexing Demand", insight: "The Graph Q2’25 usage revenue ~$129k (+6.4% QoQ).", source: "https://messari.io/report/state-of-the-graph-q2-2025" },
  { trend: "Agent Funding", insight: "MAIGA raised $2M strategic (Sep 4, 2025).", source: "https://chainwire.org/2025/09/04/maiga-leads-the-ai-agentic-for-future-of-defi-with-2m-strategic-round/" },
  { trend: "Agent Rails", insight: "Olas POL/Treasury milestones; deepening agent rails.", source: "https://olas.network/timeline" },
];

// Chart instances
let sectorChart, forecastChart;

const mountSectorChart = () => {
  const ctx = document.getElementById("sectorBarChart");
  if (!ctx) return;

  // Destroy if HMR/keep-alive re-renders
  if (sectorChart) sectorChart.destroy();

  sectorChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["DeFi TVL (ATH)", "AI Tokens (All)", "AI Agents"],
      datasets: [
        {
          label: "USD (Billions)",
          data: [270, 33.1, 5.0],
          backgroundColor: ["#6366F1", "#22C55E", "#F59E0B"],
          borderRadius: 10,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
      scales: {
        y: { beginAtZero: true, ticks: { callback: (v) => `$${v}B` }, grid: { drawBorder: false } },
        x: { grid: { display: false } },
      },
    },
  });
};

const mountForecastChart = () => {
  const ctx = document.getElementById("forecastLineChart");
  if (!ctx) return;

  if (forecastChart) forecastChart.destroy();

  // Assumptions
  const years = ["2025", "2026", "2027", "2028"];
  const tvlBase = 200; // B$ working baseline between spot and ATH
  const CAGR = { low: 0.08, base: 0.18, high: 0.28 };
  const take = { low: 0.01, base: 0.02, high: 0.03 };
  const grow = (start, r) => years.map((_, i) => +(start * Math.pow(1 + r, i)).toFixed(1));
  const ramp = (target) => years.map((_, i) => +(target * (i / (years.length - 1))).toFixed(4));
  const svc = (tvlArr, target) => tvlArr.map((v, i) => +(v * ramp(target)[i]).toFixed(2));

  const tvlMid = grow(tvlBase, CAGR.base);
  const tvlLow = grow(tvlBase, CAGR.low);
  const tvlHigh = grow(tvlBase, CAGR.high);

  forecastChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: years,
      datasets: [
        { label: "DeFi TVL (Base, B$)", data: tvlMid, borderWidth: 2, tension: 0.35, pointRadius: 3, borderColor: "#3B82F6", fill: false },
        { label: "AI×DeFi Serviceable (Base, B$)", data: svc(tvlMid, take.base), borderWidth: 2, tension: 0.35, pointRadius: 3, borderColor: "#10B981", backgroundColor: "rgba(16,185,129,0.25)", fill: true },
        { label: "AI×DeFi Serviceable (Low, B$)", data: svc(tvlLow, take.low), borderWidth: 1.5, borderDash: [6,6], tension: 0.35, pointRadius: 2, borderColor: "#F59E0B", fill: false },
        { label: "AI×DeFi Serviceable (High, B$)", data: svc(tvlHigh, take.high), borderWidth: 1.5, borderDash: [6,6], tension: 0.35, pointRadius: 2, borderColor: "#EF4444", fill: false },
      ],
    },
    options: {
      plugins: { legend: { position: "bottom" }, tooltip: { mode: "index", intersect: false } },
      scales: {
        y: { beginAtZero: true, ticks: { callback: (v) => `$${v}B` }, grid: { drawBorder: false } },
        x: { grid: { display: false } },
      },
    },
  });
};

onMounted(() => {
  // In case SSR/hydration or layout transitions delay the canvas sizing:
  requestAnimationFrame(() => {
    mountSectorChart();
    mountForecastChart();
  });
});

onBeforeUnmount(() => {
  if (sectorChart) sectorChart.destroy();
  if (forecastChart) forecastChart.destroy();
});
</script>

<!-- DO NOT set global canvas heights; wrapper handles it -->
<style scoped>
/* no canvas { height: 100% } global rules; the fixed-height wrapper prevents infinite growth */
</style>
