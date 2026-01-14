<!-- BrandMetrics.vue -->
<template>
  <section class="w-full mb-16">
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
      <!-- Coding -->
      <div class="stat bg-base-200/80 backdrop-blur rounded-box shadow p-4 text-center">
        <div class="stat-title text-white"><b>Coding</b></div>
        <div class="flex items-center justify-center gap-1">
          <div class="stat-value leading-none text-secondary">{{ yearsPlus(starts.coding) }}</div>
          <span class="text-base-content/60 text-xl">y</span>
        </div>
        <div class="stat-desc">Full-stack Developer</div>
      </div>

      <!-- DeFi -->
      <div class="stat bg-base-200/80 backdrop-blur rounded-box shadow p-4 text-center">
        <div class="stat-title text-white"><b>Web3</b></div>
        <div class="flex items-center justify-center gap-1">
          <div class="stat-value leading-none text-secondary">{{ yearsPlus(starts.web3) }}</div>
          <span class="text-base-content/60 text-xl">y</span>
        </div>
        <div class="stat-desc">On-chain native</div>
      </div>

      <!-- AI & Automation -->
      <div class="stat bg-base-200/80 backdrop-blur rounded-box shadow p-4 text-center">
        <div class="stat-title text-white"><b>AI</b></div>
        <div class="flex items-center justify-center gap-1">
          <div class="stat-value leading-none text-secondary">{{ yearsPlus(starts.ai) }}</div>
          <span class="text-base-content/60 text-xl">y</span>
        </div>
        <div class="stat-desc">Systems & agents</div>
      </div>

      <!-- Crypto ROI (sparkline) -->
      <div class="stat bg-base-200/80 backdrop-blur rounded-box shadow p-4 text-center">
        <div class="stat-title text-white"><b>Trading</b></div>
        <div class="flex items-center justify-center gap-1">
          <div class="stat-value leading-none text-secondary">~{{ yearsPlus(starts.trading) }}</div>
          <span class="text-base-content/60 text-xl">y</span>
        </div>
        <div class="stat-desc">Smart Money Concepts</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

// Props let you override dates/data without touching logic
const props = defineProps({
  starts: {
    type: Object,
    default: () => ({
      coding: '2016-01-01',
      trading: '2025-09-01',
      web3: '2018-01-01',
      ai: '2024-01-01'
    })
  }
})

const starts = props.starts

/**
 * Returns "N+" for full years since a date.
 * If under a year, returns "<1".
 */
function yearsPlus(dateish) {
  const start = typeof dateish === 'number'
    ? new Date(dateish, 0, 1)
    : new Date(dateish)

  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  const m = now.getMonth() - start.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < start.getDate())) years--

  if (years < 1) return '1'
  return `${years}+`
}

function formatPct(v) {
  return `${Math.round(v).toLocaleString()}%`
}

/* --- Sparkline (responsive, no external libs) --- */
const chartW = 120
const chartH = 36
const padding = 2

const roiLast = computed(() => props.roiPoints.at(-1) ?? 0)

const linePoints = computed(() => {
  const pts = props.roiPoints
  if (!pts.length) return ''
  const min = Math.min(...pts)
  const max = Math.max(...pts)
  const span = max - min || 1
  const stepX = (chartW - padding * 2) / Math.max(pts.length - 1, 1)

  return pts
    .map((v, i) => {
      const x = padding + i * stepX
      const norm = (v - min) / span
      const y = padding + (1 - norm) * (chartH - padding * 2)
      return `${x},${y}`
    })
    .join(' ')
})

const areaPath = computed(() => {
  const points = linePoints.value.split(' ')
  if (!points.length || !points[0]) return ''
  const top = `M ${points[0]} L ${points.slice(1).join(' ')}`
  // Close to bottom baseline for a soft area fill
  return `${top} L ${chartW - padding},${chartH - padding} L ${padding},${chartH - padding} Z`
})
</script>

<style scoped>
/* Gentle entrance for the sparkline */
polyline {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: draw 1s ease-out forwards;
}
@keyframes draw { to { stroke-dashoffset: 0; } }
</style>
