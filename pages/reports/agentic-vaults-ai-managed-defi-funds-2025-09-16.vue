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
            <li>Agentic Vaults = DeFi investment funds managed by AI.</li>
            <li>AI already outperforms humans in complex, data-driven decision-making.</li>
            <li>Institutions are scaling crypto adoption ($65B ETF AUM, BlackRock $100B holdings).</li>
            <li>Transparency, 24/7 monitoring, and efficiency make AI funds inevitable.</li>
            <li>Risks exist, but adoption reduces volatility and regulation follows utility.</li>
          </ul>
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <div class="card bg-base-200 p-6 shadow-xl m-4">
          <h2 class="text-lg font-semibold mb-2">Executive Summery</h2>
          <p class="pb-4">
            The convergence of artificial intelligence and decentralized finance is not a distant theory - it’s already happening. AI has proven its ability to optimize decision-making in complex systems, and finance is perhaps the most fertile ground for this transformation.
          </p>
          <p>
            At the same time, DeFi is moving beyond its volatile early phase. With institutions like BlackRock, JPMorgan, and even national governments stepping in, crypto is maturing into a regulated and globally recognized asset class. Agentic Vaults - AI-managed DeFi funds - stand right at this intersection. They promise efficiency, transparency, and scalability beyond what traditional funds can achieve.
          </p>
        </div>
      </div>
    </section>

    <!-- Charts Grid -->
    <section class="container mx-auto px-4 py-12 space-y-6">
      <h2 class="text-xl font-semibold mb-4">AI × DeFi in Numbers</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Productivity -->
        <div class="card bg-base-200 p-6 shadow-xl">
          <h3 class="text-base font-medium mb-2">AI Productivity Boost Across Sectors</h3>
          <canvas id="productivityChart" class="w-full" style="max-height:300px;"></canvas>
          <p class="mt-4 text-sm opacity-80">
            AI-heavy industries grow productivity at ~4.3% vs ~0.9% in traditional ones - 
            a strong signal for finance.
          </p>
        </div>

        <!-- Institutional -->
        <div class="card bg-base-200 p-6 shadow-xl">
          <h3 class="text-base font-medium mb-2">Institutional Crypto Adoption</h3>
          <canvas id="institutionalChart" class="w-full" style="max-height:300px;"></canvas>
          <p class="mt-4 text-sm opacity-80">
            71% of institutions already invest in digital assets.  
            Legitimacy fuels stability and sets the stage for Agentic Vaults.
          </p>
        </div>

        <!-- ETF Growth -->
        <div class="card bg-base-200 p-6 shadow-xl">
          <h3 class="text-base font-medium mb-2">Crypto ETFs: Growing AUM</h3>
          <canvas id="etfChart" class="w-full" style="max-height:300px;"></canvas>
          <p class="mt-4 text-sm opacity-80">
            From near-zero to $65B AUM, ETFs prove institutional demand is accelerating.
          </p>
        </div>

        <!-- Retail Adoption -->
        <div class="card bg-base-200 p-6 shadow-xl">
          <h3 class="text-base font-medium mb-2">Retail Crypto Adoption</h3>
          <canvas id="retailChart" class="w-full" style="max-height:300px;"></canvas>
          <p class="mt-4 text-sm opacity-80">
            ~13% of internet users already own crypto,  
            showing broadening grassroots participation.
          </p>
        </div>

      </div>
    </section>

    <!-- Objections & Responses -->
    <section class="container card bg-base-200 mx-auto px-4 py-12">
      <h2 class="text-xl font-semibold mb-4">Common Objections & Responses</h2>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Objection</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="o in objections" :key="o.obj">
              <td class="font-medium">{{ o.obj }}</td>
              <td>{{ o.resp }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Conclusion -->
    <section class="container mx-auto px-4 py-12">
      <div class="card bg-base-200 p-6 shadow-xl">
        <h2 class="text-xl font-semibold mb-2">Conclusion</h2>
        <ul class="list-disc list-inside space-y-1 text-sm opacity-90">
          <li>Agentic Vaults combine AI efficiency with DeFi transparency and scale.</li>
          <li>Institutional adoption and ETFs are stabilizing crypto markets.</li>
          <li>Retail adoption ensures legitimacy and future demand.</li>
          <li>Early adopters of AI-managed DeFi funds will capture outsized advantages.</li>
        </ul>
      </div>
    </section>

    <!-- Sources -->
    <section class="container mx-auto px-4 py-12">
      <h2 class="text-lg font-semibold mb-2">Sources</h2>
      <ul class="list-disc list-inside text-sm opacity-80 space-y-1">
        <li><a href="https://www.workday.com/en-us/perspectives/artificial-intelligence/2025/08/5-industries-where-ai-is-having-an-impact-today.html?utm_source=chatgpt.com" target="_blank" class="link link-primary">Workday - AI in Industries</a></li>
        <li><a href="https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier?utm_source=chatgpt.com" target="_blank" class="link link-primary">McKinsey - Economic Potential of Generative AI</a></li>
        <li><a href="https://www.reuters.com/technology/ai-intensive-sectors-are-showing-productivity-surge-pwc-says-2024-05-20/?utm_source=chatgpt.com" target="_blank" class="link link-primary">Reuters - AI Productivity Surge</a></li>
        <li><a href="https://arxiv.org/abs/2410.12944?utm_source=chatgpt.com" target="_blank" class="link link-primary">arXiv - AI & Developer Speed</a></li>
        <li><a href="https://www.ainvest.com/news/institutional-investment-crypto-assets-reshaping-liquidity-market-structure-2025-2509/?utm_source=chatgpt.com" target="_blank" class="link link-primary">AInvest - Institutional Crypto ETFs</a></li>
        <li><a href="https://coinlaw.io/cryptocurrency-adoption-by-institutional-investors-statistics/?utm_source=chatgpt.com" target="_blank" class="link link-primary">CoinLaw - Institutional & Retail Adoption</a></li>
        <li><a href="https://www.coindesk.com/business/2025/06/04/jpmorgan-to-accept-bitcoin-etfs-as-loan-collateral-in-expansion-of-crypto-access-bloomberg?utm_source=chatgpt.com" target="_blank" class="link link-primary">CoinDesk - JPMorgan ETF Collateral</a></li>
        <li><a href="https://economictimes.indiatimes.com/markets/cryptocurrency/crypto-news/blackrocks-crypto-holdings-top-100-billion-bitcoin-dominates-portfolio/articleshow/123305083.cms?utm_source=chatgpt.com" target="_blank" class="link link-primary">Economic Times - BlackRock Crypto Holdings</a></li>
        <li><a href="https://www.venasolutions.com/blog/ai-statistics?utm_source=chatgpt.com" target="_blank" class="link link-primary">Vena Solutions - AI in Finance Stats</a></li>
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
    title: "Generative AI Potential",
    caption: "Annual economic value",
    value: "$2.6-4.4T",
    tag: "AI",
    source: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier?utm_source=chatgpt.com"
  },
  {
    id: 2,
    title: "Crypto ETF AUM",
    caption: "as of April 2025",
    value: "$65B",
    tag: "DeFi",
    source: "https://www.ainvest.com/news/institutional-investment-crypto-assets-reshaping-liquidity-market-structure-2025-2509/?utm_source=chatgpt.com"
  },
  {
    id: 3,
    title: "Institutions in Digital Assets",
    caption: "already invested",
    value: "71%",
    tag: "Adoption",
    source: "https://coinlaw.io/cryptocurrency-adoption-by-institutional-investors-statistics/?utm_source=chatgpt.com"
  },
  {
    id: 4,
    title: "BlackRock Crypto Holdings",
    caption: "2025",
    value: "$100B+",
    tag: "Institutions",
    source: "https://economictimes.indiatimes.com/markets/cryptocurrency/crypto-news/blackrocks-crypto-holdings-top-100-billion-bitcoin-dominates-portfolio/articleshow/123305083.cms?utm_source=chatgpt.com"
  },
  {
    id: 5,
    title: "Retail Adoption",
    caption: "global internet users owning crypto",
    value: "13%",
    tag: "Retail",
    source: "https://coinlaw.io/cryptocurrency-adoption-by-institutional-investors-statistics/?utm_source=chatgpt.com"
  }
];

const objections = [
  {
    obj: "AI is still risky / opaque / can make mistakes",
    resp: "Human managers also make mistakes. AI models improve, get audited, and can operate in hybrid setups with oversight."
  },
  {
    obj: "Crypto / DeFi volatility and regulatory uncertainty",
    resp: "Volatility tends to decrease with adoption. Regulation follows utility, and institutional demand drives frameworks."
  },
  {
    obj: "Lack of trust / fear of 'black boxes'",
    resp: "Transparency, audits, and performance records will build trust, similar to how traditional opaque funds gained legitimacy."
  }
];

onMounted(() => {
  // Productivity bar chart
  new Chart(document.getElementById("productivityChart"), {
    type: "bar",
    data: {
      labels: ["AI-Intensive Sectors", "Traditional Sectors"],
      datasets: [
        {
          label: "Productivity Growth (2018-2022)",
          data: [4.3, 0.9],
          backgroundColor: ["#00ff9d", "#ff006e"]
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

  // Institutional adoption doughnut chart
  new Chart(document.getElementById("institutionalChart"), {
    type: "doughnut",
    data: {
      labels: ["Invested", "Not Invested"],
      datasets: [
        {
          data: [71, 29],
          backgroundColor: ["#7c3aed", "#0c0c0d"],
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom", labels: { color: "#ccc" } } }
    }
  });

  // ETF AUM line chart
  new Chart(document.getElementById("etfChart"), {
    type: "line",
    data: {
      labels: ["2021", "2022", "2023", "2024", "2025"],
      datasets: [
        {
          label: "Crypto ETF AUM ($B)",
          data: [2, 15, 32, 48, 65],
          borderColor: "#ff006e",
          backgroundColor: "#ff006e50",
          fill: true,
          tension: 0.3,
          pointRadius: 4,
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

  // Retail adoption bar chart
  new Chart(document.getElementById("retailChart"), {
    type: "bar",
    data: {
      labels: ["Crypto Ownership", "Non-Owners"],
      datasets: [
        {
          label: "Global Internet Users",
          data: [13, 87],
          backgroundColor: ["#00ff9d", "#7c3aed"]
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
});
</script>
