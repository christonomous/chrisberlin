import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export interface ReportMeta {
  path: string
  date: string
  title: string
  tags: string[]
}

export function useReports() {
  const route = useRoute()

  // This would typically come from an API or build-time generation
  // For now, we'll hardcode the one report we have
  const reports = ref<ReportMeta[]>([
    {
      path: '/reports/ai-defi-market-forecast-tvl-agents-2025-09-13',
      date: '2025-09-13T09:00:00+02:00',
      title: 'AI × DeFi: TVLs, Market Forecast, Agents & Investments',
      tags: ['DeFi TVL', 'AI Tokens', 'AI Agents', 'Forecast', 'Investments', 'Risk']
    },
    {
      path: '/reports/ai-defi-worldcoin-agents-tvl-privacy-2025-09-12',
      date: '2025-09-12T09:00:00+02:00',
      title: 'AI Tokens, Worldcoin Surge, DeFi Agents & Privacy Advances',
      tags: ['AI Tokens', 'Agents', 'Worldcoin', 'Privacy', 'Transparency', 'Creator Economy']
    },
    {
      path: '/reports/ai-capex-automation-labor-sp500-concentration-2025-09-09',
      date: '2025-09-09T09:00:00+02:00',
      title: 'AI Capex, Automation Risk & S&P 500 Concentration',
      tags: ['AI Capex', 'Automation', 'Labor Markets', 'S&P 500', 'Productivity', 'Strategy']
    },
    {
      path: '/reports/ai-token-rally-worldcoin-privacy-agents-2025-09-09',
      date: '2025-09-09T09:00:00+02:00',
      title: 'AI Token Rally, Worldcoin Surge, Privacy Tools & Autonomous Agents',
      tags: ['AI Tokens', 'Worldcoin', 'Privacy', 'Transparency', 'Agents', 'Market Pulse']
    },
    {
      path: '/reports/eth-etf-outflows-agentic-execution-rwa-tvl-2025-09-08',
      date: '2025-09-08T09:00:00+02:00',
      title: ' ETH ETF Outflows, Agentic Execution & RWA TVL',
      tags: ['ETFs', 'Agents', 'RWA', 'PayFi', 'Security', 'Market Pulse']
    },
    {
      path: '/reports/uniswap-v4-permissioned-agents-rwa-ethereum-etf-2025-09-07',
      date: '2025-09-07T09:00:00+02:00',
      title: 'Uniswap v4 Hooks, Permissioned Agents, RWA Growth & Ethereum ETF Flows',
      tags: ['Programmable AMMs', 'Indexing', 'Agents', 'ETFs', 'RWA', 'Security']
    },
    {
      path: '/reports/ai-defi-adoption-agents-uniswap-v4-the-graph-rwa-2025-08-30',
      date: '2025-08-30T09:00:00+02:00',
      title: 'Adoption, Agents, Uniswap v4 Hooks, The Graph & RWA',
      tags: ['Adoption', 'Agents', 'Programmable AMMs', 'Indexing', 'Security', 'RWA']
    }
  ])

  // Get metadata for current report based on route
  const reportMeta = computed(() => {
    return reports.value.find(r => r.path === route.path)
  })

  return {
    reports: reports.value,
    reportMeta
  }
}
