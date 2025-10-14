<template>
  <section id="offer" class="container mx-auto max-w-6xl px-4">
    <div class="card bg-base-200/50 shadow-xl border border-base-300/30">
      <h2 class="card-title text-2xl font-bold pt-8 pl-8">About Me</h2>
      <div class="card-body grid md:grid-cols-2 gap-6">
        <div>
          <p class="opacity-80 mb-4 leading-relaxed">
            I'm a crypto native - combining <strong class="text-secondary">9+ years of software development</strong> with <strong class="text-secondary">7+ years in on-chain experience</strong>, and 2+ years of deep work in AI and automation.
          </p>
          <p class="opacity-80 mb-4 leading-relaxed">
            <b>I help crypto businesses build their smart edge</b> - from aggregating market data and creating dashboards to developing algorithmic strategies to work with valuable insights.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-4">Strategy Performance</h3>
          <div class="w-full" style="height: 300px;">
            <canvas id="strategyChart"></canvas>
          </div>
          <p class="flex justify-center text-xs opacity-70 mt-2">
            <span class="text-primary">~2.070% PnL</span> •
            <span class="text-primary">~85% win rate</span> •
            <span class="text-accent">Controlled drawdown</span>
          </p>
        </div>
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

let tvlChartInstance: Chart | null = null;
let strategyChartInstance: Chart | null = null;

onMounted(() => {
  // TVL Forecast Chart
  const canvasForecast = document.getElementById("tvlForecastChart") as HTMLCanvasElement;
  if (canvasForecast && !tvlChartInstance) {
    tvlChartInstance = new Chart(canvasForecast, {
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

  // Strategy Performance Chart
  const canvasPerformance = document.getElementById("strategyChart") as HTMLCanvasElement;
  if (canvasPerformance && !strategyChartInstance) {
    strategyChartInstance = new Chart(canvasPerformance, {
      type: "line",
      data: {
        labels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
        datasets: [
          {
            label: "Strategy Returns (%)",
            data: [9, 40, 60, 760, 71, 120, 520, 2070],
            borderColor: "#00ff88",
            backgroundColor: "rgba(0,255,136,0.1)",
            fill: true,
            tension: 0.4,
          },
          {
            label: "Benchmark (Buy & Hold)",
            data: [8, 30, 45, 600, 160, 300, 750, 1466],
            borderColor: "#ff6b6b",
            backgroundColor: "rgba(255,107,107,0.1)",
            fill: true,
            tension: 0.4,
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 20,
              usePointStyle: true
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cumulative Returns (%)'
            },
            grid: {
              display: true,
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Year'
            },
            grid: {
              display: true,
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      },
    });
  }
})

onUnmounted(() => {
  if (tvlChartInstance) {
    tvlChartInstance.destroy();
    tvlChartInstance = null;
  }
  if (strategyChartInstance) {
    strategyChartInstance.destroy();
    strategyChartInstance = null;
  }
})
</script>
