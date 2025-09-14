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

    <!-- Charts Section -->
    <section class="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-1 gap-6">
      <div class="card bg-base-100/80 border border-base-300/60 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Forecast: Agent-Managed TVL (B$)</h2>
          <canvas id="tvlForecastChart" height="200"></canvas>
          <p class="text-xs opacity-70 mt-2">
            Autonomous agents are projected to manage up to $100B by 2028.
            <a href="https://www.ainvest.com/news/ai-driven-defi-innovation-token-economics-assessing-mignal-mgl-high-growth-entry-point-2509/?utm_source=chatgpt.com"
               target="_blank"
               class="link link-primary">[Source]</a>
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
        </div>
      </div>
    </section>

    <!-- Conclusion -->
    <section class="container mx-auto px-4 py-8 prose prose-invert">
      <p>
        <b>AI is pushing DeFi into an era of autonomy, transparency, and specialization </b> - 
        evident in token surges, creator-centric ecosystems, privacy frameworks, and
        agent-managed vaults. Yet, credibility remains thin in volatile areas like AI gambling
        and biometric-driven growth. The path forward must balance
        <strong>innovation with verification</strong> - real, auditable metrics,
        privacy-preserving compute, and scalable agent infrastructure.
      </p>
    </section>

  </NuxtLayout>
</template>

<script setup>
import { onMounted } from "vue";
import {
  Chart,
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
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// KPI values with sources
const kpis = [
  { id: 1, title: "AI Sector Surge", value: "+14.38%", tag: "24h", caption: "CryptoRank", source: "https://cryptorank.io/news/feed/2dbd4-live-crypto-news-today-latest-updates-for-sept-9-2025?utm_source=chatgpt.com" },
  { id: 2, title: "Worldcoin Gain", value: "+50%", tag: "24h", caption: "NY Post", source: "https://nypost.com/2025/09/08/business/why-sam-altmans-worldcoin-is-suddenly-skyrocketing/?utm_source=chatgpt.com" },
  { id: 3, title: "Identities Verified", value: "16M", tag: "Worldcoin", caption: "NY Post", source: "https://nypost.com/2025/09/08/business/why-sam-altmans-worldcoin-is-suddenly-skyrocketing/?utm_source=chatgpt.com" },
  { id: 4, title: "Agent-Managed TVL", value: "$100B", tag: "2028", caption: "AInvest", source: "https://www.ainvest.com/news/ai-driven-defi-innovation-token-economics-assessing-mignal-mgl-high-growth-entry-point-2509/?utm_source=chatgpt.com" },
];

// Summary snapshot with sources
const summary = [
  { trend: "AI Token Surge", insight: "+14.38%, Worldcoin ~+50%", source: "https://cryptorank.io/news/feed/2dbd4-live-crypto-news-today-latest-updates-for-sept-9-2025?utm_source=chatgpt.com" },
  { trend: "AI-DeFi Creator Ecosystem", insight: "Blazpay × StarAI partnership", source: "https://blockchainreporter.net/blazpay-and-starai-forge-alliance-to-build-creator-centric-ai-defi-ecosystem/?utm_source=chatgpt.com" },
  { trend: "Trading Transparency", insight: "On-chain AI builds via MAPB", source: "https://www.openpr.com/news/4174314/marlinn-group-elevates-transparency-in-ai-powered-defi-trading?utm_source=chatgpt.com" },
  { trend: "Privacy in AI-DeFi", insight: "iExec TEE-enabled on Arbitrum", source: "https://blockchainreporter.net/iexec-brings-confidential-computing-to-arbitrum-privacy-for-defi-ai-and-gaming/?utm_source=chatgpt.com" },
  { trend: "AI Betting Tools", insight: "Hype rises, performance lags", source: "https://www.wired.com/story/sports-betting-crypto-artificial-intelligence-agents?utm_source=chatgpt.com" },
  { trend: "Identity Tokenization", insight: "Worldcoin: $270M buy, 16M verified", source: "https://nypost.com/2025/09/08/business/why-sam-altmans-worldcoin-is-suddenly-skyrocketing/?utm_source=chatgpt.com" },
  { trend: "Agent-Managed TVL Forecast", insight: "$100B by 2028 (Theoriq)", source: "https://www.ainvest.com/news/ai-driven-defi-innovation-token-economics-assessing-mignal-mgl-high-growth-entry-point-2509/?utm_source=chatgpt.com" },
];

onMounted(() => {
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
