<template>
  <PasswordProtection correctPassword="onchain2025">
    <main class="min-h-screen bg-gradient-to-b from-base-100 to-base-200/30 text-base-content">
    <!-- ================= HERO / MAGAZINE COVER ================= -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-base-100/10 via-transparent to-transparent"></div>
      <div class="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28 lg:pb-24 relative">
        <div class="grid gap-12 lg:grid-cols-12 items-end">
          <header class="lg:col-span-8">
            <div class="flex items-center gap-4 mb-6">
              <p class="badge bg-[#f34336] badge-lg">Special Report</p>
              <div class="h-[2px] flex-1 bg-gradient-to-r from-primary/30 to-transparent"></div>
            </div>
            <h1 class="text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight bg-[#f34336] bg-clip-text text-transparent">
              Why <span class="text-base-content">Onchain Foundation</span> × Chris<br/>
              is a Fit
            </h1>
            <p class="mt-8 text-xl lg:text-2xl opacity-90 max-w-3xl font-light leading-relaxed">
              Weaving narrative with live on‑chain metrics to make insights actionable.
            </p>
          </header>
          <aside class="lg:col-span-4">
            <div class="flex flex-col items-center gap-6">
              <div class="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-base-100/50 shadow-xl">
                <img src="/chris.jpg" alt="Chris" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div class="stat bg-base-100/50 backdrop-blur-sm rounded-box shadow-lg border border-base-300">
                <div class="stat-title font-medium">Years in Web3</div>
                <div class="stat-value text-[#f34336]">7+</div>
                <div class="stat-desc text-sm">DeFi • Tokenization • AI</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div class="divider mx-auto max-w-7xl px-6 before:bg-gradient-to-r before:from-transparent before:via-base-content/20 before:to-transparent after:bg-gradient-to-r after:from-transparent after:via-base-content/20 after:to-transparent">
        <div class="badge badge-outline">Scroll to explore</div>
      </div>
    </section>

    <!-- ================= SECTION 1: STORY + PULL QUOTE ================= -->
    <section class="mx-auto max-w-7xl px-6 py-20">
      <div class="grid gap-12 lg:grid-cols-12 items-start">
        <div class="lg:col-span-7">
          <h2 class="text-3xl lg:text-5xl font-black leading-tight bg-gradient-to-br from-base-content to-base-content/70 bg-clip-text text-transparent">
            My Path to Here
          </h2>
          <p class="mt-8 text-lg lg:text-xl leading-relaxed opacity-90 font-light">
            I've been building and experimenting in Web3 for years  -  from DeFi to tokenization. Some may remember me
            from a panel appearance at the <span class="font-medium">Lisk Center in Berlin</span>. Not every startup I launched took off, but each added
            practical insight into what accelerates  -  and what blocks  -  real adoption. That journey, combined with my
            current AI work, sharpened my focus: dedicate the next chapter to research, reporting, and data‑driven
            transparency.
          </p>
        </div>
        <blockquote class="lg:col-span-5 rounded-2xl bg-base-100 p-8 lg:p-10 shadow-xl border border-base-300 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
          <p class="text-2xl lg:text-3xl font-semibold leading-relaxed relative">
            "Good research doesn't just <em>describe</em> the chain  -  it <span class="underline decoration-[#f34336] decoration-2">explains</span> it.
            That's why I want to turn raw metrics into decisions people can trust."
          </p>
        </blockquote>
      </div>
    </section>

    <!-- ================= SECTION 2: STABLECOINS (TEXT × CHART) ================= -->
    <section class="bg-gradient-to-br from-base-200/80 to-base-200/40">
      <div class="mx-auto max-w-7xl px-6 py-20">
        <div class="grid gap-12 lg:grid-cols-12 items-start">
          <article class="lg:col-span-5 order-2 lg:order-1">
            <h3 class="text-2xl lg:text-4xl font-black leading-tight bg-gradient-to-br from-base-content to-base-content/70 bg-clip-text text-transparent">
              Web3 Adoption & Why Reports Matter
            </h3>
            <p class="mt-6 text-lg lg:text-xl opacity-90 font-light leading-relaxed">
              Web3 adoption is no longer hypothetical  -  by 2025, there are around <span class="font-bold text-[#f34336]">820 million active wallets worldwide</span>. Nearly <span class="font-bold text-[#f34336]">43% are in Asia-Pacific (~350M)</span>, while <span class="font-bold text-[#f34336]">Europe (~140M)</span> and <span class="font-bold text-[#f34336]">Africa (~75M)</span> are catching up fast.
            </p>
            <p class="mt-4 text-lg lg:text-xl opacity-90 font-light leading-relaxed">
              But raw numbers don't equal understanding. Without clear reports and dashboards, it's impossible to see where adoption is real, where users drop off, and which regions face friction. That's why transparent, data-driven reporting is critical: it turns wallet counts into <span class="font-medium">insights that guide policy, strategy, and real-world adoption</span>.
            </p>
            <div class="mt-8 grid grid-cols-3 gap-4">
              <div class="stat bg-base-200 rounded-box shadow-lg border border-base-300">
                <div class="stat-title font-medium">Total Wallets</div>
                <div class="stat-value text-[#f34336]">820M</div>
                <div class="stat-desc text-sm">Worldwide</div>
              </div>
              <div class="stat bg-base-200 rounded-box shadow-lg border border-base-300">
                <div class="stat-title font-medium">Top Region</div>
                <div class="stat-value text-[#f34336]">43%</div>
                <div class="stat-desc text-sm">Asia-Pacific</div>
              </div>
              <div class="stat bg-base-200 rounded-box shadow-lg border border-base-300">
                <div class="stat-title font-medium">Growth Areas</div>
                <div class="stat-value text-[#f34336]">3</div>
                <div class="stat-desc text-sm">Major regions</div>
              </div>
            </div>
          </article>
          <div class="lg:col-span-7 order-1 lg:order-2">
            <div class="card bg-base-100 shadow-xl border border-base-300">
              <div class="card-body">
                <div class="flex items-center justify-between gap-4">
                  <h4 class="card-title text-lg font-bold">Wallet Adoption by Region (2025)</h4>
                  <span class="badge badge-outline">Global Data</span>
                </div>
                <div class="h-80">
                  <canvas ref="walletCanvas"></canvas>
                </div>
                <div class="mt-4 overflow-x-auto">
                  <table class="table table-xs">
                    <thead>
                      <tr>
                        <th>Region</th>
                        <th class="text-right">Users (M)</th>
                        <th class="text-right">Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Asia-Pacific</td>
                        <td class="text-right font-medium">350</td>
                        <td class="text-right text-[#f34336]">43%</td>
                      </tr>
                      <tr>
                        <td>Europe</td>
                        <td class="text-right font-medium">140</td>
                        <td class="text-right text-[#f34336]">17%</td>
                      </tr>
                      <tr>
                        <td>North America</td>
                        <td class="text-right font-medium">120</td>
                        <td class="text-right text-[#f34336]">15%</td>
                      </tr>
                      <tr>
                        <td>Latin America</td>
                        <td class="text-right font-medium">95</td>
                        <td class="text-right text-[#f34336]">12%</td>
                      </tr>
                      <tr>
                        <td>Africa</td>
                        <td class="text-right font-medium">75</td>
                        <td class="text-right text-[#f34336]">9%</td>
                      </tr>
                      <tr>
                        <td>Other</td>
                        <td class="text-right font-medium">40</td>
                        <td class="text-right text-[#f34336]">5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 3: TVL COMPARISON (CHART × TEXT) ================= -->
    <section class="mx-auto max-w-7xl px-6 py-20">
      <div class="grid gap-12 lg:grid-cols-12 items-start">
        <div class="lg:col-span-7">
          <div class="card bg-base-100 shadow-xl border border-base-300">
            <div class="card-body">
              <div class="flex items-center justify-between gap-4">
                <h4 class="card-title text-lg font-bold">Wallet Retention Comparison</h4>
                <span class="badge badge-outline">ndlabs.dev</span>
              </div>
              <div class="h-80">
                <canvas ref="retentionCanvas"></canvas>
              </div>
              <div class="mt-4 overflow-x-auto">
                <table class="table table-xs">
                  <thead>
                    <tr>
                      <th>Wallet</th>
                      <th class="text-right">1-day</th>
                      <th class="text-right">7-day</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Binance Web3 Wallet</td>
                      <td class="text-right font-medium">24%</td>
                      <td class="text-right font-medium">13%</td>
                    </tr>
                    <tr>
                      <td>Uniswap Smart Wallet</td>
                      <td class="text-right font-medium">40%</td>
                      <td class="text-right font-medium">30%</td>
                    </tr>
                  </tbody>
                </table>
                <p class="mt-4 text-sm opacity-70">Source: "Understanding User Retention in Crypto Wallets" (ndlabs.dev)</p>
              </div>
            </div>
          </div>
        </div>
        <article class="lg:col-span-5">
          <h3 class="text-2xl lg:text-4xl font-black leading-tight bg-gradient-to-br from-base-content to-base-content/70 bg-clip-text text-transparent">
            With Hype → Evidence
          </h3>
          <p class="mt-6 text-lg lg:text-xl opacity-90 font-light leading-relaxed">
            Web3 hype gets attention. But retention reveals what's real. For example: of all new wallets using <span class="font-medium">Binance Web3 Wallet</span>, only about <span class="text-[#f34336] font-bold">24% return after one day</span>, and just <span class="text-[#f34336] font-bold">13% after seven days</span>. Uniswap's smart wallet does better, but still only around <span class="text-[#f34336] font-bold">40% after one day</span> and <span class="text-[#f34336] font-bold">30% after a week</span>.
          </p>
          <p class="mt-4 text-lg lg:text-xl opacity-90 font-light leading-relaxed">
            These numbers show that acquiring users is not the hard part  -  keeping them is. Reports and dashboards that track retention, cohort behavior, drop-off points and engagement curves turn hype into actionable evidence.
          </p>
          <div class="mt-8 grid grid-cols-2 gap-4">
            <div class="stat bg-base-200 rounded-box shadow-lg border border-base-300">
              <div class="stat-title font-medium">Binance Web3 Wallet</div>
              <div class="stat-value text-[#f34336]">24%</div>
              <div class="stat-desc text-sm">1-day retention</div>
            </div>
            <div class="stat bg-base-200 rounded-box shadow-lg border border-base-300">
              <div class="stat-title font-medium">Uniswap Smart Wallet</div>
              <div class="stat-value text-[#f34336]">40%</div>
              <div class="stat-desc text-sm">1-day retention</div>
            </div>
          </div>
          <p class="mt-8 text-lg opacity-90 font-medium">
            <span class="text-[#f34336]">What I can bring:</span> dashboards + narrative that reveal <em>where</em> users leave, <em>why</em>, and <em>how small changes</em> (onboarding, UX, incentive loops) can shift those curves upward. Data not just to brag, but to build.
          </p>
        </article>
      </div>
    </section>

    <!-- ================= SECTION 4: DEVELOPERS ================= -->
    <section class="bg-gradient-to-br from-base-200/80 to-base-200/40">
      <div class="mx-auto max-w-7xl px-6 py-20">
        <div class="grid gap-12 lg:grid-cols-12 items-start">
          <article class="lg:col-span-5 order-2 lg:order-1">
            <h3 class="text-2xl lg:text-4xl font-black leading-tight bg-gradient-to-br from-base-content to-base-content/70 bg-clip-text text-transparent">
              Builders as a Leading Indicator
            </h3>
            <p class="mt-6 text-lg lg:text-xl opacity-90 font-light leading-relaxed">
              Adoption isn't only capital  -  it's creators. Where developers gather, sustainable ecosystems emerge. Monthly active developers contributing to open-source Web3 projects have grown from <span class="font-bold text-[#f34336]">~18,000 in 2019</span> to over <span class="font-bold text-[#f34336]">25,000 in 2021</span>, then settled at <span class="font-bold text-[#f34336]">~25,419 in 2023</span>, before adjusting to <span class="font-bold text-[#f34336]">~23,615 in 2024</span>.
            </p>
            <p class="mt-4 text-lg lg:text-xl opacity-90 font-light leading-relaxed">
              This trend illustrates that developer activity leads market cycles: growth phases bring new builders; plateaus (or declines) warn of friction, waning incentive or attention diversion.
            </p>
            <p class="mt-4 text-lg lg:text-xl opacity-90 font-light leading-relaxed">
              <b>With sharp dashboards, Onchain Fundation could spot early when an ecosystem is losing builder momentum  -  and help redirect support, tools, or research to keep that flame alive</b>
            </p>
            <div class="mt-8 grid grid-cols-2 gap-4">
              <div class="stat bg-base-200 rounded-box shadow-lg border border-base-300">
                <div class="stat-title font-medium">Peak Developers</div>
                <div class="stat-value text-[#f34336]">25.4k</div>
                <div class="stat-desc text-sm">2023 high point</div>
              </div>
              <div class="stat bg-base-200 rounded-box shadow-lg border border-base-300">
                <div class="stat-title font-medium">Growth from 2019</div>
                <div class="stat-value text-[#f34336]">+41%</div>
                <div class="stat-desc text-sm">Over 5 years</div>
              </div>
            </div>
          </article>
          <div class="lg:col-span-7 order-1 lg:order-2">
            <div class="card bg-base-100 shadow-xl border border-base-300">
              <div class="card-body">
                <div class="flex items-center justify-between gap-4">
                  <h4 class="card-title text-lg font-bold">Monthly Active Web3 Developers</h4>
                  <span class="badge badge-outline">Electric Capital</span>
                </div>
                <div class="h-80">
                  <canvas ref="devCanvas"></canvas>
                </div>
                <div class="mt-4 overflow-x-auto">
                  <table class="table table-xs">
                    <thead>
                      <tr>
                        <th>Year</th>
                        <th class="text-right">Active Devs</th>
                        <th>Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2019</td>
                        <td class="text-right font-medium">~18,000</td>
                        <td class="text-sm opacity-70">Baseline</td>
                      </tr>
                      <tr>
                        <td>2021</td>
                        <td class="text-right font-medium">~25,000</td>
                        <td class="text-sm opacity-70">Peak growth period</td>
                      </tr>
                      <tr>
                        <td>2023</td>
                        <td class="text-right font-medium">25,419</td>
                        <td class="text-sm opacity-70">Nominal high</td>
                      </tr>
                      <tr>
                        <td>2024</td>
                        <td class="text-right font-medium">23,615</td>
                        <td class="text-sm opacity-70">7% decline from peak</td>
                      </tr>
                    </tbody>
                  </table>
                  <p class="mt-4 text-sm opacity-70">Source: Electric Capital Developer Report, via Crypto Council for Innovation & Hashlock</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 5: VISION & METHOD ================= -->
    <section class="mx-auto max-w-7xl px-6 py-20">
      <div class="grid gap-12 lg:grid-cols-12 items-start">
        <article class="lg:col-span-7 prose max-w-none">
          <h3 class="text-2xl lg:text-4xl font-black leading-tight bg-gradient-to-br from-base-content to-base-content/70 bg-clip-text text-transparent mb-8">
            Long‑Term Vision
          </h3>
          <p class="text-lg lg:text-xl opacity-90 font-light leading-relaxed">
            I don't see this as freelancing. I see this as joining a mission:
          </p>
          <ul class="mt-6 space-y-4 list-none pl-0">
            <li class="flex items-start gap-3">
              <span class="badge badge-primary badge-sm mt-1.5">1</span>
              <span class="opacity-90 text-lg">Make research more <span class="font-medium">accessible through visuals</span></span>
            </li>
            <li class="flex items-start gap-3">
              <span class="badge badge-primary badge-sm mt-1.5">2</span>
              <span class="opacity-90 text-lg">Turn <span class="font-medium">raw on‑chain data into narrative insights</span></span>
            </li>
            <li class="flex items-start gap-3">
              <span class="badge badge-primary badge-sm mt-1.5">3</span>
              <span class="opacity-90 text-lg">Combine <span class="font-medium">AI + Web3 analytics</span> to inform policymakers, enterprises, and founders</span>
            </li>
          </ul>
        </article>
        <aside class="lg:col-span-5">
          <div class="card bg-base-100 shadow-xl border border-base-300" id="methodology">
            <div class="card-body">
              <h4 class="card-title font-bold">Why Onchain Foundation</h4>
              <p class="text-base opacity-90 italic">"I've been following Onchain Foundation for a while now, and something deep inside me says it feels like home. Your commitment to clarity and truth in Web3 resonates with everything I believe in."</p>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- ================= CONTACT ================= -->
    <section class="bg-gradient-to-br from-primary/5 to-transparent">
      <div class="mx-auto max-w-7xl px-6 py-20" id="contact">
        <div class="card bg-base-100 shadow-xl border border-base-300">
          <div class="card-body">
            <h4 class="card-title text-2xl font-black">Let's Build</h4>
            <p class="text-lg opacity-90">Onchain is building the credibility Web3 needs. I'd love to help ensure every report is not just written,
              but <em>felt</em>  -  through data, visuals, and narrative.</p>
            <div class="mt-6 flex flex-wrap gap-4">
              <a href="mailto:chris@revoro.consulting" class="btn bg-[#f34336] btn-lg">Email Me</a>
              <a href="/" class="btn btn-outline btn-lg">Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Links -->
    <section class="flex justify-center gap-4">
      <!-- <button class="btn btn-lg btn-gradient">Explore My Work</button> -->
      <div class="flex flex-wrap justify-center gap-3 py-16" data-aos="fade-up" data-aos-delay="800">
        <a href="https://www.linkedin.com/in/christonomous/" target="_blank" class="btn btn-circle btn-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        <a href="https://medium.com/@christonomous" target="_blank" class="btn btn-circle btn-lg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1633.77 1150.51" class="h-6 w-6" fill="currentColor"><g id="Symbol"><path d="M883.45,576.26c0,163.67-131.78,296.35-294.33,296.35S294.78,739.93,294.78,576.26,426.56,279.9,589.12,279.9,883.45,412.59,883.45,576.26"></path><path d="M1206.34,576.26c0,154.06-65.89,279-147.17,279S912,730.32,912,576.26s65.88-279,147.16-279,147.17,124.9,147.17,279"></path><path d="M1338.41,576.26c0,138-23.17,249.94-51.76,249.94s-51.75-111.91-51.75-249.94,23.17-249.94,51.75-249.94,51.76,111.9,51.76,249.94"></path></g></svg>
        </a>
        <a href="https://x.com/Christonomous" target="_blank" class="btn btn-circle btn-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://github.com/christonomous" target="_blank" class="btn btn-circle btn-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
      </div>
    </section>
  </main>
  </PasswordProtection>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import PasswordProtection from '../components/PasswordProtection.vue'
import {
  Chart,
  LineController,
  DoughnutController,
  BarController,
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(
  LineController,
  DoughnutController,
  BarController,
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend
)

// Canvas refs
const walletCanvas = ref<HTMLCanvasElement | null>(null)
const retentionCanvas = ref<HTMLCanvasElement | null>(null)
const devCanvas = ref<HTMLCanvasElement | null>(null)

let walletChart: Chart | null = null
let retentionChart: Chart | null = null
let devChart: Chart | null = null

const tokenTerminalKey = ref<string>('')

function destroyChart(c: Chart | null) { if (c) c.destroy() }

function fmtDate(ts: number) {
  const d = new Date(ts * 1000)
  return d.toLocaleDateString(undefined, { year: '2-digit', month: 'short' })
}

async function fetchJSON(url: string, init?: RequestInit, timeoutMs = 12000) {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(url, { ...(init || {}), signal: ctrl.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } finally { clearTimeout(id) }
}

// ---------- Wallet Distribution ----------
async function renderWalletDistribution() {
  await nextTick()
  const ctx = walletCanvas.value?.getContext('2d')
  if (!ctx) return
  destroyChart(walletChart)

  const data = {
    labels: ['Asia-Pacific', 'Europe', 'North America', 'Latin America', 'Africa', 'Other'],
    values: [350, 140, 120, 95, 75, 40]
  }

  walletChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: [
          'rgba(59, 130, 246, 0.9)',   // Primary blue
          'rgba(99, 102, 241, 0.9)',   // Indigo
          'rgba(139, 92, 246, 0.9)',   // Purple
          'rgba(236, 72, 153, 0.9)',   // Pink
          'rgba(248, 113, 113, 0.9)',  // Red
          'rgba(156, 163, 175, 0.9)'   // Gray
        ],
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            padding: 20,
            font: { size: 13 }
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.raw as number
              const total = data.values.reduce((a, b) => a + b, 0)
              const percentage = Math.round((value / total) * 100)
              return `${context.label}: ${value}M (${percentage}%)`
            }
          }
        }
      }
    }
  })
}

// ---------- Retention Comparison ----------
async function renderRetention() {
  await nextTick()
  const ctx = retentionCanvas.value?.getContext('2d')
  if (!ctx) return
  destroyChart(retentionChart)

  const data = {
    labels: ['1-day Retention', '7-day Retention'],
    datasets: [
      {
        label: 'Binance Web3 Wallet',
        data: [24, 13],
        backgroundColor: 'rgba(59, 130, 246, 0.9)', // Primary blue
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 2
      },
      {
        label: 'Uniswap Smart Wallet',
        data: [40, 30],
        backgroundColor: 'rgba(139, 92, 246, 0.9)', // Purple
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 2
      }
    ]
  }

  retentionChart = new Chart(ctx, {
    type: 'bar',
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 20 }
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.raw}% retention`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: (value) => `${value}%`
          }
        }
      }
    }
  })
}

// ---------- Developers (Token Terminal optional) ----------
async function renderDevelopers() {
  await nextTick()
  const ctx = devCanvas.value?.getContext('2d')
  if (!ctx) return
  destroyChart(devChart)

  const data = {
    labels: ['2019', '2021', '2023', '2024'],
    values: [18000, 25000, 25419, 23615]
  }

  devChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Monthly Active Developers',
        data: data.values,
        borderColor: 'rgba(59, 130, 246, 0.9)',
        backgroundColor: (context) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return 'rgba(59, 130, 246, 0.1)'
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)')
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)')
          return gradient
        },
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: 'rgba(59, 130, 246, 0.9)',
        pointBorderColor: 'rgba(255, 255, 255, 0.8)',
        pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.raw as number
              return `${value.toLocaleString()} active developers`
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false }
        },
        y: {
          beginAtZero: false,
          min: 15000,
          ticks: {
            callback: (value) => `${(value as number / 1000).toFixed(0)}k`
          }
        }
      }
    }
  })
}

onMounted(async () => {
  await renderWalletDistribution()
  await renderRetention()
  await renderDevelopers()
})

watch(tokenTerminalKey, async () => { await renderDevelopers() })
</script>

<style scoped>
/* Fine‑tune headings for magazine feel */
:deep(h1) { 
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.badge-lg { 
  height: 2rem; 
  font-size: .9rem;
  font-weight: 500;
}

/* Ensure canvases expand within fixed-height wrappers */
canvas { 
  width: 100% !important; 
  height: 100% !important; 
  display: block;
}

/* Enhance text readability */
.text-lg, .text-xl {
  letter-spacing: -0.01em;
}

/* Gradient text animation */
[class*="from-base-content"] {
  background-size: 200% auto;
  animation: shine 8s ease-in-out infinite;
}

@keyframes shine {
  0% { background-position: 0% center; }
  50% { background-position: 100% center; }
  100% { background-position: 0% center; }
}
</style>
