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
                <p class="text-xs opacity-70" v-if="k.caption">{{ k.caption }}</p>
              </div>
              <div class="badge badge-secondary badge-outline">{{ k.tag }}</div>
            </div>
            <p class="text-2xl font-bold mt-2">{{ k.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Charts Section -->
    <section class="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-1 gap-6">
      <div class="card bg-base-100/80 border border-base-300/60 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Forecast: Agent-Managed TVL (B$)</h2>
          <canvas id="tvlForecastChart" height="200"></canvas>
          <p class="text-xs opacity-70 mt-2">
            Autonomous agents are projected to manage up to $100B by 2028.
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
                <td>{{ row.insight }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Conclusion -->
    <section class="container mx-auto px-4 py-8 prose prose-invert">
      <p>
        <b>AI is pushing DeFi into an era of autonomy, transparency, and specialization </b>—
        evident in token surges, creator-centric ecosystems, privacy frameworks, and
        agent-managed vaults. Yet, credibility remains thin in volatile areas like AI gambling
        and biometric-driven growth. The path forward must balance
        <strong>innovation with verification</strong>—real, auditable metrics,
        privacy-preserving compute, and scalable agent infrastructure.
      </p>
    </section>

  </NuxtLayout>
</template>

<script setup>
import { onMounted } from "vue";
import {
  Chart,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// KPI values
const kpis = [
  { id: 1, title: "AI Sector Surge", value: "+14.38%", tag: "24h", caption: "CryptoRank" },
  { id: 2, title: "Worldcoin Gain", value: "+50%", tag: "24h", caption: "NY Post" },
  { id: 3, title: "Identities Verified", value: "16M", tag: "Worldcoin", caption: "Target 100M" },
  { id: 4, title: "Agent-Managed TVL", value: "$100B", tag: "2028", caption: "Theoriq" },
];

// Summary snapshot
const summary = [
  { trend: "AI Token Surge", insight: "+14.38%, Worldcoin ~+50%" },
  { trend: "AI-DeFi Creator Ecosystem", insight: "Blazpay × StarAI partnership" },
  { trend: "Trading Transparency", insight: "On-chain AI builds via MAPB" },
  { trend: "Privacy in AI-DeFi", insight: "iExec TEE-enabled on Arbitrum" },
  { trend: "AI Betting Tools", insight: "Hype rises, performance lags" },
  { trend: "Identity Tokenization", insight: "Worldcoin: $270M buy, 16M verified" },
  { trend: "Agent-Managed TVL Forecast", insight: "$100B by 2028 (Theoriq)" },
];

onMounted(() => {
  // AI Token Surge chart
  new Chart(document.getElementById("aiTokensChart"), {
    type: "bar",
    data: {
      labels: ["AI Sector", "Worldcoin"],
      datasets: [
        {
          label: "24h Gain (%)",
          data: [14.38, 50],
          backgroundColor: ["#7c3aed", "#00ff9d"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
    },
  });

  // Forecast chart
  new Chart(document.getElementById("tvlForecastChart"), {
    type: "line",
    data: {
      labels: ["2025", "2026", "2027", "2028"],
      datasets: [
        {
          label: "Agent-Managed TVL ($B)",
          data: [5, 20, 45, 100],
          borderColor: "#ff006e",
          backgroundColor: "rgba(255,0,110,0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } },
      scales: { y: { beginAtZero: true } },
    },
  });
});
</script>
