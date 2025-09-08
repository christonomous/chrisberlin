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
      path: '/reports/ai-defi-adoption-agents-uniswap-v4-the-graph-rwa-2025-08-30',
      date: '2025-08-30T09:00:00+02:00',
      title: 'Adoption, Agents, Uniswap v4 Hooks, The Graph & RWA',
      tags: ['Adoption', 'Agents', 'Programmable AMMs', 'Indexing', 'Security', 'RWA']
    },
    {
      path: '/reports/uniswap-v4-permissioned-agents-rwa-ethereum-etf-2025-09-07',
      date: '2025-09-07T09:00:00+02:00',
      title: 'Uniswap v4 Hooks, Permissioned Agents, RWA Growth & Ethereum ETF Flows',
      tags: ['Programmable AMMs', 'Indexing', 'Agents', 'ETFs', 'RWA', 'Security']
    },
    {
      path: '/reports/eth-etf-outflows-agentic-execution-rwa-tvl-2025-09-08',
      date: '2025-09-08T09:00:00+02:00',
      title: ' ETH ETF Outflows, Agentic Execution & RWA TVL',
      tags: ['ETFs', 'Agents', 'RWA', 'PayFi', 'Security', 'Market Pulse']
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
