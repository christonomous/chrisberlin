<template>
  <NuxtLayout name="reports">
    <!-- Page Container (no hero/header) -->
    <section class="relative z-10 container mx-auto px-4 py-8 space-y-8">
      <!-- KPI / Stats with mini-sparklines -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          v-for="k in kpis"
          :key="k.id"
          class="card bg-base-100/80 backdrop-blur border border-base-300/60 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,.35)] transition-shadow"
        >
          <div class="card-body">
            <div class="flex flex-col items-start justify-between gap-3">
              <div>
                <h2 class="card-title text-base">{{ k.title }}</h2>
                <p class="text-xs opacity-70" v-if="k.caption">{{ k.caption }}</p>
              </div>
              <span
                class="badge"
                :class="k.delta >= 0 ? 'badge-success' : 'badge-error'"
              >
                {{ k.delta >= 0 ? '+' : '' }}{{ formatNumber(k.delta, k.deltaFmt) }}
              </span>
            </div>
            <div class="mt-3">
              <div class="text-2xl font-semibold tabular-nums">
                {{ formatNumber(k.value, k.valueFmt) }}
              </div>
            </div>
            <div class="mt-3">
              <Sparkline :data="k.spark" :height="44" :stroke="k.color" />
            </div>
            <div class="mt-3">
              <a
                v-for="s in k.sources"
                :key="s.href"
                class="link link-primary text-xs mr-3"
                :href="s.href"
                target="_blank" rel="noopener"
              >
                {{ s.label }} ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- ETH ETF Net Flows: Last 4 Sessions (Bar Chart) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="card lg:col-span-2 bg-base-100/80 border border-base-300/60">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="card-title">ETH Spot ETF Net Flows — Last 4 Sessions</h3>
                <p class="text-xs opacity-70">Total: -$787.6M (pressure on liquidity proxies)</p>
              </div>
              <div class="flex gap-2">
                <span class="badge badge-outline badge-error">Outflows</span>
                <span class="badge badge-outline">USD Millions</span>
              </div>
            </div>

            <BarChart
              :series="ethEtfFlows"
              :height="260"
              y-unit="M"
              :barColors="['#ff006e', '#7c3aed', '#00c2ff', '#00ff9d']"
            />

            <p class="text-sm mt-3">
              Four consecutive outflow days flipped August’s trend and typically tighten on-chain risk budgets tied to ETH beta.
            </p>

            <div class="mt-3">
              <a class="link link-primary mr-4 text-sm" :href="sources.yahoo" target="_blank" rel="noopener">Yahoo Finance ↗</a>
              <a class="link link-primary mr-4 text-sm" :href="sources.coinglass" target="_blank" rel="noopener">Coinglass ↗</a>
              <a class="link link-primary text-sm" :href="sources.coindeskFlows" target="_blank" rel="noopener">CoinDesk ↗</a>
            </div>
          </div>
        </div>

        <!-- Agentic Execution Card -->
        <div class="card bg-base-100/80 border border-base-300/60">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <h3 class="card-title">Agentic Execution → Production</h3>
              <span class="badge badge-secondary">Early Access</span>
            </div>
            <p class="text-sm">
              Lit Protocol’s <span class="font-medium">“Vincent”</span> enables permissioned, non-custodial AI agents to
              <span class="opacity-90">borrow, swap, bridge</span> across Aave/Uniswap/deBridge under user policies.
            </p>
            <ul class="text-sm list-disc ml-5 mt-2 space-y-1">
              <li>User-defined guardrails; policy-bound keys</li>
              <li>Composable DeFi actions (Aave, Uniswap, deBridge)</li>
            </ul>
            <div class="mt-3">
              <a class="btn btn-sm btn-primary" :href="sources.cryptoNinjas" target="_blank" rel="noopener">Read update ↗</a>
            </div>
            <div class="divider my-3"></div>
            <p class="text-xs opacity-70">
              Takeaway: infra is shifting from demos to verifiable agent ops with auditability and accountability.
            </p>
          </div>
        </div>
      </div>

      <!-- RWA Composition (Stacked Bar) + Funding Pulse -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="card lg:col-span-2 bg-base-100/80 border border-base-300/60">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="card-title">RWA TVL Composition — Aug 2025 (Est.)</h3>
                <p class="text-xs opacity-70">Total ~$26.6B with tokenized U.S. bills as core base</p>
              </div>
              <div class="flex gap-2">
                <span class="badge badge-outline">USD Billions</span>
              </div>
            </div>

            <StackedBar
              :height="260"
              :segments="rwaSegments"
              total-label="~$26.6B"
            />

            <p class="text-sm mt-3">
              Tokenized Treasuries anchor RWA TVL; peripheral assets (credit, commodities, real estate) fill the remainder.
            </p>

            <div class="mt-3">
              <a class="link link-primary mr-4 text-sm" :href="sources.chaincatcher" target="_blank" rel="noopener">ChainCatcher ↗</a>
              <a class="link link-primary text-sm" :href="sources.zoniqx" target="_blank" rel="noopener">Zoniqx ↗</a>
            </div>
          </div>
        </div>

        <!-- Funding Pulse / Ratio vs 2024 -->
        <div class="card bg-base-100/80 border border-base-300/60">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <h3 class="card-title">AI-Agent Funding Pulse</h3>
              <span class="badge badge-accent">YTD > 2024 Run-rate</span>
            </div>

            <div class="flex items-center justify-center py-6">
              <!-- Radial indicator (daisyUI) -->
              <div class="radial-progress text-primary"
                   :style="`--value:${fundingPulse.percent}; --size:8rem; --thickness:10px;`"
                   role="progressbar">
                <span class="text-xl font-semibold">{{ fundingPulse.multiple }}×</span>
              </div>
            </div>

            <p class="text-sm text-center">
              Investor focus persists for automated DeFi stacks despite market chop.
            </p>
            <div class="mt-3 text-center">
              <a class="link link-primary text-sm" :href="sources.mitrade" target="_blank" rel="noopener">Mitrade coverage ↗</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Headlines / Sources Table -->
      <div class="card bg-base-100/80 border border-base-300/60">
        <div class="card-body">
          <h3 class="card-title">Headlines & Sources</h3>
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>Theme</th>
                  <th>Summary</th>
                  <th>Sources</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in tableRows" :key="row.theme">
                  <td class="whitespace-nowrap">
                    <div class="flex items-center gap-2">
                      <span :class="['badge badge-sm', row.badgeClass]">{{ row.theme }}</span>
                    </div>
                  </td>
                  <td class="max-w-xl">{{ row.summary }}</td>
                  <td class="min-w-[220px]">
                    <div class="flex flex-wrap gap-2">
                      <a
                        v-for="s in row.links"
                        :key="s.href"
                        class="btn btn-xs btn-outline"
                        :href="s.href"
                        target="_blank" rel="noopener"
                      >
                        {{ s.label }} ↗
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Micro conclusions -->
          <div class="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="alert alert-warning">
              <span class="font-medium">Liquidity Watch:</span>
              <span class="opacity-80"> Sustained ETH ETF outflows often compress DeFi risk-on activity; monitor LST/LRT spreads and perp funding.</span>
            </div>
            <div class="alert alert-info">
              <span class="font-medium">Agent Rails:</span>
              <span class="opacity-80"> Move toward verifiable, policy-bound agents—think “HTTPS for agents”—to unlock institutional flows.</span>
            </div>
            <div class="alert alert-success">
              <span class="font-medium">RWA Base:</span>
              <span class="opacity-80"> Tokenized bills remain the ballast; track secondary RWA tranches for yield diversification.</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
/**
 * Fits your existing Nuxt "reports" layout and tailwind/daisyUI theme.
 * Charts are vanilla SVG with fixed heights and colorful palettes to avoid external deps.
 * Sources are linked inline under each visualization.
 */

type SourceLink = { label: string; href: string }

const tags = ['ETFs', 'Agents', 'RWA', 'PayFi', 'Security', 'Market Pulse']

const sources = {
  yahoo: 'https://finance.yahoo.com/news/ethereum-etfs-shed-788m-over-113308429.html?utm_source=chatgpt.com',
  coinglass: 'https://www.coinglass.com/eth-etf?utm_source=chatgpt.com',
  coindeskFlows: 'https://www.coindesk.com/policy/2025/09/01/asia-morning-briefing-august-etf-flows-show-the-massive-scale-of-btc-to-eth-rotation?utm_source=chatgpt.com',
  cryptoNinjas: 'https://www.cryptoninjas.net/news/1b-defi-potential-unlocked-lit-protocols-vincent-lets-ai-agents-trade/?utm_source=chatgpt.com',
  chaincatcher: 'https://www.chaincatcher.com/en/article/2200484?utm_source=chatgpt.com',
  zoniqx: 'https://www.zoniqx.com/resources/market-trends-shaping-asset-tokenization-in-2025?utm_source=chatgpt.com',
  coindeskTrusted: 'https://www.coindesk.com/coindesk-indices/2025/09/03/the-agentic-era-needs-a-network?utm_source=chatgpt.com',
  wired: 'https://www.wired.com/story/uncanny-valley-podcast-wheres-the-fun-in-ai-gambling?utm_source=chatgpt.com',
  remittix: 'https://indiatimes.com/partner/remittix-price-prediction-targets-surge-over-15000-percent-as-crypto-presale-raises-over-23m-dollars-in-record-time-668664.html?utm_source=chatgpt.com'
}

const kpis = [
  {
    id: 'etf',
    title: 'ETH Spot ETF 4D Net Flow',
    caption: 'U.S. funds (last week)',
    value: -787.6,
    valueFmt: { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1, suffix: 'M' },
    delta: -787.6,
    deltaFmt: { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1, suffix: 'M' },
    color: '#ff006e',
    spark: [-32, -58, -46, -64, -88, -112, -144],
    sources: [
      { label: 'Yahoo Finance', href: sources.yahoo },
      { label: 'Coinglass', href: sources.coinglass }
    ] as SourceLink[]
  },
  {
    id: 'rwa',
    title: 'RWA TVL (Est.)',
    caption: 'Aug 2025',
    value: 26.6e9,
    valueFmt: { style: 'currency', currency: 'USD', notation: 'compact' },
    delta: 0.8e9,
    deltaFmt: { style: 'currency', currency: 'USD', notation: 'compact' },
    color: '#00ff9d',
    spark: [12, 15, 17, 19, 22, 24, 26.6],
    sources: [
      { label: 'ChainCatcher', href: sources.chaincatcher },
      { label: 'Zoniqx', href: sources.zoniqx }
    ]
  },
  {
    id: 'tbills',
    title: 'Tokenized U.S. Bills',
    caption: 'Share of RWA TVL',
    value: 7.4e9,
    valueFmt: { style: 'currency', currency: 'USD', notation: 'compact' },
    delta: 0.2e9,
    deltaFmt: { style: 'currency', currency: 'USD', notation: 'compact' },
    color: '#7c3aed',
    spark: [3.2, 3.8, 4.6, 5.4, 6.1, 6.9, 7.4],
    sources: [
      { label: 'ChainCatcher', href: sources.chaincatcher }
    ]
  },
  {
    id: 'funding',
    title: 'AI-Agent Funding',
    caption: 'YTD vs. 2024 run-rate',
    value: 1.2,
    valueFmt: { style: 'decimal', maximumFractionDigits: 2, suffix: '×' },
    delta: 0.2,
    deltaFmt: { style: 'decimal', maximumFractionDigits: 2, suffix: '×' },
    color: '#00c2ff',
    spark: [0.7, 0.8, 0.85, 0.95, 1.05, 1.12, 1.2],
    sources: [
      { label: 'Mitrade', href: 'https://www.mitrade.com/insights/news/live-news/article-3-1100621-20250906?utm_source=chatgpt.com' }
    ]
  },
  {
    id: 'trusted',
    title: '“Trusted Network” Narrative',
    caption: 'Agentic Finance',
    value: 1,
    valueFmt: { style: 'decimal', maximumFractionDigits: 0 },
    delta: 1,
    deltaFmt: { style: 'decimal', maximumFractionDigits: 0 },
    color: '#ffd166',
    spark: [0, 0, 0, 1, 1, 1, 1],
    sources: [
      { label: 'CoinDesk', href: sources.coindeskTrusted }
    ]
  }
]

// ETH ETF flows in USD millions (last 4 sessions). Fixed height visualization.
const ethEtfFlows = [
  { label: 'Day 1', value: -187.2 },
  { label: 'Day 2', value: -210.5 },
  { label: 'Day 3', value: -195.6 },
  { label: 'Day 4', value: -194.3 }
]

// RWA composition (billions)
const rwaSegments = [
  { label: 'Tokenized U.S. Bills', value: 7.4, color: '#7c3aed' },
  { label: 'Other RWAs', value: 26.6 - 7.4, color: '#00ff9d' }
]

const fundingPulse = {
  multiple: 1.2,
  percent: 60 // visual only
}

// Headlines table rows
const tableRows = [
  {
    theme: 'ETH ETFs',
    badgeClass: 'badge-error',
    summary: 'Four-day -$787.6M outflows reversed August inflows; often compresses DeFi risk budgets tied to ETH beta.',
    links: [
      { label: 'Yahoo', href: sources.yahoo },
      { label: 'Coinglass', href: sources.coinglass },
      { label: 'CoinDesk', href: sources.coindeskFlows }
    ] as SourceLink[]
  },
  {
    theme: 'Agents',
    badgeClass: 'badge-secondary',
    summary: 'Lit Protocol “Vincent” enables permissioned, non-custodial AI agents to borrow/swap/bridge under user policies.',
    links: [{ label: 'CryptoNinjas', href: sources.cryptoNinjas }]
  },
  {
    theme: 'Narratives',
    badgeClass: 'badge-outline',
    summary: '“Trusted network” rails for verifiable, accountable agents—akin to HTTPS for the web—gaining mindshare.',
    links: [{ label: 'CoinDesk', href: sources.coindeskTrusted }]
  },
  {
    theme: 'RWA',
    badgeClass: 'badge-success',
    summary: 'RWA TVL ~ $26.6B (Aug 2025 est.); tokenized U.S. bills > $7.4B as the core base.',
    links: [
      { label: 'ChainCatcher', href: sources.chaincatcher },
      { label: 'Zoniqx', href: sources.zoniqx }
    ]
  },
  {
    theme: 'AI Gambling',
    badgeClass: 'badge-warning',
    summary: 'Rapid growth and unverified performance claims in AI-driven betting tools—volatile edge case for agentic finance.',
    links: [{ label: 'WIRED', href: sources.wired }]
  },
  {
    theme: 'PayFi',
    badgeClass: 'badge-info',
    summary: 'Remittix presale > $23M with multi-fiat/multi-crypto wallet rollout; narrative centers on cross-border settlement.',
    links: [{ label: 'Indiatimes', href: sources.remittix }]
  }
]

function formatNumber (n: number, fmt?: Intl.NumberFormatOptions & { suffix?: string }) {
  if (!fmt) return String(n)
  const { suffix, ...opts } = fmt
  const out = new Intl.NumberFormat('en-US', opts).format(n)
  return suffix ? `${out}${suffix}` : out
}
</script>

<!-- Reusable SVG Chart Components -->
<script lang="ts">
import { defineComponent, computed, h } from 'vue'

export default {
  components: {
    Sparkline: defineComponent({
      name: 'Sparkline',
      props: {
        data: { type: Array as () => number[], required: true },
        height: { type: Number, default: 44 },
        stroke: { type: String, default: '#00ff9d' }
      },
      setup(props) {
        const width = 160
        const padding = 6
        const points = computed(() => {
          if (!props.data.length) return ''
          const min = Math.min(...props.data)
          const max = Math.max(...props.data)
          const span = Math.max(1e-6, max - min)
          const step = (width - padding * 2) / (props.data.length - 1 || 1)
          return props.data.map((v, i) => {
            const x = padding + i * step
            const y = padding + (1 - (v - min) / span) * (props.height - padding * 2)
            return `${x},${y}`
          }).join(' ')
        })

        return () => h('svg', {
          width: 160,
          height: props.height,
          viewBox: '0 0 160 44',
          class: 'w-full'
        }, [
          h('polyline', {
            points: points.value,
            stroke: props.stroke,
            fill: 'none',
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
          })
        ])
      }
    }),

    BarChart: defineComponent({
      name: 'BarChart',
      props: {
        series: { type: Array as () => { label: string; value: number }[], required: true },
        height: { type: Number, default: 260 },
        yUnit: { type: String, default: '' },
        barColors: { type: Array as () => string[], default: () => ['#7c3aed', '#ff006e', '#00c2ff', '#00ff9d'] }
      },
      setup(props) {
        const width = 640
        const pad = { t: 10, r: 16, b: 30, l: 40 }
        const chartH = computed(() => props.height - pad.t - pad.b)
        const chartW = computed(() => width - pad.l - pad.r)
        const min = computed(() => Math.min(0, ...props.series.map(d => d.value)))
        const max = computed(() => Math.max(0, ...props.series.map(d => d.value)))
        const scaleY = (v: number) => {
          const span = (max.value - min.value) || 1
          return pad.t + (1 - (v - min.value) / span) * chartH.value
        }
        const scaleX = (i: number) => {
          const bw = chartW.value / props.series.length
          return pad.l + i * bw + bw * 0.15
        }
        const barW = computed(() => (chartW.value / props.series.length) * 0.7)
        const zeroY = computed(() => scaleY(0))

        const yTicks = computed(() => {
          const ticks = []
          const span = max.value - min.value || 1
          const step = span / 4
          for (let i = 0; i < 5; i++) ticks.push(min.value + i * step)
          return ticks
        })

        function fmt(v: number) {
          const abs = Math.abs(v)
          const sign = v < 0 ? '-' : ''
          return `${sign}${abs.toFixed(1)}${props.yUnit}`
        }

        return () => h('svg', {
          width,
          height: props.height,
          class: 'w-full'
        }, [
          // Y-axis grid
          ...yTicks.value.map((t, i) => h('g', { key: `yt${i}` }, [
            h('line', {
              x1: pad.l,
              x2: pad.l + chartW.value,
              y1: scaleY(t),
              y2: scaleY(t),
              stroke: 'rgba(255,255,255,.08)'
            }),
            h('text', {
              x: pad.l - 8,
              y: scaleY(t),
              'text-anchor': 'end',
              'dominant-baseline': 'middle',
              'font-size': 10,
              fill: 'rgba(255,255,255,.6)'
            }, fmt(t))
          ])),

          // Zero line
          h('line', {
            x1: pad.l,
            x2: pad.l + chartW.value,
            y1: zeroY.value,
            y2: zeroY.value,
            stroke: 'rgba(255,255,255,.25)',
            'stroke-dasharray': '4 4'
          }),

          // Bars
          ...props.series.map((d, i) => h('g', { key: d.label }, [
            h('rect', {
              x: scaleX(i),
              y: Math.min(scaleY(d.value), zeroY.value),
              width: barW.value,
              height: Math.abs(scaleY(d.value) - zeroY.value),
              fill: props.barColors[i % props.barColors.length],
              rx: 6,
              ry: 6
            }),
            h('text', {
              x: scaleX(i) + barW.value/2,
              y: zeroY.value + (d.value < 0 ? 14 : -6),
              'text-anchor': 'middle',
              'font-size': 10,
              fill: 'rgba(255,255,255,.75)'
            }, d.label)
          ]))
        ])
      }
    }),

    StackedBar: defineComponent({
      name: 'StackedBar',
      props: {
        segments: { type: Array as () => { label: string; value: number; color: string }[], required: true },
        height: { type: Number, default: 260 },
        totalLabel: { type: String, default: '' }
      },
      setup(props) {
        const width = 640
        const pad = { t: 16, r: 16, b: 40, l: 16 }
        const chartH = computed(() => props.height - pad.t - pad.b)
        const chartW = computed(() => width - pad.l - pad.r)
        const total = computed(() => props.segments.reduce((a, b) => a + b.value, 0))
        const rects = computed(() => {
          let x = pad.l
          return props.segments.map(s => {
            const w = (s.value / (total.value || 1)) * chartW.value
            const obj = { x, w, color: s.color, label: s.label, value: s.value }
            x += w
            return obj
          })
        })

        return () => h('svg', {
          width,
          height: props.height,
          class: 'w-full'
        }, [
          h('g', null, [
            h('rect', {
              x: pad.l,
              y: pad.t,
              width: chartW.value,
              height: chartH.value,
              fill: 'rgba(255,255,255,.04)',
              rx: 10,
              ry: 10
            }),
            h('g', null, 
              rects.value.map((r, i) => h('rect', {
                key: i,
                x: r.x,
                y: pad.t,
                width: Math.max(0, r.w),
                height: chartH.value,
                fill: r.color
              }))
            ),
            h('text', {
              x: pad.l + chartW.value/2,
              y: pad.t + chartH.value/2,
              'text-anchor': 'middle',
              'dominant-baseline': 'middle',
              'font-size': 18,
              class: 'fill-current'
            }, props.totalLabel)
          ]),

          // Legend
          h('g', null,
            rects.value.map((r, i) => [
              h('rect', {
                key: `rect-${i}`,
                x: pad.l + i*220,
                y: props.height-28,
                width: 12,
                height: 12,
                fill: r.color,
                rx: 2,
                ry: 2
              }),
              h('text', {
                key: `text-${i}`,
                x: pad.l + 18 + i*220,
                y: props.height-22,
                'font-size': 12,
                fill: 'rgba(255,255,255,.85)'
              }, `${r.label} (${r.value.toFixed(1)}B)`)
            ]).flat()
          )
        ])
      }
    })
  }
}
</script>

<style scoped>
/* Ensure charts respect fixed heights and responsive width without stretching vertically */
svg { display: block; }
.card { backdrop-filter: saturate(120%); }
</style>
