export const useFetchContent = () => {
  const features = [
    {
      emoji: "🤖",
      title: "AI-Powered Solutions",
      description: "Creating systems that run on autopilot, giving you back your valuable time",
      items: [
        "Workflow Optimization",
        "Process Automation",
        "System Integration"
      ]
    },
    {
      emoji: "🚀",
      title: "Monthly Business Launch",
      description: "Consistently launching autonomous online businesses as proof of concept",
      items: [
        "Rapid Prototyping",
        "Market Validation",
        "Scalable Architecture"
      ]
    },
    {
      emoji: "⚡",
      title: "Automation Expert",
      description: "Creating systems that run on autopilot, giving you back your valuable time",
      items: [
        "Workflow Optimization",
        "Process Automation",
        "System Integration"
      ]
    },
    {
      emoji: "😎",
      title: "Personal Branding",
      description: "Funnel potential prospects to my AI-driven SaaS",
      items: [
        "Branding",
        "Marketing",
        "Sales"
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
