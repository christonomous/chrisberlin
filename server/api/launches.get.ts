import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  return [
    {
      title: "BRANE Media Ltd",
      description: "The Most Effortless Sales Solution. Our AI handles everything - from finding leads to closing deals with automated funnels and instant payments.",
      emoji: "🚀",
      launch_date: "2024-01-15",
      badges: [
        { text: "AI-Powered", color: "primary" },
        { text: "SaaS", color: "secondary" },
        { text: "Sales Automation", color: "accent" }
      ],
      logo: "/imgs/businesses/branemedia_logo.jpg",
      cover: "/imgs/businesses/branemedia_cover.jpg",
      stats: [
        { value: "95%", label: "Lead Accuracy" },
        { value: "3x", label: "Faster Outreach" },
        { value: "70%", label: "Close Rate" },
        { value: "24/7", label: "AI Generation" }
      ],
      features: [
        "AI Lead Generation",
        "Newsletter Automation",
        "Analytics Dashboard",
        "Digital Contracts & Payments"
      ]
    }
  ]
})
