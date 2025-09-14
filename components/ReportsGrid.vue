<template>
  <div class="grid md:grid-cols-3 gap-6">
    <NuxtLink
      v-for="(report, i) in reports"
      :key="report.path"
      :to="report.path"
      :class="[
        'card bg-base-200/60 border border-base-300/20 shadow flex flex-col hover:shadow-lg hover:bg-base-300 hover:outline transition-shadow',
        i === 0 ? 'md:col-span-3' : '' // first report spans full width
      ]"
    >
      <div class="card-body flex flex-col gap-4">
        <h3 class="card-title text-lg">{{ report.title }}</h3>
        <p class="opacity-80 text-sm">
          {{ new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </p>
        <div class="card-actions justify-end mt-auto">
          <button class="btn btn-sm btn-outline">Read Report</button>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useReports } from '~/composables/useReports'

const { reports } = useReports()
</script>
