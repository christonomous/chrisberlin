<template>
  <section class="container mx-auto max-w-6xl px-4 mt-16" id="reports">
    <h2 class="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">Latest Market Reports</h2>
    <ReportsGrid />
  </section>
</template>

<script setup lang="ts">
import ReportsGrid from '~/components/ReportsGrid.vue'
</script>
