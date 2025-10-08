<template>
  <section id="offer" class="container mx-auto max-w-6xl px-4">
    <div class="card bg-base-200/50 shadow-xl border border-base-300/30">
      <h2 class="card-title text-2xl font-bold p-8">About Me</h2>
      <div class="card-body grid md:grid-cols-2 gap-6">
        <div>
          <p class="text-lg mb-4 opacity-90">
            Hi, I'm <strong class="text-primary">Chris</strong>.
          </p>
          <p class="opacity-80 mb-4 leading-relaxed">
            I'm a technologist in the trading trenches - combining <strong class="text-secondary">9+ years of software engineering</strong> with <strong class="text-secondary">7+ years in on-chain & DeFi systems</strong>, and 2+ years of deep work in AI and automation.
          </p>
          <p class="opacity-80 mb-4 leading-relaxed">
            I build <strong class="text-accent">autonomous agents</strong> and algorithmic strategies that run capital on-chain, executing trades, adapting to regimes, and managing risk - all transparently and with accountability.
          </p>
          <p class="opacity-80 leading-relaxed">
            I believe the future of capital is <strong class="text-primary">autonomous and composable.</strong>
          </p>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-4">Strategy Performance (Backtest)</h3>
          <div class="w-full" style="height: 300px;">
            <canvas id="strategyChart"></canvas>
          </div>
          <p class="text-xs opacity-70 mt-2">
            Mock backtest data for illustration •
            <span class="text-accent">~85% win rate</span> •
            <span class="text-primary">Controlled drawdown</span>
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
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Strategy Returns (%)",
            data: [5.2, 8.1, 12.3, 9.8, 15.2, 18.7, 22.1, 19.3, 25.8, 28.4, 31.2, 34.8],
            borderColor: "#00ff88",
            backgroundColor: "rgba(0,255,136,0.1)",
            fill: true,
            tension: 0.4,
          },
          {
            label: "Benchmark (Buy & Hold)",
            data: [2.1, 4.3, 6.8, 8.2, 10.1, 12.5, 14.8, 16.2, 18.9, 21.3, 23.7, 26.1],
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
              text: 'Month'
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
