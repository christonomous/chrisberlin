<template>
  <div class="grid md:grid-cols-3 gap-6">
    <article v-for="report in reports" :key="report.path" class="card bg-base-200/60 border border-base-300/20 shadow flex flex-col hover:shadow-lg transition-shadow">
      <div class="card-body flex flex-col gap-4">
        <h3 class="card-title text-lg">{{ report.title }}</h3>
        <p class="opacity-80 text-sm">{{ new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
        <div class="card-actions justify-end mt-auto">
          <NuxtLink :to="report.path" class="btn btn-sm btn-outline">Read Report</NuxtLink>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useReports } from '~/composables/useReports'

const { reports } = useReports()
</script>
