<template>
  <section id="performance" class="container mx-auto max-w-6xl px-4 py-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
        Track Record & Edge
      </h2>
    </div>

    <div class="grid lg:grid-cols-2 gap-8 items-start">
      <!-- Metrics -->
      <div class="space-y-6">
        <div class="card bg-base-200/50 shadow-xl border border-base-300/30">
          <div class="card-body">
            <h3 class="text-xl font-semibold mb-4 text-primary">Performance Metrics</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center p-3 bg-base-100/60 rounded-lg">
                <span class="opacity-80">Long-term Crypto ROI</span>
                <span class="text-2xl font-bold text-secondary">~1,120%</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-base-100/60 rounded-lg">
                <span class="opacity-80">Bot Backtest Win Rate</span>
                <span class="text-2xl font-bold text-secondary">~85%</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-base-100/60 rounded-lg">
                <span class="opacity-80">Strategy Prototypes</span>
                <span class="text-2xl font-bold text-secondary">50+</span>
              </div>
            </div>
            <p class="text-sm opacity-70 mt-4">
              I believe in full transparency — I'm working toward publishing a live / audited dashboard and risk reports so you can see exactly how capital is handled.
            </p>
          </div>
        </div>
      </div>

      <!-- Chart -->
      <div class="card bg-base-200/50 shadow-xl border border-base-300/30">
        <div class="card-body">
          <h3 class="text-xl font-semibold mb-4 text-secondary">Strategy Performance (Backtest)</h3>
          <canvas id="strategyChart" height="200"></canvas>
          <p class="text-xs opacity-70 mt-2">
            Mock backtest data for illustration •
            <span class="text-accent">~85% win rate</span> •
            <span class="text-primary">Controlled drawdown</span>
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
  const canvas = document.getElementById("strategyChart") as HTMLCanvasElement;
  if (canvas && !chartInstance) {
    chartInstance = new Chart(canvas, {
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
        plugins: {
          legend: { position: "bottom" },
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
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
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
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
})
</script>
