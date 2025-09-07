<template>
  <div class="min-h-screen bg-base-100 text-base-content relative overflow-hidden">
    <!-- Background Accents (match index.vue vibe) -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -top-40 -right-32 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-30 bg-gradient-to-br from-primary/40 via-secondary/40 to-accent/40 animate-gradient"></div>
      <div class="absolute -bottom-40 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-accent/30 via-secondary/20 to-primary/20 animate-gradient [animation-delay:1.6s]"></div>
      <div class="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-base-300/60 to-transparent"></div>
    </div>

    <!-- Header / Hero -->
    <header class="sticky top-0 z-40 border-b border-base-300/60 bg-base-100/60 backdrop-blur">
      <div class="container mx-auto px-4 py-10">
        <div class="grid md:grid-cols-[1.2fr_.8fr] gap-8 items-end">
          <div>
            <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              <span class="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">{{ reportMeta?.title || 'Daily Market Insights' }}</span>
            </h1>
            <p class="mt-2 text-sm opacity-70">{{ formatDate(reportMeta?.date) }}</p>
            <div class="mt-6 flex flex-wrap gap-2">
              <a v-for="t in reportMeta?.tags" :key="t" class="badge badge-outline">{{ t }}</a>
            </div>
          </div>
          <div class="flex md:justify-end items-center gap-2">
            <NuxtLink class="btn btn-ghost btn-outline btn-sm" to="/">Back</NuxtLink>
            <div class="dropdown dropdown-end">
              <label tabindex="0" class="btn btn-secondary btn-sm shadow-lg shadow-secondary/20">
                Reports
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </label>
              <ul tabindex="0" class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300/60 max-h-[80vh] overflow-y-auto mt-1">
                <li v-for="report in reports" :key="report.path">
                  <NuxtLink :to="report.path" class="font-medium">
                    <span class="text-sm">{{ formatDate(report.date, 'short') }}</span>
                    <span class="text-xs opacity-70">{{ report.title }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <slot />

    <!-- Footer -->
    <footer class="relative z-10 py-10 border-t border-base-300/60">
      <div class="container mx-auto px-4 text-sm opacity-70">
        <p>For decision support. Not financial advice.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useReports } from '../composables/useReports'

const { reports, reportMeta } = useReports()

function formatDate(date?: string, style: 'full' | 'short' = 'full') {
  if (!date) return ''
  const d = new Date(date)
  if (style === 'short') {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(d)
  }
  return new Intl.DateTimeFormat('en-US', { 
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  }).format(d)
}
</script>

<style scoped>
.animate-gradient { background-size: 300% 300%; animation: gradientShift 8s ease infinite; }
@keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
</style>
