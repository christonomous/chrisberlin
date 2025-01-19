import { useFetch } from 'nuxt/app'

interface Launch {
  emoji: string
  title: string
  description: string
  launchDate: string
  badges: Array<{
    text: string
    color: string
  }>
}

interface LaunchesResponse {
  launches: Launch[]
}

export const useFetchContent = async () => {  
  const { launchData } = await useFetch<LaunchesResponse>('https://raw.githubusercontent.com/nujinDevelopment/cline/refs/heads/main/launches.json')

  const features = [
    {
      emoji: "🔍",
      title: "Finding Your Niche",
      description: "AI-powered market analysis to identify high-potential business opportunities",
      items: [
        "Market Trend Analysis",
        "Customer Pain Points",
        "Underserved Segments"
      ]
    },
    {
      emoji: "🏗️",
      title: "Rapid MVP Development",
      description: "Streamlined product development using AI automation tools",
      items: [
        "Automated Coding",
        "UI/UX Design",
        "Third-party Integration"
      ]
    },
    {
      emoji: "📢",
      title: "Storytelling & Marketing",
      description: "AI-driven content creation and marketing campaign automation",
      items: [
        "Content Generation",
        "Multi-channel Marketing",
        "SEO Optimization"
      ]
    },
    {
      emoji: "💰",
      title: "Sales Automation",
      description: "Intelligent lead generation and prospect engagement systems",
      items: [
        "AI Chatbots",
        "Email Sequences",
        "Data-driven Strategies"
      ]
    },
    {
      emoji: "⚙️",
      title: "Automated Business Operation",
      description: "Set-and-forget systems for running your business autonomously",
      items: [
        "Automated Customer Support",
        "Revenue Management",
        "Performance Monitoring"
      ]
    },
    {
      emoji: "💸",
      title: "Maximize Capital",
      description: "Automated cash-flow and investment management for optimal returns",
      items: [
        "Cash-flow Strategy",
        "Investment Automation",
        "Financial Optimization"
      ]
    }
  ]

  return {
    features,
    businesses: {
      launches: (launchData.value as LaunchesResponse)?.launches || []
    }
  }
}
