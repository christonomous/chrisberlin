<template>
  <NuxtLayout name="reports">
    <!-- Title / Hero -->
    <section class="container mx-auto px-4 pt-6">
      <div class="flex flex-col gap-4">
        <p class="opacity-80 max-w-3xl">
          AI is reshaping jobs and accelerating retail access to markets. DeFi and tokenized assets provide the rails; AI agents provide accessibility.
        </p>
      </div>
    </section>

    <!-- KPI Cards -->
    <section class="container mx-auto px-4 py-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div v-for="k in kpis" :key="k.title" class="card bg-base-100/80 border border-base-300/60 shadow-lg">
          <div class="card-body">
            <h3 class="card-title text-base">{{ k.title }}</h3>
            <div class="text-2xl font-extrabold">{{ k.value }}</div>
            <p class="text-xs opacity-70">
              <a :href="k.source" target="_blank" class="link link-primary">{{ k.caption }}</a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Workforce: Displacement vs Creation + Layoffs -->
    <section class="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Job Displacement vs. Creation by 2030</h2>
          <div class="relative h-[360px]">
            <canvas ref="jobsChartEl" class="absolute inset-0"></canvas>
          </div>
          <p class="text-xs opacity-70 mt-2">
            Net positive outlook (~78M) as new AI-aligned roles outpace displaced ones.
            <a class="link link-primary" target="_blank" href="https://www.weforum.org/stories/2025/01/future-of-jobs-report-2025-jobs-of-the-future-and-the-skills-you-need-to-get-them">WEF 2025</a>.
          </p>
        </div>
      </div>

      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">2025 U.S. Layoffs Citing AI</h2>
          <div class="relative h-[360px]">
            <canvas ref="layoffsChartEl" class="absolute inset-0"></canvas>
          </div>
          <p class="text-xs opacity-70 mt-2">
            Reported layoffs explicitly linked to AI adoption in 2025 YTD exceed 10,000.
            <a class="link link-primary" target="_blank" href="https://www.cbsnews.com/news/ai-jobs-layoffs-us-2025">CBS News 2025</a>.
          </p>
        </div>
      </div>
    </section>

    <!-- Roles at Risk + Emerging Categories -->
    <section class="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Roles at Risk (Example: Credit Analysts)</h2>
          <div class="relative h-[320px]">
            <canvas ref="riskChartEl" class="absolute inset-0"></canvas>
          </div>
          <p class="text-xs opacity-70 mt-2">
            BLS projects -3.9% change (2023–2033) for credit analysts amid automation.
            <a class="link link-primary" target="_blank" href="https://www.bls.gov/opub/mlr/2025/article/incorporating-ai-impacts-in-bls-employment-projections.htm">BLS 2025</a>.
          </p>
        </div>
      </div>

      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Emerging Job Categories (Signals)</h2>
          <ul class="text-sm space-y-2">
            <li>• AI/ML Specialists, Big-Data Analysts, Fintech Engineers, AI Governance.</li>
            <li>• Firms investing in AI tend to increase headcount overall (technical + junior roles).</li>
          </ul>
          <p class="text-xs opacity-70 mt-2">
            <a class="link link-primary" target="_blank" href="https://www.weforum.org/stories/2025/01/future-of-jobs-report-2025-jobs-of-the-future-and-the-skills-you-need-to-get-them">WEF 2025</a> ·
            <a class="link link-primary" target="_blank" href="https://business.columbia.edu/press-release/cbs-press-releases/increasing-headcount-companies-invest-ai-are-adding-jobs">Columbia Business School 2025</a>
          </p>
        </div>
      </div>
    </section>

    <!-- Retail Investing Trends -->
    <section class="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Early Account Openings (US cohorts)</h2>
          <div class="relative h-[360px]">
            <canvas ref="accountsChartEl" class="absolute inset-0"></canvas>
          </div>
          <p class="text-xs opacity-70 mt-2">
            Share of 25-year-olds who had opened an investment account by 22: 6% (2015) → 37% (2024).
            <a class="link link-primary" target="_blank" href="https://www.jpmorganchase.com/institute/all-topics/financial-health-wealth-creation/a-decade-in-the-market-how-retail-investing-behavior-has-shifted-since-2015">JPMorgan 2024</a>.
          </p>
        </div>
      </div>

      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">New Retail Investors (Europe)</h2>
          <div class="relative h-[360px]">
            <canvas ref="europeChartEl" class="absolute inset-0"></canvas>
          </div>
          <p class="text-xs opacity-70 mt-2">
            +11M new investors since 2022, mostly 25–44 age range.
            <a class="link link-primary" target="_blank" href="https://www.eurofi.net/wp-content/uploads/2025/07/6.6-increasing-retail-investment.pdf">Eurofi 2025</a>.
          </p>
        </div>
      </div>
    </section>

    <!-- Private Capital & Neo-brokers -->
    <section class="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Retail Private Capital Growth to 2030</h2>
          <div class="relative h-[360px]">
            <canvas ref="privateCapitalChartEl" class="absolute inset-0"></canvas>
          </div>
          <p class="text-xs opacity-70 mt-2">
            US: $80B → $2.4T; EU: €924B → €3.3T (projection).
            <a class="link link-primary" target="_blank" href="https://www.deloitte.com/us/en/insights/industry/financial-services/financial-services-industry-predictions/2025/private-capital-investing.html">Deloitte 2025</a>.
          </p>
        </div>
      </div>

      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Neo-Brokers Penetration</h2>
          <div class="relative h-[320px]">
            <canvas ref="neobrokersChartEl" class="absolute inset-0"></canvas>
          </div>
          <p class="text-xs opacity-70 mt-2">
            ~20%+ of US adults have accounts — roughly double EU share.
            <a class="link link-primary" target="_blank" href="https://www.esma.europa.eu/sites/default/files/2024-07/ESMA50-524821-3402_TRV_Article_Neo-brokers_in_the_EU.pdf">ESMA 2024</a>.
          </p>
        </div>
      </div>
    </section>

    <!-- DeFi & Tokenized Assets -->
    <section class="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">DeFi TVL & Stablecoins (2025)</h2>
          <div class="relative h-[360px]">
            <canvas ref="tvlStableChartEl" class="absolute inset-0"></canvas>
          </div>
          <p class="text-xs opacity-70 mt-2">
            TVL ≈ $163B; Stablecoins ≈ $289B.
            <a class="link link-primary" target="_blank" href="https://defillama.com">DefiLlama</a>.
          </p>
        </div>
      </div>

      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Tokenized RWAs (2025 snapshot)</h2>
          <div class="relative h-[360px]">
            <canvas ref="rwaChartEl" class="absolute inset-0"></canvas>
          </div>
          <p class="text-xs opacity-70 mt-2">
            RWAs ≈ $29.4B (390k holders); Treasuries ≈ $7.5B (53k holders).
            <a class="link link-primary" target="_blank" href="https://app.rwa.xyz">RWA.xyz</a>.
          </p>
        </div>
      </div>
    </section>

    <!-- Security + Institutions -->
    <section class="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">DeFi Exploits (2025 YTD)</h2>
          <div class="relative h-[320px]">
            <canvas ref="exploitsChartEl" class="absolute inset-0"></canvas>
          </div>
          <p class="text-xs opacity-70 mt-2">
            >$2B lost to exploits this year — risk mitigation remains the differentiator.
            <a class="link link-primary" target="_blank" href="https://immunefi.com">Immunefi 2025</a>.
          </p>
        </div>
      </div>

      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Institutional Adoption (Signals)</h2>
          <ul class="text-sm space-y-2">
            <li>• Fidelity, BlackRock, BNY Mellon issuing tokenized funds on Ethereum.</li>
            <li>• Focus on RWAs, cash management, and funds distribution rails.</li>
          </ul>
          <p class="text-xs opacity-70 mt-2">
            <a class="link link-primary" target="_blank" href="https://www.coindesk.com/business/2025/05/blackrock-tokenization-market-expands">Industry Reports 2025</a>
          </p>
        </div>
      </div>
    </section>

    <!-- Forecasts (Base/Bull/Bear) -->
    <section class="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Forecast: DeFi TVL to 2030</h2>
          <div class="relative h-[360px]">
            <canvas ref="defiForecastEl" class="absolute inset-0"></canvas>
          </div>
          <p class="text-xs opacity-70 mt-2">
            Base: $350–500B; Bull: $700B+; Bear: &lt;$250B.
            <a class="link link-primary" target="_blank" href="https://defillama.com">DefiLlama</a> ·
            <a class="link link-primary" target="_blank" href="https://www.deloitte.com/us/en/insights/industry/financial-services/financial-services-industry-predictions/2025/private-capital-investing.html">Deloitte</a> ·
            <a class="link link-primary" target="_blank" href="https://immunefi.com">Immunefi</a>.
          </p>
        </div>
      </div>

      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Forecast: RWAs to 2030</h2>
          <div class="relative h-[360px]">
            <canvas ref="rwaForecastEl" class="absolute inset-0"></canvas>
          </div>
          <p class="text-xs opacity-70 mt-2">
            Base: $150–250B; Bull: $300–400B; Bear: $60–100B.
            <a class="link link-primary" target="_blank" href="https://app.rwa.xyz">RWA.xyz</a> ·
            <a class="link link-primary" target="_blank" href="https://www.deloitte.com/us/en/insights/industry/financial-services/financial-services-industry-predictions/2025/private-capital-investing.html">Deloitte</a>.
          </p>
        </div>
      </div>
    </section>

    <!-- Retail AI Agent Adoption -->
    <section class="container mx-auto px-4 py-6">
      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Retail Investors Using AI Agents (>$100 AUM)</h2>
          <div class="relative h-[360px]">
            <canvas ref="agentsChartEl" class="absolute inset-0"></canvas>
          </div>
          <p class="text-xs opacity-70 mt-2">
            Base: 8–15M; Bull: 25–40M; Bear: &lt;5M by 2030.
            <a class="link link-primary" target="_blank" href="https://www.jpmorganchase.com/institute/all-topics/financial-health-wealth-creation/a-decade-in-the-market-how-retail-investing-behavior-has-shifted-since-2015">JPMorgan</a> ·
            <a class="link link-primary" target="_blank" href="https://www.eurofi.net/wp-content/uploads/2025/07/6.6-increasing-retail-investment.pdf">Eurofi</a> ·
            <a class="link link-primary" target="_blank" href="https://www.esma.europa.eu/sites/default/files/2024-07/ESMA50-524821-3402_TRV_Article_Neo-brokers_in_the_EU.pdf">ESMA</a>.
          </p>
        </div>
      </div>
    </section>

    <!-- Implications & Conclusion (short callouts) -->
    <section class="container mx-auto px-4 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Implications</h2>
          <ul class="text-sm space-y-2">
            <li>1) Investor as a default role as employment mixes shift.</li>
            <li>2) AI democratizes sophisticated allocation &amp; hedging.</li>
            <li>3) Risk &amp; explainability beat raw yield in DeFi.</li>
            <li>4) Regulation is the bottleneck for scale.</li>
            <li>5) Community &amp; transparency build trust.</li>
          </ul>
        </div>
      </div>

      <div class="card bg-base-100/80 border border-base-300/60 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Bottom Line</h2>
          <p class="text-sm">
            By 2030, tens of millions may rely on AI agents, RWAs could surpass $200B, and “investor” becomes a common job archetype. Builders who deliver transparent, secure, accessible systems will sit at the core of wealth creation.
          </p>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  Chart,
  BarController, BarElement, CategoryScale, LinearScale,
  LineController, LineElement, PointElement,
  DoughnutController, ArcElement,
  Legend, Tooltip,
} from "chart.js";

Chart.register(
  BarController, BarElement, CategoryScale, LinearScale,
  LineController, LineElement, PointElement,
  DoughnutController, ArcElement,
  Legend, Tooltip
);

// --- Fixed-height + cleanup strategy ---
// 1) Canvas lives in a fixed-height wrapper (Tailwind h-[..]) and is absolutely positioned.
// 2) We set maintainAspectRatio: false and resize: false to prevent height feedback loops.
// 3) Destroy charts on unmount and before re-creating to avoid stacking instances.

const charts = [];
const jobsChartEl = ref(null);
const layoffsChartEl = ref(null);
const riskChartEl = ref(null);
const accountsChartEl = ref(null);
const europeChartEl = ref(null);
const privateCapitalChartEl = ref(null);
const neobrokersChartEl = ref(null);
const tvlStableChartEl = ref(null);
const rwaChartEl = ref(null);
const exploitsChartEl = ref(null);
const defiForecastEl = ref(null);
const rwaForecastEl = ref(null);
const agentsChartEl = ref(null);

const kpis = [
  { title: "Jobs Displaced by 2030", value: "92M", caption: "World Economic Forum", source: "https://www.weforum.org/stories/2025/01/future-of-jobs-report-2025-jobs-of-the-future-and-the-skills-you-need-to-get-them" },
  { title: "New Jobs Created", value: "170M", caption: "World Economic Forum", source: "https://www.weforum.org/stories/2025/01/future-of-jobs-report-2025-jobs-of-the-future-and-the-skills-you-need-to-get-them" },
  { title: "DeFi TVL (2025)", value: "$163B", caption: "DefiLlama", source: "https://defillama.com" },
  { title: "Stablecoins (2025)", value: "$289B", caption: "DefiLlama", source: "https://defillama.com" },
  { title: "Tokenized RWAs (2025)", value: "$29.4B", caption: "RWA.xyz", source: "https://app.rwa.xyz" },
];

function buildChart(el, config) {
  if (!el) return null;
  // If a chart instance is already bound to this canvas, destroy it first.
  // (Some routers/keep-alive can remount without tearing down the canvas element.)
  const prev = Chart.getChart(el);
  if (prev) prev.destroy();

  const chart = new Chart(el, {
    ...config,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      // Prevent container resize feedback loops increasing height
      // (we use fixed Tailwind heights on wrappers)
      resize: false,
      plugins: {
        legend: { labels: { boxWidth: 12 } },
        tooltip: { mode: "index", intersect: false },
      },
      ...config.options,
    },
  });
  charts.push(chart);
  return chart;
}

onMounted(() => {
  // Colors aligned with your theme (tailwind/daisyui in tailwind.config.js)
  const green = "#00ff9d";
  const purple = "#7c3aed";
  const pink = "#ff006e";
  const yellow = "#ffd166";
  const blue = "#3abff8";
  const orange = "#f97316";

  buildChart(jobsChartEl.value, {
    type: "bar",
    data: {
      labels: ["Displaced", "Created"],
      datasets: [{
        label: "Jobs (Millions)",
        data: [92, 170],
        backgroundColor: [pink, green],
        borderWidth: 0,
      }],
    },
    options: { scales: { y: { beginAtZero: true } } },
  });

  buildChart(layoffsChartEl.value, {
    type: "bar",
    data: {
      labels: ["2025 YTD"],
      datasets: [{
        label: "Layoffs citing AI (count)",
        data: [10000],
        backgroundColor: purple,
      }],
    },
    options: { scales: { y: { beginAtZero: true } } },
  });

  buildChart(riskChartEl.value, {
    type: "bar",
    data: {
      labels: ["Credit Analysts"],
      datasets: [{
        label: "Projected Change 2023–2033",
        data: [-3.9],
        backgroundColor: orange,
      }],
    },
    options: {
      scales: {
        y: { beginAtZero: false, suggestedMin: -6, suggestedMax: 2, ticks: { callback: v => `${v}%` } },
      },
    },
  });

  buildChart(accountsChartEl.value, {
    type: "line",
    data: {
      labels: ["2015", "2024"],
      datasets: [{
        label: "Share with account by 22 (25-year-olds)",
        data: [6, 37],
        borderColor: green,
        pointBackgroundColor: green,
        tension: 0.3,
      }],
    },
    options: {
      scales: { y: { beginAtZero: true, ticks: { callback: v => `${v}%` } } },
    },
  });

  buildChart(europeChartEl.value, {
    type: "bar",
    data: {
      labels: ["Europe (since 2022)"],
      datasets: [{
        label: "New Retail Investors",
        data: [11], // in Millions
        backgroundColor: blue,
      }],
    },
    options: { scales: { y: { beginAtZero: true, title: { display: true, text: "Millions" } } } },
  });

  buildChart(privateCapitalChartEl.value, {
    type: "bar",
    data: {
      labels: ["US", "EU"],
      datasets: [
        { label: "2025/Now", data: [80, 924], backgroundColor: pink, stack: "a" },
        { label: "2030 (Proj.)", data: [2400, 3300], backgroundColor: green, stack: "a" },
      ],
    },
    options: {
      scales: {
        y: { beginAtZero: true, title: { display: true, text: "Billions (US$ / €)" } },
      },
    },
  });

  buildChart(neobrokersChartEl.value, {
    type: "bar",
    data: {
      labels: ["US Adults", "EU Adults"],
      datasets: [{
        label: "Have Neo-broker Accounts",
        data: [20, 10], // rough ratio from the report (US ~double EU)
        backgroundColor: [green, purple],
      }],
    },
    options: {
      scales: { y: { beginAtZero: true, ticks: { callback: v => `${v}%` } } },
    },
  });

  buildChart(tvlStableChartEl.value, {
    type: "doughnut",
    data: {
      labels: ["DeFi TVL ($163B)", "Stablecoins ($289B)"],
      datasets: [{
        data: [163, 289],
        backgroundColor: [purple, green],
      }],
    },
  });

  buildChart(rwaChartEl.value, {
    type: "bar",
    data: {
      labels: ["RWAs Total", "Treasuries"],
      datasets: [{
        label: "Value (Billions USD)",
        data: [29.4, 7.5],
        backgroundColor: [blue, yellow],
      }],
    },
    options: { scales: { y: { beginAtZero: true } } },
  });

  buildChart(exploitsChartEl.value, {
    type: "bar",
    data: {
      labels: ["2025 YTD"],
      datasets: [{
        label: "DeFi Losses (Billions USD)",
        data: [2.0],
        backgroundColor: pink,
      }],
    },
    options: { scales: { y: { beginAtZero: true } } },
  });

  // Forecasts
  buildChart(defiForecastEl.value, {
    type: "line",
    data: {
      labels: ["2025", "2026", "2027", "2028", "2029", "2030"],
      datasets: [
        { label: "Base", data: [163, 220, 280, 350, 420, 500], borderColor: green, pointBackgroundColor: green, tension: 0.3 },
        { label: "Bull", data: [163, 250, 350, 480, 600, 720], borderColor: purple, pointBackgroundColor: purple, tension: 0.3 },
        { label: "Bear", data: [163, 180, 200, 220, 240, 250], borderColor: pink, pointBackgroundColor: pink, tension: 0.3 },
      ],
    },
  });

  buildChart(rwaForecastEl.value, {
    type: "line",
    data: {
      labels: ["2025", "2026", "2027", "2028", "2029", "2030"],
      datasets: [
        { label: "Base", data: [29.4, 60, 90, 130, 190, 230], borderColor: blue, pointBackgroundColor: blue, tension: 0.3 },
        { label: "Bull", data: [29.4, 80, 140, 220, 300, 380], borderColor: green, pointBackgroundColor: green, tension: 0.3 },
        { label: "Bear", data: [29.4, 40, 55, 70, 85, 95], borderColor: orange, pointBackgroundColor: orange, tension: 0.3 },
      ],
    },
  });

  buildChart(agentsChartEl.value, {
    type: "bar",
    data: {
      labels: ["Base", "Bull", "Bear"],
      datasets: [{
        label: "AI Agent Users (Millions)",
        data: [11.5, 32.5, 4], // midpoints
        backgroundColor: [green, purple, pink],
      }],
    },
    options: {
      scales: {
        y: { beginAtZero: true, title: { display: true, text: "Millions of users" } },
      },
    },
  });
});

onBeforeUnmount(() => {
  charts.forEach(c => { try { c.destroy(); } catch {} });
});
</script>
