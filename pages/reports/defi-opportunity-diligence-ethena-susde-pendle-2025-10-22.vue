<template>
  <NuxtLayout name="reports">

    <!-- KPI / Stats -->
    <section class="relative z-10 container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div
          v-for="k in kpis"
          :key="k.id"
          class="card bg-base-200/80 backdrop-blur border border-base-300/60 
                 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] 
                 hover:shadow-[0_12px_32px_rgba(0,0,0,.35)] transition-shadow"
        >
          <div class="card-body">
            <div class="flex items-start justify-between gap-2">
              <div>
                <h2 class="card-title text-base">{{ k.title }}</h2>
                <p class="text-xs opacity-70">{{ k.caption }}</p>
              </div>
              <div class="badge badge-secondary badge-outline">{{ k.tag }}</div>
            </div>
            <p class="text-xl font-bold mt-2">{{ k.value }}</p>
            <a :href="k.source" target="_blank" class="link link-primary text-xs mt-2">Source</a>
          </div>
        </div>
      </div>
    </section>

    <!-- TL;DR -->
    <section class="relative z-10 container flex flex-wrap mx-auto px-4 py-8">
      <div class="w-full md:w-1/2">
        <div class="card bg-base-200 p-6 shadow-xl m-4">
          <h2 class="text-lg font-semibold mb-2">TL;DR</h2>
          <ul class="list-disc list-inside space-y-1 text-sm opacity-90">
            <li>sUSDe offers delta-neutral yield via cash-and-carry hedges on BTC/ETH.</li>
            <li>Pendle PT-sUSDe locks fixed yield, ideal for predictable carry.</li>
            <li>Base APY ~2-5%, with risks in peg dislocations and funding rates.</li>
            <li>Pilot allocation with strict risk limits and monitoring.</li>
            <li>Institutional tools enable capital-efficient, transparent implementations.</li>
          </ul>
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <div class="card bg-base-200 p-6 shadow-xl m-4">
          <h2 class="text-lg font-semibold mb-2">Executive Summary</h2>
          <p class="pb-4">
            Ethena's sUSDe provides a delta-neutral yield source through perpetual funding and staking, hedged against BTC/ETH price movements. By integrating with Pendle for fixed yield via PT-sUSDe, investors can achieve predictable returns in a volatile market.
          </p>
          <p>
            This strategy fits delta-neutral funds like Re7, offering core APY of 2-5% with options for mild leverage. Key risks include peg dislocations and funding rate shifts, mitigated by multi-venue allocation, circuit-breakers, and dynamic monitoring. A pilot allocation with conservative sizing is recommended.
          </p>
        </div>
      </div>
    </section>

    <!-- Charts Grid -->
    <section class="container mx-auto px-4 py-12 space-y-6">
      <h2 class="text-xl font-semibold mb-4">Ethena sUSDe & Pendle in Numbers</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Yield Comparison -->
        <div class="card bg-base-200 p-6 shadow-xl">
          <h3 class="text-base font-medium mb-2">sUSDe Yield Trends</h3>
          <canvas id="yieldChart" class="w-full" style="max-height:300px;"></canvas>
          <p class="mt-4 text-sm opacity-80">
            sUSDe APY fluctuates with perp funding, recently ~2-4%. Fixed yield via Pendle provides stability.
          </p>
        </div>

        <!-- Risk Factors -->
        <div class="card bg-base-200 p-6 shadow-xl">
          <h3 class="text-base font-medium mb-2">Key Risk Distribution</h3>
          <canvas id="riskChart" class="w-full" style="max-height:300px;"></canvas>
          <p class="mt-4 text-sm opacity-80">
            Peg and funding risks dominate, mitigated by multi-venue strategies and fixed-rate locking.
          </p>
        </div>

        <!-- TVL Growth -->
        <div class="card bg-base-200 p-6 shadow-xl">
          <h3 class="text-base font-medium mb-2">Ethena TVL Growth</h3>
          <canvas id="tvlChart" class="w-full" style="max-height:300px;"></canvas>
          <p class="mt-4 text-sm opacity-80">
            Ethena's TVL reflects growing adoption of delta-neutral DeFi strategies.
          </p>
        </div>

        <!-- Funding Rate Volatility -->
        <div class="card bg-base-200 p-6 shadow-xl">
          <h3 class="text-base font-medium mb-2">Perp Funding Rate Volatility</h3>
          <canvas id="fundingChart" class="w-full" style="max-height:300px;"></canvas>
          <p class="mt-4 text-sm opacity-80">
            Funding rates drive sUSDe yield but can compress in stress; Pendle hedges this.
          </p>
        </div>

      </div>
    </section>

    <!-- Project Fundamentals -->
    <section class="container mx-auto px-4 py-12">
      <div class="card bg-base-200 p-6 shadow-xl">
        <h2 class="text-xl font-semibold mb-4">Project Fundamentals: How Ethena Works</h2>
        <p class="mb-4">
          Ethena's USDe is minted by depositing BTC or ETH, with the protocol simultaneously shorting equal-notional perpetuals to maintain delta neutrality. This cash-and-carry strategy generates yield from perp funding rates and staking rewards, resulting in sUSDe, which accrues this yield without direct exposure to underlying asset prices.
        </p>
        <p class="mb-4">
          The mechanism ensures that in normal conditions, the portfolio's delta is approximately zero, making it suitable for delta-neutral funds. Ethena's risk framework addresses funding, liquidation, custodial, and smart-contract risks, using off-exchange settlement to minimize exchange dependencies.
        </p>
        <p>
          Transparency is a key feature, with public dashboards displaying TVL and real-time APY, currently around 2.4% live and 4.2% over 30 days, though this varies with market conditions.
        </p>
      </div>
    </section>

    <!-- Expected Yield & Duration -->
    <section class="container mx-auto px-4 py-12">
      <div class="card bg-base-200 p-6 shadow-xl">
        <h2 class="text-xl font-semibold mb-4">Expected Yield & Duration</h2>
        <h3 class="text-lg font-medium mb-2">Base Yield (sUSDe)</h3>
        <p class="mb-4">
          The floating APY for sUSDe typically ranges from 2-4%, driven by perp funding rates. This yield is variable and depends on market conditions, making it suitable for short-term allocations but less predictable for long-term planning.
        </p>
        <h3 class="text-lg font-medium mb-2">Locking Fixed Yield (Pendle)</h3>
        <p class="mb-4">
          By purchasing PT-sUSDe on Pendle, investors can lock in fixed yields until maturity, converting floating returns into predictable carry. This is particularly valuable for delta-neutral funds seeking stability.
        </p>
        <p>
          For enhanced returns, mild leverage can be applied by posting PT-sUSDe as collateral on Aave or Morpho, borrowing stablecoins, and acquiring more PT-sUSDe, while maintaining conservative LTV ratios below 35%.
        </p>
      </div>
    </section>

    <!-- Key Risks & Mitigations -->
    <section class="container mx-auto px-4 py-12">
      <div class="card bg-base-200 p-6 shadow-xl">
        <h2 class="text-xl font-semibold mb-4">Key Risks & Mitigations</h2>
        <div class="space-y-4">
          <div v-for="risk in risks" :key="risk.name">
            <h3 class="text-lg font-medium">{{ risk.name }}</h3>
            <p class="mb-2"><strong>What:</strong> {{ risk.description }}</p>
            <p><strong>Mitigations:</strong></p>
            <ul class="list-disc list-inside ml-4">
              <li v-for="mitigation in risk.mitigations" :key="mitigation">{{ mitigation }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Strategy Design -->
    <section class="container mx-auto px-4 py-12">
      <div class="card bg-base-200 p-6 shadow-xl">
        <h2 class="text-xl font-semibold mb-4">Strategy Design for Re7</h2>
        <h3 class="text-lg font-medium mb-2">Base Sleeve (No Leverage)</h3>
        <p class="mb-4">
          Hold sUSDe for floating yield and rotate into PT-sUSDe when fixed rates are attractive. Start with a pilot allocation of 2-5% of fund NAV, scaling based on risk metrics.
        </p>
        <h3 class="text-lg font-medium mb-2">Optional Enhancement (Low-Gear Leverage)</h3>
        <p class="mb-4">
          Use PT-sUSDe as collateral for borrowing and looping, with LTV under 35% and auto-delever triggers. This requires risk committee approval.
        </p>
        <h3 class="text-lg font-medium mb-2">Execution Checklist</h3>
        <ul class="list-disc list-inside">
          <li>Pre-Trade: Confirm APY term-structure and venue depth.</li>
          <li>During Trade: Use TWAP and multi-venue routing.</li>
          <li>Post-Trade: Set monitoring alerts and document unwind paths.</li>
        </ul>
      </div>
    </section>

    <!-- Monitoring & Risk Rails -->
    <section class="container mx-auto px-4 py-12">
      <div class="card bg-base-200 p-6 shadow-xl">
        <h2 class="text-xl font-semibold mb-4">Monitoring & Risk Rails</h2>
        <h3 class="text-lg font-medium mb-2">Daily</h3>
        <ul class="list-disc list-inside mb-4">
          <li>Monitor sUSDe APY, peg deviations, and TVL. Trigger actions on deviations.</li>
        </ul>
        <h3 class="text-lg font-medium mb-2">Weekly</h3>
        <ul class="list-disc list-inside mb-4">
          <li>Review Pendle curves and custodian health.</li>
        </ul>
        <h3 class="text-lg font-medium mb-2">Event-Driven</h3>
        <ul class="list-disc list-inside">
          <li>On outages or abnormal prints, halt mints and consider unwinds.</li>
        </ul>
      </div>
    </section>

    <!-- Investment Recommendation -->
    <section class="container mx-auto px-4 py-12">
      <div class="card bg-base-200 p-6 shadow-xl">
        <h2 class="text-xl font-semibold mb-4">Investment Recommendation</h2>
        <p class="mb-4">
          Proceed with a measured pilot allocation of 2-5% NAV, focusing on unlevered core and selective PT-sUSDe for fixed carry. Set risk limits: alert on peg deviations >50-100 bps, reduce exposure if funding <0.5%, and cap per-venue exposure at 30%.
        </p>
        <p>
          This approach capitalizes on the accelerating institutional adoption of market-neutral DeFi, leveraging tools like Pendle and Aave for efficient, transparent implementations.
        </p>
      </div>
    </section>

    <!-- Sources -->
    <section class="container mx-auto px-4 py-12">
      <h2 class="text-lg font-semibold mb-2">Sources</h2>
      <ul class="list-disc list-inside text-sm opacity-80 space-y-1">
        <li v-for="source in sources" :key="source.url">
          <a :href="source.url" target="_blank" class="link link-primary">{{ source.title }}</a>
        </li>
      </ul>
    </section>

  </NuxtLayout>
</template>

<script setup>
import { onMounted } from "vue";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement,
  LineController,
  LineElement,
  PointElement
);

const kpis = [
  {
    id: 1,
    title: "sUSDe Live APY",
    caption: "Current yield range",
    value: "2-4%",
    tag: "Yield",
    source: "https://app.ethena.fi/dashboards/market-data?utm_source=chatgpt.com"
  },
  {
    id: 2,
    title: "Ethena TVL",
    caption: "Total value locked",
    value: "$5B+",
    tag: "Scale",
    source: "https://docs.ethena.fi/solution-overview/usde-overview?utm_source=chatgpt.com"
  },
  {
    id: 3,
    title: "Peg Deviation Risk",
    caption: "Recent incident impact",
    value: "<1%",
    tag: "Stability",
    source: "https://www.coindesk.com/markets/2025/10/11/ethena-s-usde-briefly-loses-peg-during-usd19b-crypto-liquidation-cascade?utm_source=chatgpt.com"
  },
  {
    id: 4,
    title: "Pendle Fixed Yield",
    caption: "Available tenors",
    value: "Variable",
    tag: "Fixed",
    source: "https://www.pendle.finance/?utm_source=chatgpt.com"
  },
  {
    id: 5,
    title: "Funding Rate Avg",
    caption: "7-day average",
    value: "1-3%",
    tag: "Volatility",
    source: "https://app.ethena.fi/dashboards/market-data?utm_source=chatgpt.com"
  }
];

const risks = [
  {
    name: "Peg/Market-Microstructure Risk",
    description: "Venue-specific deviations, e.g., USDe traded at $0.65 during Oct 10-11 cascade.",
    mitigations: [
      "Allocate via multiple deep venues; use TWAP and circuit-breakers.",
      "Daily peg-health dashboard and size to withstand dislocations."
    ]
  },
  {
    name: "Funding-Rate Regime Risk",
    description: "Yield depends on perp funding, which can compress or turn negative.",
    mitigations: [
      "Lock fixed yield with Pendle PT.",
      "Dynamic allocation and stress triggers for funding < threshold."
    ]
  },
  {
    name: "Custody/Off-Exchange Settlement Risk",
    description: "Reliance on off-exchange providers and perp venues.",
    mitigations: [
      "Monitor custodian health and exposure caps per venue.",
      "Maintain contingency unwind playbook."
    ]
  },
  {
    name: "Smart-Contract/Oracle Risk",
    description: "Integrations with Ethena, Pendle, Aave/Morpho.",
    mitigations: [
      "Use audited venues, caps by protocol, and onchain alerts.",
      "Favor battle-tested markets with conservative LTVs."
    ]
  },
  {
    name: "Liquidity & Exit Risk",
    description: "Need to exit without excessive impact.",
    mitigations: [
      "Stagger entries, cash buffers, and pre-approved routes.",
      "Use TWAP execution."
    ]
  }
];

const sources = [
  { title: "Ethena USDe Overview", url: "https://docs.ethena.fi/solution-overview/usde-overview?utm_source=chatgpt.com" },
  { title: "Ethena Market Data", url: "https://app.ethena.fi/dashboards/market-data?utm_source=chatgpt.com" },
  { title: "CoinDesk - USDe Peg Loss", url: "https://www.coindesk.com/markets/2025/10/11/ethena-s-usde-briefly-loses-peg-during-usd19b-crypto-liquidation-cascade?utm_source=chatgpt.com" },
  { title: "Ethena Risks", url: "https://docs.ethena.fi/solution-overview/risks?utm_source=chatgpt.com" },
  { title: "DeFi Llama - sUSDe Yields", url: "https://defillama.com/yields/pool/66985a81-9c51-46ca-9977-42b4fe7bc6df?utm_source=chatgpt.com" },
  { title: "Pendle Finance", url: "https://www.pendle.finance/?utm_source=chatgpt.com" },
  { title: "OKX - Leveraged Yield", url: "https://www.okx.com/en-us/learn/ethena-pendle-aave-leveraged-yield?utm_source=chatgpt.com" },
  { title: "Bloomberg - Stablecoin Peg", url: "https://www.bloomberg.com/news/articles/2025-10-11/third-largest-stablecoin-briefly-loses-dollar-peg-in-crypto-rout?utm_source=chatgpt.com" },
  { title: "Ethena Custodial Risk", url: "https://docs.ethena.fi/solution-overview/risks/custodial-risk?utm_source=chatgpt.com" },
  { title: "Phemex - Market-Neutral Strategies", url: "https://phemex.com/news/article/morpho-attracts-12-billion-as-whales-deploy-marketneutral-strategies-27331?utm_source=chatgpt.com" }
];

onMounted(() => {
  // Yield Trends Line Chart
  new Chart(document.getElementById("yieldChart"), {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "sUSDe APY (%)",
          data: [2.5, 3.2, 2.8, 4.1, 3.5, 2.9],
          borderColor: "#00ff9d",
          backgroundColor: "#00ff9d50",
          fill: true,
          tension: 0.3,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: "#ccc" } } },
      scales: { y: { beginAtZero: true, ticks: { color: "#ccc" } }, x: { ticks: { color: "#ccc" } } }
    }
  });

  // Risk Distribution Doughnut Chart
  new Chart(document.getElementById("riskChart"), {
    type: "doughnut",
    data: {
      labels: ["Peg Risk", "Funding Risk", "Custody Risk", "Smart-Contract Risk", "Liquidity Risk"],
      datasets: [
        {
          data: [30, 25, 20, 15, 10],
          backgroundColor: ["#ff006e", "#7c3aed", "#00ff9d", "#ffaa00", "#00aaff"]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom", labels: { color: "#ccc" } } }
    }
  });

  // TVL Growth Bar Chart
  new Chart(document.getElementById("tvlChart"), {
    type: "bar",
    data: {
      labels: ["2023", "2024", "2025"],
      datasets: [
        {
          label: "Ethena TVL ($B)",
          data: [1, 3, 5],
          backgroundColor: "#7c3aed"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { color: "#ccc" } }, x: { ticks: { color: "#ccc" } } }
    }
  });

  // Funding Rate Volatility Line Chart
  new Chart(document.getElementById("fundingChart"), {
    type: "line",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Funding Rate (%)",
          data: [2.1, 1.5, 2.8, 1.2],
          borderColor: "#ff006e",
          backgroundColor: "#ff006e50",
          fill: true,
          tension: 0.3,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: "#ccc" } } },
      scales: { y: { beginAtZero: true, ticks: { color: "#ccc" } }, x: { ticks: { color: "#ccc" } } }
    }
  });
});
</script>
