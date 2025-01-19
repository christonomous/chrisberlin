export const useFetchContent = () => {
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
      emoji: "🎉",
      title: "User Conversion",
      description: "Automated onboarding and engagement workflows for user success",
      items: [
        "Seamless Onboarding",
        "Tailored Support",
        "Retention Optimization"
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
    }
  ]

  const businesses = {
    launches: [
      {
        emoji: "🤖",
        title: "AutoContent Pro",
        description: "AI-powered content generation and scheduling platform for social media automation.",
        badges: [
          { text: "AI", color: "primary" },
          { text: "SaaS", color: "secondary" }
        ]
      },
      {
        emoji: "📊",
        title: "MetricsMaster",
        description: "Automated analytics and reporting tool for data-driven business decisions.",
        badges: [
          { text: "Analytics", color: "secondary" },
          { text: "Dashboard", color: "accent" }
        ]
      },
      {
        emoji: "🔄",
        title: "WorkflowWizard",
        description: "No-code automation platform for streamlining business processes.",
        badges: [
          { text: "Automation", color: "accent" },
          { text: "No-Code", color: "primary" }
        ]
      }
    ]
  }

  return {
    features,
    businesses
  }
}
