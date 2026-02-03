<template>
  <section id="about" class="relative py-20 overflow-hidden">
    <!-- Animated Background -->
    <!-- <div class="absolute inset-0 bg-gradient-to-br from-base-100 via-base-200/20 to-base-100"></div>
    <div class="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/3 rounded-full blur-2xl animate-pulse delay-500"></div> -->

    <div class="container mx-auto max-w-7xl px-4 relative z-10">
      <!-- Hero Story Section -->
      <div class="text-center mb-20">
        <div class="inline-block bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-8">
          <span class="text-primary font-semibold">CRYPTO NATIVE • AI EXPERT • Trading Rookie</span>
        </div>

        <h2 class="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight animate-gradient">
          From Code over Crypto & AI to Smart Trading 
        </h2>

        <p class="text-xl md:text-2xl text-base-content/70 max-w-4xl mx-auto leading-relaxed mb-12">
          A journey of <strong class="text-primary">9+ years</strong> in software development,
          <strong class="text-secondary">7+ years</strong> deep in blockchain, and
          <strong class="text-accent">2+ years</strong> mastering AI automation
        </p>
      </div>

      <!-- Experience Timeline & Story Grid -->
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20">
        <!-- Story Narrative -->
        <div class="space-y-8">
          <div class="bg-base-200/50 backdrop-blur-sm border border-base-300/30 rounded-3xl p-8 shadow-xl">
            <h3 class="text-3xl font-bold mb-6 text-primary">The Origin Story</h3>
            <div class="mb-6 -mt-4">
              <a 
                href="https://medium.com/@christonomous/from-crypto-startups-to-building-an-advanced-onchain-trading-bot-54a2ec1a2f6b" 
                target="_blank" 
                class="text-primary hover:text-primary-focus inline-flex items-center gap-2 font-medium transition-colors"
              >
                <span>Read my story here on Medium</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
            <div class="space-y-6 text-lg leading-relaxed">
              <p class="flex items-start gap-4">
                <span class="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-content font-bold text-sm mt-1">1</span>
                <span><strong class="text-primary">2015:</strong> Started as a software developer, building scalable systems and learning the art of clean code.</span>
              </p>
              <p class="flex items-start gap-4">
                <span class="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-content font-bold text-sm mt-1">2</span>
                <span><strong class="text-secondary">2017:</strong> Discovered Bitcoin and Ethereum. The rabbit hole began - spent countless nights understanding blockchain fundamentals and building DeFi protocols.</span>
              </p>
              <p class="flex items-start gap-4">
                <span class="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-content font-bold text-sm mt-1">3</span>
                <span><strong class="text-secondary">2020:</strong> Founded blockchain and DeFi projects, learning the realities of crypto entrepreneurship through market cycles.</span>
              </p>
              <p class="flex items-start gap-4">
                <span class="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-content font-bold text-sm mt-1">4</span>
                <span><strong class="text-accent">2024:</strong> Ran AI automation agency, building marketing funnels, process automation, and chatbots while studying trading strategies at night.</span>
              </p>
              <p class="flex items-start gap-4">
                <span class="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-content font-bold text-sm mt-1">5</span>
                <span><strong class="text-primary">2025:</strong> Went all-in on trading, stress-testing strategies with paper trading.</span>
              </p>
              <p class="flex items-start gap-4">
                <span class="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-content font-bold text-sm mt-1">6</span>
                <span><strong class="text-primary">2026:</strong> Building advanced onchain trading bots and trade prop firm accounts.</span>
              </p>
            </div>
          </div>

          <div class="bg-base-200/50 backdrop-blur-sm border border-base-300/30 rounded-3xl p-8 shadow-xl">
            <h3 class="text-3xl font-bold mb-6 text-secondary">What I Can Help With</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-primary rounded-full animate-pulse delay-300"></div>
                  <span class="font-semibold">App/Quant Development</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-secondary rounded-full animate-pulse delay-700"></div>
                  <span class="font-semibold">Crypto Training</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-accent rounded-full animate-pulse delay-700"></div>
                  <span class="font-semibold">AI Training</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Charts -->
        <div class="space-y-8">
          <!-- Experience Radar Chart -->
          <div class="bg-base-200/50 backdrop-blur-sm border border-base-300/30 rounded-3xl p-6 md:p-8 shadow-xl">
            <h3 class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Expertise Matrix</h3>
            <div class="relative" style="height: 250px;">
              <canvas id="expertiseChart"></canvas>
            </div>
          </div>

          <!-- Performance Timeline -->
          <div class="bg-base-200/50 backdrop-blur-sm border border-base-300/30 rounded-3xl p-6 md:p-8 shadow-xl">
            <h3 class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Growth Trajectory</h3>
            <div class="relative" style="height: 200px;">
              <canvas id="growthChart"></canvas>
            </div>
            <div class="grid grid-cols-4 gap-2 md:gap-4 mt-3 md:mt-4 text-center">
              <div>
                <div class="text-xl md:text-2xl font-bold text-primary">10+</div>
                <div class="text-xs text-base-content/60">Years Dev</div>
              </div>
              <div>
                <div class="text-xl md:text-2xl font-bold text-secondary">8+</div>
                <div class="text-xs text-base-content/60">Years Crypto</div>
              </div>
              <div>
                <div class="text-xl md:text-2xl font-bold text-accent">2+</div>
                <div class="text-xs text-base-content/60">Years AI</div>
              </div>
              <div>
                <div class="text-xl md:text-2xl font-bold text-primary">~1</div>
                <div class="text-xs text-base-content/60">Year Trading</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Impact Stats -->
      <!-- <div class="grid md:grid-cols-4 gap-8 mb-16">
        <div class="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
          <div class="text-4xl font-bold text-primary mb-2">50+</div>
          <div class="text-base-content/70">Projects Delivered</div>
        </div>
        <div class="text-center p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl border border-secondary/20">
          <div class="text-4xl font-bold text-secondary mb-2">$2M+</div>
          <div class="text-base-content/70">Assets Under Management</div>
        </div>
        <div class="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border border-accent/20">
          <div class="text-4xl font-bold text-accent mb-2">85%</div>
          <div class="text-base-content/70">Strategy Win Rate</div>
        </div>
        <div class="text-center p-6 bg-gradient-to-br from-base-100/50 to-base-200/30 rounded-2xl border border-base-300/30">
          <div class="text-4xl font-bold text-base-content mb-2">24/7</div>
          <div class="text-base-content/70">Automated Monitoring</div>
        </div>
      </div> -->

      <!-- Call to Action -->
      <div class="text-center">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
            Let's Build Alpha Together
          </h2>
        </div>
        <div class="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-3xl p-12 max-w-4xl mx-auto">
          <h3 class="text-4xl font-bold mb-6">Ready to Automate Your Edge?</h3>
          <p class="text-xl text-base-content mb-8 leading-relaxed">
            I can help you deploy <span class="text-primary font-semibold">advanced onchain trading bots</span> with custom strategies,
            build <span class="text-secondary font-semibold">DeFi automation systems</span>, or develop
            <span class="text-accent font-semibold">AI-powered solutions</span> that generate alpha while you sleep.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://calendly.com/chrisberlin/session" target="_blank" class="btn btn-primary btn-lg px-8 py-4 rounded-full shadow-xl hover:shadow-primary/25 transition-all duration-300">
              Book an Appointment
              <svg class="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
            <!-- <button class="btn btn-outline btn-lg px-8 py-4 rounded-full border-2 hover:bg-base-100/50 transition-all duration-300">
              View Case Studies
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import {
  Chart,
  RadarController,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";

Chart.register(
  RadarController,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

let expertiseChartInstance: Chart | null = null;
let growthChartInstance: Chart | null = null;

onMounted(() => {
  // Expertise Radar Chart
  const expertiseCanvas = document.getElementById("expertiseChart") as HTMLCanvasElement;
  if (expertiseCanvas && !expertiseChartInstance) {
    expertiseChartInstance = new Chart(expertiseCanvas, {
      type: "radar",
      data: {
        labels: ["Coding", "DeFi", "Automation", "Trading", "AI"],
        datasets: [
          {
            label: "Technical Skills",
            data: [95, 90, 80, 70, 92],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            pointBackgroundColor: "rgb(59, 130, 246)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(59, 130, 246)",
          },
/*           {
            label: "Market Knowledge",
            data: [80, 95, 75, 90, 85, 88],
            borderColor: "rgb(168, 85, 247)",
            backgroundColor: "rgba(168, 85, 247, 0.2)",
            pointBackgroundColor: "rgb(168, 85, 247)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(168, 85, 247)",
          }, */
/*           {
            label: "AI Integration",
            data: [70, 75, 95, 80, 90, 85],
            borderColor: "rgb(236, 72, 153)",
            backgroundColor: "rgba(236, 72, 153, 0.2)",
            pointBackgroundColor: "rgb(236, 72, 153)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(236, 72, 153)",
          } */
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 15,
              usePointStyle: true,
              font: function(context) {
                return {
                  size: window.innerWidth < 768 ? 10 : 12,
                  family: 'Inter, sans-serif'
                };
              }
            }
          },
          tooltip: {
            titleFont: {
              size: function() {
                return window.innerWidth < 768 ? 12 : 14;
              }
            },
            bodyFont: {
              size: function() {
                return window.innerWidth < 768 ? 11 : 13;
              }
            },
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.r}%`;
              }
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              font: function() {
                return {
                  size: window.innerWidth < 768 ? 9 : 11
                };
              },
              callback: function(value) {
                return value + '%';
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            angleLines: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              font: function() {
                return {
                  size: window.innerWidth < 768 ? 9 : 11
                };
              }
            }
          }
        }
      },
    });
  }

  // Growth Trajectory Chart
  const growthCanvas = document.getElementById("growthChart") as HTMLCanvasElement;
  if (growthCanvas && !growthChartInstance) {
    growthChartInstance = new Chart(growthCanvas, {
      type: "line",
      data: {
        labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"],
        datasets: [
          {
            label: "Development Skills",
            data: [20, 35, 50, 65, 75, 80, 85, 88, 90, 93, 95, 95],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            fill: false,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
          {
            label: "Crypto Knowledge",
            data: [0, 5, 25, 45, 60, 70, 75, 80, 85, 88, 90, 95],
            borderColor: "rgb(168, 85, 247)",
            backgroundColor: "rgba(168, 85, 247, 0.1)",
            fill: false,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
          {
            label: "AI Expertise",
            data: [0, 0, 0, 5, 10, 15, 25, 40, 65, 80, 85, 90],
            borderColor: "rgb(236, 72, 153)",
            backgroundColor: "rgba(236, 72, 153, 0.1)",
            fill: false,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
          {
            label: "Trading",
            data: [0, 0, 0, 2, 3, 4, 4, 5, 5, 11, 40, 65],
            borderColor: "rgb(2, 233, 144)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            fill: false,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
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
              padding: 12,
              usePointStyle: true,
              font: function() {
                return {
                  size: window.innerWidth < 768 ? 9 : 11,
                  family: 'Inter, sans-serif'
                };
              }
            }
          },
          tooltip: {
            titleFont: {
              size: function() {
                return window.innerWidth < 768 ? 11 : 13;
              }
            },
            bodyFont: {
              size: function() {
                return window.innerWidth < 768 ? 10 : 12;
              }
            },
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y}% mastery`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Expertise Level (%)',
              font: function() {
                return {
                  size: window.innerWidth < 768 ? 10 : 12
                };
              }
            },
            ticks: {
              font: function() {
                return {
                  size: window.innerWidth < 768 ? 9 : 11
                };
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Year',
              font: function() {
                return {
                  size: window.innerWidth < 768 ? 10 : 12
                };
              }
            },
            ticks: {
              font: function() {
                return {
                  size: window.innerWidth < 768 ? 9 : 11
                };
              }
            },
            grid: {
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
  if (expertiseChartInstance) {
    expertiseChartInstance.destroy();
    expertiseChartInstance = null;
  }
  if (growthChartInstance) {
    growthChartInstance.destroy();
    growthChartInstance = null;
  }
})
</script>
