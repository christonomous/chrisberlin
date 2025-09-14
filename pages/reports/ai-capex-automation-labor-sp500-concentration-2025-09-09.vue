<template>
  <NuxtLayout name="reports">
    <!-- KPI / Stats -->
    <section class="relative z-10 container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div
          v-for="k in kpis"
          :key="k.id"
          class="card bg-base-100/80 backdrop-blur border border-base-300/60 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,.35)] transition-shadow"
        >
          <div class="card-body">
            <div class="flex flex-col items-start justify-between">
              <div>
                <h2 class="card-title text-base">{{ k.title }}</h2>
                <p class="text-xs opacity-70" v-if="k.caption">{{ k.caption }}</p>
              </div>
              <div class="badge badge-secondary badge-outline whitespace-nowrap">{{ k.tag }}</div>
            </div>
            <div class="mt-3">
              <div class="text-2xl font-semibold">{{ k.value }}</div>
              <p class="text-xs opacity-70 mt-1" v-if="k.delta">{{ k.delta }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Charts Grid -->
    <section class="relative z-10 container mx-auto px-4 pb-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- AI Capex Scenarios -->
        <div class="card bg-base-100/80 backdrop-blur border border-base-300/60">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <h3 class="card-title">Corporate AI Capex  -  Base vs. Aggressive Scenarios (2025–2030)</h3>
              <div class="badge badge-outline">Capex</div>
            </div>
            <p class="text-sm opacity-80">
              Enterprises are in a capex super-cycle: ~\$360B in 2025 with scenarios reaching the trillions by 2030. The runway
              matters more than the exact path - direction is up.
            </p>
            <div class="w-full h-72"><canvas ref="capexEl"></canvas></div>
            <div class="mt-2 text-xs opacity-70">
              Source: corporate disclosures & synthesis. Anchor: 2025 ≈ \$360B. Trillion-scale by 2030 per market commentary.
            </div>
          </div>
        </div>

        <!-- S&P 500 Concentration -->
        <div class="card bg-base-100/80 backdrop-blur border border-base-300/60">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <h3 class="card-title">S&P 500 Concentration  -  Mega-caps vs. The Rest</h3>
              <div class="badge badge-outline">Market Structure</div>
            </div>
            <p class="text-sm opacity-80">
              A handful of AI leaders now comprise roughly a third of the index. Concentration risk is real - alpha hides in
              select cash-flowing assets.
            </p>
            <div class="relative w-full h-72">
              <canvas ref="spxEl"></canvas>
              <!-- center label -->
              <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-3xl font-semibold">35%</div>
                  <div class="text-xs opacity-70">Mega-cap share</div>
                </div>
              </div>
            </div>
            <div class="mt-2 text-xs opacity-70">
              Approximate split for 2025 context. Cross-check with your benchmark provider.
            </div>
          </div>
        </div>

        <!-- Jobs: Created vs Eliminated -->
        <div class="card bg-base-100/80 backdrop-blur border border-base-300/60">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <h3 class="card-title">Net Jobs Impact by 2027 (WEF Dataset)</h3>
              <div class="badge badge-outline">Labor</div>
            </div>
            <p class="text-sm opacity-80">
              Employers expect 69M roles created and 83M eliminated by 2027 - net –14M (≈–2%).
            </p>
            <div class="w-full h-72"><canvas ref="jobsEl"></canvas></div>
            <div class="mt-2 text-xs opacity-70">
              Source: <a class="link link-primary" href="https://www.weforum.org/press/2023/04/future-of-jobs-report-2023-up-to-a-quarter-of-jobs-expected-to-change-in-next-five-years/?utm_source=chatgpt.com" target="_blank">World Economic Forum</a>.
            </div>
          </div>
        </div>

        <!-- Exposure & Risk (IMF + OECD) -->
        <div class="card bg-base-100/80 backdrop-blur border border-base-300/60">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <h3 class="card-title">AI Exposure & Risk in Advanced Economies</h3>
              <div class="badge badge-outline">Risk</div>
            </div>
            <p class="text-sm opacity-80">
              ~60% of jobs are exposed to AI; roughly half may see lower demand or wages. OECD flags ~28% at high automation risk.
            </p>
            <div class="w-full h-72"><canvas ref="exposureEl"></canvas></div>
            <div class="mt-2 text-xs opacity-70 space-x-2">
              <a class="link link-primary" href="https://www.imf.org/en/Blogs/Articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity?utm_source=chatgpt.com" target="_blank">IMF Blog</a>
              <a class="link link-primary" href="https://www.elibrary.imf.org/view/journals/006/2024/001/article-A001-en.xml?utm_source=chatgpt.com" target="_blank">IMF eLibrary</a>
              <a class="link link-primary" href="https://www.oecd.org/en/topics/future-of-work.html?utm_source=chatgpt.com" target="_blank">OECD</a>
            </div>
          </div>
        </div>

        <!-- Task Automation (WEF) -->
        <div class="card bg-base-100/80 backdrop-blur border border-base-300/60">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <h3 class="card-title">Share of Business Tasks Expected to be Automated by 2027</h3>
              <div class="badge badge-outline">Automation</div>
            </div>
            <p class="text-sm opacity-80">
              Leaders anticipate 42% task automation by 2027 - automation-first operating models are becoming default.
            </p>
            <div class="w-full h-72"><canvas ref="tasksEl"></canvas></div>
            <div class="mt-2 text-xs opacity-70">
              Source: <a class="link link-primary" href="https://www.weforum.org/publications/the-future-of-jobs-report-2023/digest/?utm_source=chatgpt.com" target="_blank">World Economic Forum</a>.
            </div>
          </div>
        </div>

        <!-- Org Adoption (McKinsey) -->
        <div class="card bg-base-100/80 backdrop-blur border border-base-300/60">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <h3 class="card-title">GenAI in Regular Use (Mar 2025)</h3>
              <div class="badge badge-outline">Adoption</div>
            </div>
            <p class="text-sm opacity-80">
              71% of organizations report regular use. The adoption curve is steep - and cost takeouts show up in earnings.
            </p>
            <div class="relative w-full h-72">
              <canvas ref="adoptionEl"></canvas>
              <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-3xl font-semibold">71%</div>
                  <div class="text-xs opacity-70">Regular use</div>
                </div>
              </div>
            </div>
            <div class="mt-2 text-xs opacity-70">
              Sources: <a class="link link-primary" href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai?utm_source=chatgpt.com" target="_blank">McKinsey</a>,
              <a class="link link-primary" href="https://www.wsj.com/business/earnings-cost-cutting-productivity-e022418a?utm_source=chatgpt.com" target="_blank">WSJ</a>.
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Sources Table -->
    <section class="relative z-10 container mx-auto px-4 pb-16">
      <div class="card bg-base-100/80 backdrop-blur border border-base-300/60">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h3 class="card-title">Citations & Further Reading</h3>
            <div class="badge badge-secondary badge-outline">Links</div>
          </div>
          <div class="overflow-x-auto mt-2">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Key Metric</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Task Automation</td>
                  <td>42% by 2027</td>
                  <td><a class="link link-primary" target="_blank" href="https://www.weforum.org/publications/the-future-of-jobs-report-2023/digest/?utm_source=chatgpt.com">World Economic Forum</a></td>
                </tr>
                <tr>
                  <td>High-Risk Jobs</td>
                  <td>~28% (advanced economies)</td>
                  <td><a class="link link-primary" target="_blank" href="https://www.oecd.org/en/topics/future-of-work.html?utm_source=chatgpt.com">OECD</a></td>
                </tr>
                <tr>
                  <td>Net Jobs Impact</td>
                  <td>–14M (69M created vs 83M eliminated)</td>
                  <td><a class="link link-primary" target="_blank" href="https://www.weforum.org/press/2023/04/future-of-jobs-report-2023-up-to-a-quarter-of-jobs-expected-to-change-in-next-five-years/?utm_source=chatgpt.com">World Economic Forum</a></td>
                </tr>
                <tr>
                  <td>Exposure to AI</td>
                  <td>~60% exposed; ~½ face lower demand/wages</td>
                  <td>
                    <a class="link link-primary" target="_blank" href="https://www.imf.org/en/Blogs/Articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity?utm_source=chatgpt.com">IMF Blog</a>
                    &nbsp;•&nbsp;
                    <a class="link link-primary" target="_blank" href="https://www.elibrary.imf.org/view/journals/006/2024/001/article-A001-en.xml?utm_source=chatgpt.com">IMF eLibrary</a>
                  </td>
                </tr>
                <tr>
                  <td>GenAI Adoption</td>
                  <td>71% organizations (regular use)</td>
                  <td><a class="link link-primary" target="_blank" href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai?utm_source=chatgpt.com">McKinsey</a></td>
                </tr>
                <tr>
                  <td>Earnings Drivers</td>
                  <td>Cost cuts & automation</td>
                  <td><a class="link link-primary" target="_blank" href="https://www.wsj.com/business/earnings-cost-cutting-productivity-e022418a?utm_source=chatgpt.com">Wall Street Journal</a></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-sm opacity-80 mt-4">
            TL;DR: Value concentrates in assets with durable cash flows. Position for automation tailwinds and concentration risk.
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import Chart from 'chart.js/auto'

// Tailwind/DaisyUI palette accents (kept colorful)
const colors = ['#00ff9d', '#7c3aed', '#ff006e', '#22d3ee', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#a855f7', '#f97316']

// KPI data (short + punchy)
const kpis = [
  { id: 1, title: 'AI Capex (2025)', value: '~$360B', caption: 'Enterprise spend on AI infra & apps', tag: 'Capex' },
  { id: 2, title: 'Tasks Automated by 2027', value: '42%', caption: 'Exec expectations', tag: 'Automation' },
  { id: 3, title: 'High-Risk Jobs', value: '≈28%', caption: 'Advanced economies', tag: 'Risk' },
  { id: 4, title: 'Jobs Exposed to AI', value: '≈60%', caption: 'IMF estimate', tag: 'Exposure' },
  { id: 5, title: 'GenAI Regular Use', value: '71%', caption: 'Mar 2025 survey', tag: 'Adoption' },
  { id: 6, title: 'S&P Mega-cap Share', value: '≈35%', caption: 'Concentration risk', tag: 'Market' }
]

// Canvas refs
const capexEl = ref<HTMLCanvasElement | null>(null)
const spxEl = ref<HTMLCanvasElement | null>(null)
const jobsEl = ref<HTMLCanvasElement | null>(null)
const exposureEl = ref<HTMLCanvasElement | null>(null)
const tasksEl = ref<HTMLCanvasElement | null>(null)
const adoptionEl = ref<HTMLCanvasElement | null>(null)

// Chart instances for cleanup
let capexChart: Chart | null = null
let spxChart: Chart | null = null
let jobsChart: Chart | null = null
let exposureChart: Chart | null = null
let tasksChart: Chart | null = null
let adoptionChart: Chart | null = null

onMounted(() => {
  // 1) AI Capex  -  illustrative scenarios (billions USD)
  if (capexEl.value) {
    const labels = ['2025', '2026', '2027', '2028', '2029', '2030']
    capexChart = new Chart(capexEl.value, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Base',
            data: [360, 480, 620, 780, 950, 1200],
            borderWidth: 3,
            fill: false,
            tension: 0.3,
            borderColor: colors[1],
            pointBackgroundColor: colors[1]
          },
          {
            label: 'Aggressive (Trillion+ by 2030)',
            data: [360, 520, 700, 950, 1250, 1500],
            borderWidth: 3,
            fill: false,
            tension: 0.35,
            borderColor: colors[2],
            pointBackgroundColor: colors[2]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12 } },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          y: {
            title: { display: true, text: 'USD (Billions)' },
            grid: { color: 'rgba(255,255,255,0.08)' }
          },
          x: { grid: { display: false } }
        }
      }
    })
  }

  // 2) S&P Concentration  -  doughnut
  if (spxEl.value) {
    spxChart = new Chart(spxEl.value, {
      type: 'doughnut',
      data: {
        labels: ['Mega-caps (~35%)', 'Rest of Index (~65%)'],
        datasets: [
          {
            data: [35, 65],
            backgroundColor: [colors[2], colors[8]],
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '64%',
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    })
  }

  // 3) Jobs: created vs eliminated (WEF)
  if (jobsEl.value) {
    jobsChart = new Chart(jobsEl.value, {
      type: 'bar',
      data: {
        labels: ['2027 Outlook'],
        datasets: [
          { label: 'Created', data: [69], backgroundColor: colors[0] },
          { label: 'Eliminated', data: [83], backgroundColor: colors[4] }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          y: {
            title: { display: true, text: 'Millions of Roles' },
            grid: { color: 'rgba(255,255,255,0.08)' },
            suggestedMax: 90
          },
          x: { grid: { display: false } }
        }
      }
    })
  }

  // 4) Exposure & risk  -  stacked bar
  if (exposureEl.value) {
    exposureChart = new Chart(exposureEl.value, {
      type: 'bar',
      data: {
        labels: ['Advanced Economies'],
        datasets: [
          { label: 'Exposed (IMF)', data: [60], backgroundColor: colors[7], stack: 'stack1' },
          { label: 'Impacted (≈½ of exposed)', data: [30], backgroundColor: colors[6], stack: 'stack1' },
          { label: 'High Automation Risk (OECD)', data: [28], backgroundColor: colors[4], stack: 'stack2' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          y: {
            title: { display: true, text: 'Share of Jobs (%)' },
            grid: { color: 'rgba(255,255,255,0.08)' },
            suggestedMax: 100
          },
          x: { grid: { display: false } }
        }
      }
    })
  }

  // 5) Tasks automated  -  single bar
  if (tasksEl.value) {
    tasksChart = new Chart(tasksEl.value, {
      type: 'bar',
      data: {
        labels: ['2027 (Expectations)'],
        datasets: [{ label: 'Automated Tasks', data: [42], backgroundColor: colors[5] }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          y: {
            title: { display: true, text: 'Share of Tasks (%)' },
            grid: { color: 'rgba(255,255,255,0.08)' },
            suggestedMax: 100
          },
          x: { grid: { display: false } }
        }
      }
    })
  }

  // 6) Organizational adoption  -  doughnut
  if (adoptionEl.value) {
    adoptionChart = new Chart(adoptionEl.value, {
      type: 'doughnut',
      data: {
        labels: ['Regular Use', 'Not Regular'],
        datasets: [
          {
            data: [71, 29],
            backgroundColor: [colors[0], 'rgba(255,255,255,0.12)'],
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '64%',
        plugins: { legend: { position: 'bottom' } }
      }
    })
  }
})

onBeforeUnmount(() => {
  capexChart?.destroy()
  spxChart?.destroy()
  jobsChart?.destroy()
  exposureChart?.destroy()
  tasksChart?.destroy()
  adoptionChart?.destroy()
})
</script>

<style scoped>
/* Ensure fixed heights to prevent infinite growth; charts are in h-72 wrappers */
</style>
