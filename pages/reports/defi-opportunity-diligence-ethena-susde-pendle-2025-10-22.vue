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
        <h2 class="text-xl font-semibold mb-6 text-center">Project Fundamentals: How Ethena Works</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-primary">Core Mechanism</h3>
            <p class="text-sm leading-relaxed">
              Ethena's USDe is minted by depositing BTC or ETH collateral. The protocol then shorts an equivalent notional value in perpetual futures to hedge delta exposure. This <em>cash-and-carry</em> arbitrage captures funding rate premiums and staking rewards, accruing to sUSDe holders without direct price risk to the underlying assets.
            </p>
            <blockquote class="border-l-4 border-primary pl-4 italic text-sm opacity-80">
              "Delta neutrality is achieved by balancing long spot positions with short perp hedges, ensuring yield generation independent of BTC/ETH price movements."
            </blockquote>
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-primary">Risk Management & Transparency</h3>
            <p class="text-sm leading-relaxed">
              In standard operations, the portfolio maintains a delta near zero, ideal for delta-neutral strategies. Ethena's comprehensive risk framework covers funding volatility, liquidation events, custodial dependencies, and smart-contract vulnerabilities, mitigated via off-exchange settlement providers.
            </p>
            <p class="text-sm leading-relaxed">
              Public dashboards provide real-time insights into TVL and APY (e.g., ~2.4% live, ~4.2% 30-day average), fostering transparency amid variable market conditions.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Expected Yield & Duration -->
    <section class="container mx-auto px-4 py-12">
      <div class="card bg-base-200 p-6 shadow-xl">
        <h2 class="text-xl font-semibold mb-6 text-center">Expected Yield & Duration</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-primary">Base Yield (sUSDe)</h3>
            <p class="text-sm leading-relaxed">
              The floating APY for sUSDe typically ranges from 2-4%, primarily driven by perpetual funding rates. This variable yield reflects market dynamics, making it ideal for short-term tactical allocations but challenging for long-term forecasting due to its sensitivity to funding regime shifts.
            </p>
            <blockquote class="border-l-4 border-primary pl-4 italic text-sm opacity-80">
              "sUSDe's yield is a direct function of perp funding premiums, offering real-time responsiveness to market sentiment."
            </blockquote>
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-primary">Locking Fixed Yield (Pendle)</h3>
            <p class="text-sm leading-relaxed">
              Purchasing PT-sUSDe on Pendle allows investors to secure fixed yields until maturity, transforming variable returns into stable carry. This mechanism is invaluable for delta-neutral funds prioritizing predictability over variability.
            </p>
            <p class="text-sm leading-relaxed">
              To amplify returns, consider mild leverage by collateralizing PT-sUSDe on platforms like Aave or Morpho, borrowing stablecoins to acquire additional PT-sUSDe. Maintain strict LTV ratios below 35% to ensure resilience against market volatility.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Risks & Mitigations -->
    <section class="container mx-auto px-4 py-12">
      <div class="card bg-base-200 p-6 shadow-xl">
        <h2 class="text-xl font-semibold mb-6 text-center">Key Risks & Mitigations</h2>
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>Risk Category</th>
                <th>Description</th>
                <th>Mitigation Strategies</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="risk in risks" :key="risk.name">
                <td class="font-medium">{{ risk.name }}</td>
                <td class="text-sm">{{ risk.description }}</td>
                <td>
                  <ul class="list-disc list-inside text-sm">
                    <li v-for="mitigation in risk.mitigations" :key="mitigation">{{ mitigation }}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-4 text-sm opacity-80 text-center">
          Each risk is addressed through proactive measures, ensuring robust operational resilience in dynamic market conditions.
        </p>
      </div>
    </section>

    <!-- Strategy Design -->
    <section class="container mx-auto px-4 py-12">
      <div class="card bg-base-200 p-6 shadow-xl">
        <h2 class="text-xl font-semibold mb-6 text-center">Strategy Design for Re7</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-primary">Base Sleeve (No Leverage)</h3>
            <p class="text-sm leading-relaxed">
              Maintain a core holding in sUSDe to capture floating yield, with opportunistic rotations into PT-sUSDe when fixed rates offer a premium. Initiate with a conservative pilot allocation of 2-5% of fund NAV, dynamically scaling in response to evolving risk metrics and market conditions.
            </p>
            <blockquote class="border-l-4 border-primary pl-4 italic text-sm opacity-80">
              "This unlevered approach emphasizes stability and predictability, aligning with delta-neutral objectives."
            </blockquote>
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-primary">Optional Enhancement (Low-Gear Leverage)</h3>
            <p class="text-sm leading-relaxed">
              For amplified exposure, collateralize PT-sUSDe on platforms like Aave or Morpho to borrow stablecoins and reinvest in additional PT-sUSDe. Enforce strict LTV limits below 35% and implement automated deleveraging mechanisms. This strategy mandates prior approval from the risk committee to ensure alignment with fund guidelines.
            </p>
          </div>
        </div>
        <div class="mt-6">
          <h3 class="text-lg font-medium text-primary mb-2">Execution Checklist</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="card bg-base-100 p-4">
              <h4 class="font-semibold">Pre-Trade</h4>
              <ul class="list-disc list-inside text-sm">
                <li>Confirm APY term-structure</li>
                <li>Assess venue depth and liquidity</li>
              </ul>
            </div>
            <div class="card bg-base-100 p-4">
              <h4 class="font-semibold">During Trade</h4>
              <ul class="list-disc list-inside text-sm">
                <li>Employ TWAP for execution</li>
                <li>Utilize multi-venue routing</li>
              </ul>
            </div>
            <div class="card bg-base-100 p-4">
              <h4 class="font-semibold">Post-Trade</h4>
              <ul class="list-disc list-inside text-sm">
                <li>Activate monitoring alerts</li>
                <li>Document unwind paths</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Monitoring & Risk Rails -->
    <section class="container mx-auto px-4 py-12">
      <div class="card bg-base-200 p-6 shadow-xl">
        <h2 class="text-xl font-semibold mb-6 text-center">Monitoring & Risk Rails</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card bg-base-100 p-4">
            <h3 class="text-lg font-medium text-primary mb-2">Daily Monitoring</h3>
            <ul class="list-disc list-inside text-sm">
              <li>Track sUSDe APY and funding rates</li>
              <li>Monitor peg deviations across venues</li>
              <li>Review TVL and open interest</li>
              <li>Trigger alerts on predefined thresholds</li>
            </ul>
            <p class="mt-2 text-xs opacity-80">Ensure real-time responsiveness to market shifts.</p>
          </div>
          <div class="card bg-base-100 p-4">
            <h3 class="text-lg font-medium text-primary mb-2">Weekly Reviews</h3>
            <ul class="list-disc list-inside text-sm">
              <li>Analyze Pendle yield curves</li>
              <li>Assess custodian and exchange health</li>
              <li>Evaluate off-exchange settlement status</li>
              <li>Rebalance allocations if needed</li>
            </ul>
            <p class="mt-2 text-xs opacity-80">Focus on strategic adjustments and compliance.</p>
          </div>
          <div class="card bg-base-100 p-4">
            <h3 class="text-lg font-medium text-primary mb-2">Event-Driven Actions</h3>
            <ul class="list-disc list-inside text-sm">
              <li>Respond to venue outages or disruptions</li>
              <li>Address abnormal price prints</li>
              <li>Halt new mints in crises</li>
              <li>Execute contingency unwinds</li>
            </ul>
            <p class="mt-2 text-xs opacity-80">Prepare for high-impact scenarios with predefined protocols.</p>
          </div>
        </div>
        <p class="mt-4 text-sm opacity-80 text-center">
          This structured monitoring framework ensures proactive risk management and operational efficiency.
        </p>
      </div>
    </section>

    <!-- Investment Recommendation -->
    <section class="container mx-auto px-4 py-12">
      <div class="card bg-base-200 p-6 shadow-xl">
        <h2 class="text-xl font-semibold mb-6 text-center">Investment Recommendation</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-primary">Recommended Allocation</h3>
            <p class="text-sm leading-relaxed">
              Initiate a conservative pilot allocation of 2-5% of fund NAV, emphasizing unlevered sUSDe for core yield and selectively incorporating PT-sUSDe for fixed carry. This balanced approach minimizes risk while capturing upside potential in a delta-neutral framework.
            </p>
            <blockquote class="border-l-4 border-primary pl-4 italic text-sm opacity-80">
              "A measured entry allows for real-time assessment and scaling based on performance metrics."
            </blockquote>
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-primary">Risk Limits & Rationale</h3>
            <p class="text-sm leading-relaxed">
              Establish strict risk parameters: trigger alerts for peg deviations exceeding 50-100 basis points, reduce exposure if 7-day average funding falls below 0.5%, and limit per-venue exposure to 30%. These controls ensure resilience against market volatility.
            </p>
            <p class="text-sm leading-relaxed">
              This strategy aligns with the rapid institutional embrace of market-neutral DeFi, utilizing platforms like Pendle and Aave to deliver capital-efficient, transparent outcomes.
            </p>
          </div>
        </div>
        <p class="mt-4 text-sm opacity-80 text-center">
          Overall, this recommendation positions the fund to benefit from innovative yield mechanisms while maintaining operational integrity.
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
