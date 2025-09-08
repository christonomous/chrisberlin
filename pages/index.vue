<template>
  <div class="min-h-screen bg-base-100 text-base-content relative overflow-hidden">
    <!-- Background Accents -->
    <div class="pointer-events-none absolute inset-0 opacity-40">
      <div class="absolute -top-24 -right-24 w-[40rem] h-[40rem] rounded-full blur-3xl bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 animate-gradient"></div>
      <div class="absolute -bottom-24 -left-24 w-[32rem] h-[32rem] rounded-full blur-3xl bg-gradient-to-r from-accent/20 via-secondary/20 to-primary/20 animate-gradient [animation-delay:2s]"></div>
    </div>

    <!-- <button 
      class="btn bg-gradient-to-r from-primary via-secondary to-accent animate-gradient text-white btn-circle btn-lg fixed bottom-5 right-5 shadow-lg hover:shadow-xl transition-shadow z-50"
      @click="toggleWidget"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button> -->

    <!-- Chat Widget -->
    <div v-if="isOpen" class="fixed bottom-24 right-5 z-50 w-[400px]">
      <ChatWidget @close="closeWidget" />
    </div>

    <!-- HERO -->
    <section class="relative isolate">
      <div class="container mx-auto max-w-6xl px-4 pt-12 md:pt-20 grid md:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
        <div>
          <h1 class="text-4xl md:text-6xl leading-tight font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
            Buy Back Your Time
          </h1>
          <p class="opacity-80 text-lg md:text-xl max-w-2xl">
            Time is <span class="font-semibold">the most valuable asset</span>.
          </p>
          <!-- <div class="mt-8 flex flex-wrap gap-3">
            <a class="btn bg-gradient-to-r from-primary via-secondary to-accent animate-gradient text-base-100 border-0" @click="toggleWidget">Buy some Time</a>
            <a href="#work" class="btn btn-outline">See Proof</a>
          </div> -->
          <div class="mt-6 text-sm opacity-70">
            <span class="inline-flex items-center gap-2">The Future is Automated & Decentralized</span>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="avatar">
            <div class="w-48 rounded-2xl ring-gradient ringring-offset-2 ring-offset-base-100 shadow-xl rounded-full">
              <img :src="profileImage" alt="Chris profile" class=""/>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Links -->
    <section class="flex justify-center gap-4 my-16">
      <!-- <button class="btn btn-lg btn-gradient">Explore My Work</button> -->
      <div class="flex gap-3 py-16" data-aos="fade-up" data-aos-delay="800">
        <a href="https://www.linkedin.com/in/christonomous/" target="_blank" class="btn btn-circle btn-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        <a href="https://www.youtube.com/@Christonomous" target="_blank" class="btn btn-circle btn-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
        </a>
        <a href="https://soundcloud.com/equaliser" target="_blank" class="btn btn-circle btn-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 17.939h-1v-8.068c.308-.231.639-.429 1-.566v8.634zm3 0h1v-9.224c-.229.265-.443.548-.621.857l-.379-.184v8.551zm-2 0h1v-8.848c-.508-.079-.623-.05-1-.01v8.858zm-4 0h1v-7.02c-.312.458-.555.971-.692 1.535l-.308-.182v5.667zm-3-5.25c-.606.547-1 1.354-1 2.268 0 .914.394 1.721 1 2.268v-4.536zm18.879-.671c-.204-2.837-2.404-5.079-5.117-5.079-1.022 0-1.964.328-2.762.877v10.123h9.089c1.607 0 2.911-1.393 2.911-3.106 0-2.233-2.168-3.772-4.121-2.815zm-16.879-.027c-.302-.024-.526-.03-1 .122v5.689c.446.143.636.138 1 .138v-5.949z"/></svg>
        </a>
        <a href="https://github.com/christonomous" target="_blank" class="btn btn-circle btn-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
      </div>
    </section>

    <!-- <AiDefiIntersectSection/> -->

    <!-- OFFER / HOOK -->
    <section id="offer" class="container mx-auto max-w-6xl px-4">
      <div class="card bg-base-200/50 shadow-xl border border-base-300/30">
        <div class="card-body grid md:grid-cols-3 gap-6">
          <div>
            <h2 class="text-2xl font-bold mb-2">Hi, I'm Chris</h2>
            <p class="opacity-80">I identify a high‑leverage for you, so you can <span class="font-semibold">make the most out of your time</span> using AI & DeFi.</p>
          </div>
          <ul class="md:col-span-2 grid sm:grid-cols-2 gap-4">
            <li class="p-4 rounded-xl bg-base-100/60 border border-base-300/20">
              <h3 class="font-semibold">Workflow Automation</h3>
              <p class="text-sm opacity-80">I map your bottleneck and automate your workflows.</p>
            </li>
            <li class="p-4 rounded-xl bg-base-100/60 border border-base-300/20">
              <h3 class="font-semibold">AI Implementation</h3>
              <p class="text-sm opacity-80">I develop you AI Bots, AI OS, and AI Infrastructure to make your business smart.</p>
            </li>
            <li class="p-4 rounded-xl bg-base-100/60 border border-base-300/20">
              <h3 class="font-semibold">Dashboard Development</h3>
              <p class="text-sm opacity-80">Get a custom dashboard to analyze insights and make decisions precise.</p>
            </li>
            <li class="p-4 rounded-xl bg-base-100/60 border border-base-300/20">
              <h3 class="font-semibold">MVP Developement</h3>
              <p class="text-sm opacity-80">Get an app you can launch and validate on your market.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- SOCIAL PROOF / BRANDS -->
    <section class="container mx-auto max-w-6xl px-4 my-16">
      <ul class="steps steps-vertical lg:steps-horizontal w-full mb-12 text-center" data-aos="fade-up" data-aos-delay="200">
        <li class="step step-primary">
          <div class="flex flex-col items-center">
            <span class="text-lg font-semibold">2011</span>
            <span class="text-sm text-base-content/80">System Admin</span>
          </div>
        </li>
        <li class="step step-primary">
          <div class="flex flex-col items-center">
            <span class="text-lg font-semibold">2016</span>
            <span class="text-sm text-base-content/80">Developer</span>
          </div>
        </li>
        <li class="step step-primary">
          <div class="flex flex-col items-center">
            <span class="text-lg font-semibold">2020</span>
            <span class="text-sm text-base-content/80">Crypto Startups</span>
          </div>
        </li>
        <li class="step step-primary">
          <div class="flex flex-col items-center">
            <span class="text-lg font-semibold">2024</span>
            <span class="text-sm text-base-content/80">AI Automation Agency</span>
          </div>
        </li>
        <li class="step step-secondary">
          <div class="flex flex-col items-center">
            <span class="text-lg font-semibold">2025</span>
            <span class="text-sm text-base-content/80">AI x DeFi</span>
          </div>
        </li>
        <li class="step">
          <div class="flex flex-col items-center">
            <span class="text-lg font-semibold">Future</span>
            <span class="text-sm text-base-content/80">DAO 2.0</span>
          </div>
        </li>
      </ul>
    </section>

    <!-- WORK HIGHLIGHTS -->
    <section id="work" class="container mx-auto max-w-6xl px-4 mt-16">
      <h2 class="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">My Businesses</h2>
      <div class="grid gap-6 pb-6">
        <article class="card bg-base-200/60 border border-base-300/20 shadow flex flex-col">
          <div class="card-body flex flex-col gap-4">
            <div class="flex items-center gap-4">
              <img src="https://revoro.consulting/logo_light.svg" alt="Revoro Consulting" class="w-10 h-10 object-contain rounded-full" />
              <h3 class="card-title">Revoro Consulting</h3>
            </div>
            <p class="opacity-80">We help founders, teams, and enterprises research, design, and deploy AI‑powered solutions - from workflow automation to full‑stack SaaS. <br> <b>Whether you need an AI integration, a training program, or a shipped MVP, we make it happen.</b></p>
            <div class="card-actions justify-end mt-auto">
              <a class="btn btn-sm btn-outline" href="https://www.linkedin.com/company/autonomousenterprises" target="_blank">Get Free Consultation</a>
            </div>
          </div>
        </article>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <article class="card bg-base-200/60 border border-base-300/20 shadow flex flex-col">
          <div class="card-body flex flex-col gap-4">
            <div class="flex items-center gap-4">
              <img src="https://media.licdn.com/dms/image/v2/D4D0BAQF0S4VAwbLFUQ/company-logo_200_200/company-logo_200_200/0/1704713473491/autonomousenterprises_logo?e=1759363200&v=beta&t=imLwotHyFMKG6gHJJLKskJ_MHpqdUiO-GOB7z-k1qeU" alt="Autonomous Enterprises" class="w-10 h-10 object-contain rounded-full" />
              <h3 class="card-title">Autonomous Enterprises</h3>
            </div>
            <p class="opacity-80">AI‑driven DAOs: autonomous org tooling, agent governance, and cross‑chain execution.</p>
            <div class="card-actions justify-end mt-auto">
              <a class="btn btn-sm btn-outline" href="https://www.linkedin.com/company/autonomousenterprises" target="_blank">Discuss Agents</a>
            </div>
          </div>
        </article>
        <article class="card bg-base-200/60 border border-base-300/20 shadow flex flex-col">
          <div class="card-body flex flex-col gap-4">
            <div class="flex items-center gap-4">
              <img src="https://media.licdn.com/dms/image/v2/D4E0BAQFl_4AuSLroyw/company-logo_200_200/company-logo_200_200/0/1680593144768/cunoro_logo?e=1759363200&v=beta&t=px9sHdAmPFDJKgIb7yF14sJySpZCEbU-3V0YImfkFxI" alt="Zillions" class="w-10 h-10 object-contain rounded-full" />
              <h3 class="card-title">Zillions</h3>
            </div>
            <p class="opacity-80">On‑chain AI algo‑trader: data ingestion, risk rails, strategy orchestration.</p>
            <div class="card-actions justify-end mt-auto">
              <a class="btn btn-sm btn-outline" href="https://zillions.app/" target="_blank">Talk Trading</a>
            </div>
          </div>
        </article>
        <article class="card bg-base-200/60 border border-base-300/20 shadow flex flex-col">
          <div class="card-body flex flex-col gap-4">
            <div class="flex items-center gap-4">
              <img src="https://brane.media/logo_light.png" alt="BRANE Media" class="w-10 h-10 object-contain rounded-full" />
              <h3 class="card-title">BRANE Media</h3>
            </div>
            <p class="opacity-80">AI‑driven leadgen + funnel builder: agents that research, write, launch, and iterate.</p>
            <div class="card-actions justify-end mt-auto">
              <a class="btn btn-sm btn-outline" href="https://brane.media/" target="_blank">Scale Leads</a>
            </div>
          </div>
        </article>
        <article class="card bg-base-200/60 border border-base-300/20 shadow flex flex-col">
          <div class="card-body flex flex-col gap-4">
            <div class="flex items-center gap-4">
              <img src="https://media.licdn.com/dms/image/v2/D4D0BAQEU4b6OdQGRgA/company-logo_200_200/company-logo_200_200/0/1725449672013/nujindevelopment_logo?e=1759363200&v=beta&t=XTIce-doDUorX5A9pFBl35P5tlmHfK7x8f5wz77_Kys" alt="Nujins" class="w-10 h-10 object-contain rounded-full" />
              <h3 class="card-title">Nujin</h3>
            </div>
            <p class="opacity-80">Text‑to‑SaaS: turn specs into shipped MVPs with agentic scaffolding.</p>
            <div class="card-actions justify-end mt-auto">
              <a class="btn btn-sm btn-outline" href="https://nujin.ai/" target="_blank">Ship Faster</a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Reports -->
    <section class="container mx-auto max-w-6xl px-4 mt-16">
      <h2 class="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">Latest Reports</h2>
      <ReportsGrid />
    </section>

    <!-- FAQ -->
    <!-- <section id="faq" class="container mx-auto max-w-6xl px-4 mt-16 mb-24">
      <h2 class="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">FAQ</h2>
      <div class="join join-vertical w-full">
        <div class="collapse collapse-arrow join-item border border-base-300/20 bg-base-200/60">
          <input type="radio" name="faq" checked />
          <div class="collapse-title text-lg font-medium">What stacks do you use?</div>
          <div class="collapse-content opacity-80">
            <p>Vue/React, Node/Go/Python, Postgres/ClickHouse, Vercel/Fly/K8s. For AI: OpenAI, Anthropic, fine‑tuned LLMs, vector DBs, LangChain/LangGraph or custom orchestrators, proper evals.</p>
          </div>
        </div>
        <div class="collapse collapse-arrow join-item border border-base-300/20 bg-base-200/60">
          <input type="radio" name="faq" />
          <div class="collapse-title text-lg font-medium">How do we measure ROI?</div>
          <div class="collapse-content opacity-80">
            <p>We define success metrics upfront (hours saved, CAC/LTV lift, error rate drop, revenue impact) and track them in a shared dashboard.</p>
          </div>
        </div>
        <div class="collapse collapse-arrow join-item border border-base-300/20 bg-base-200/60">
          <input type="radio" name="faq" />
          <div class="collapse-title text-lg font-medium">Can you work with regulated industries?</div>
          <div class="collapse-content opacity-80">
            <p>Yes. I build with privacy, security, and auditability in mind: data minimization, encryption at rest/in‑transit, role‑based access, logging, and red‑team prompts.</p>
          </div>
        </div>
      </div>
    </section> -->

    <!-- FOOTER -->
    <footer class="border-t border-base-300/30 py-10">
      <div class="container mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="opacity-70">© {{ new Date().getFullYear() }} Chris - AI & Crypto Entrepreneur</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import ChatWidget from '~/components/chat/ChatWidget.vue'
import ReportsGrid from '~/components/ReportsGrid.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 50
  })
})

const props = defineProps<{ profileImage?: string }>()
const profileImage = computed(() => props.profileImage ?? '/profile.jpg')
const isOpen = ref(false)

const toggleWidget = () => {
  isOpen.value = !isOpen.value
}

const form = reactive({
  name: '',
  email: '',
  company: '',
  goal: '',
  ndacall: false,
})
const submitted = ref(false)

function onSubmit(){
  // TODO: integrate with your backend or form tool
  console.log('Lead', { ...form })
  submitted.value = true
}
</script>

<style scoped>
/* Animated brand gradient utility (used by headings & buttons) */
.animate-gradient{ background-size:300% 300%; animation:gradientShift 8s ease infinite; }
@keyframes gradientShift{ 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

/* Card glow on hover for the Apple/Revolut vibe */
.card:hover{ box-shadow: 0 10px 30px 0 rgb(0 0 0 / .25), 0 0 0 1px color-mix(in oklab, var(--fallback-p,oklch(var(--p))), transparent 85%); transition: box-shadow .3s ease; }
</style>
