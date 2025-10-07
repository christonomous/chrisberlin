<template>
  <section id="offer" class="container mx-auto max-w-6xl px-4">
    <div class="card bg-base-200/50 shadow-xl border border-base-300/30">
      <div class="card-body grid md:grid-cols-3 gap-6">
        <div>
          <h2 class="text-2xl font-bold mb-2">About Me</h2>
          <p class="opacity-80">I help crypto businesses implement AI to unlock new value and outperform competitors.</p>
        </div>
        <ul class="md:col-span-2 grid sm:grid-cols-2 gap-4">
          <li class="p-4 rounded-xl bg-base-100/60 border border-base-300/20">
            <h3 class="font-semibold">AI Implementation</h3>
            <p class="text-sm opacity-80">Empowering buisnesses through AI training, consulting, and development.</p>
          </li>
          <li class="p-4 rounded-xl bg-base-100/60 border border-base-300/20">
            <h3 class="font-semibold">DeFi strategies</h3>
            <p class="text-sm opacity-80">Research and development of DeFi yield farming strategies.</p>
          </li>
          <li class="p-4 rounded-xl bg-base-100/60 border border-base-300/20">
            <h3 class="font-semibold">Algo Trading</h3>
            <p class="text-sm opacity-80">Development and execution of algorithmic trading strategies in crypto.</p>
          </li>
          <li class="p-4 rounded-xl bg-base-100/60 border border-base-300/20">
            <h3 class="font-semibold">Web3 Research & Development</h3>
            <p class="text-sm opacity-80">Discovering emerging trends, innovative projects, and untapped niches.</p>
          </li>
        </ul>
      </div>

      <div class="">
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
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

let chartInstance: Chart | null = null;

onMounted(() => {
  const canvas = document.getElementById("tvlForecastChart") as HTMLCanvasElement;
  if (canvas && !chartInstance) {
    chartInstance = new Chart(canvas, {
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
  }
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
})
</script>
