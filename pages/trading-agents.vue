<template>
  <div class="min-h-screen bg-base-100 text-base-content relative overflow-hidden">
    <!-- Background Accents -->
    <div class="pointer-events-none absolute inset-0 opacity-40">
      <div class="absolute -top-24 -right-24 w-[40rem] h-[40rem] rounded-full blur-3xl bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 animate-gradient"></div>
      <div class="absolute -bottom-24 -left-24 w-[32rem] h-[32rem] rounded-full blur-3xl bg-gradient-to-r from-accent/20 via-secondary/20 to-primary/20 animate-gradient [animation-delay:2s]"></div>
    </div>

    <!-- Page Sections -->
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <PerformanceSection />
    <DifferentiatorsSection />
    <CollaborationSection />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '~/components/trading/HeroSection.vue'
import AboutSection from '~/components/trading/AboutSection.vue'
import ProjectsSection from '~/components/trading/ProjectsSection.vue'
import PerformanceSection from '~/components/trading/PerformanceSection.vue'
import DifferentiatorsSection from '~/components/trading/DifferentiatorsSection.vue'
import CollaborationSection from '~/components/trading/CollaborationSection.vue'
import FooterSection from '~/components/trading/FooterSection.vue'
</script>

<style>
/* Animated brand gradient utility (used by headings & buttons) */
.animate-gradient{ background-size:300% 300%; animation:gradientShift 8s ease infinite; }
@keyframes gradientShift{ 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

/* Card glow on hover for the Apple/Revolut vibe */
.card:hover{ box-shadow: 0 10px 30px 0 rgb(0 0 0 / .25), 0 0 0 1px color-mix(in oklab, var(--fallback-p,oklch(var(--p))), transparent 85%); transition: box-shadow .3s ease; }
</style>
