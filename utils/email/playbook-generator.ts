interface ChatMessage {
  id: number
  content: string
  role: 'user' | 'assistant'
  timestamp: string
}

interface PlaybookRecommendations {
  mvs: string[]
  automation: string[]
  growth: string[]
}

interface UserInsights {
  skills: string
  goals: string
  time: string
  techComfort: string
  experience: string
}

export const generatePlaybookContent = (messages: ChatMessage[]): { insights: UserInsights; recommendations: PlaybookRecommendations } => {
  const userMessages = messages.filter(msg => msg.role === 'user')
  const insights = {
    skills: userMessages[0]?.content || '',
    goals: userMessages[1]?.content || '',
    time: userMessages[2]?.content || '',
    techComfort: userMessages[3]?.content || '',
    experience: userMessages[4]?.content || ''
  }

  const recommendations = {
    mvs: [] as string[],
    automation: [] as string[],
    growth: [] as string[]
  }

  // Analyze skills and experience
  if (insights.skills.toLowerCase().includes('writing') || insights.skills.toLowerCase().includes('content')) {
    recommendations.mvs.push('Create a premium newsletter or content membership')
    recommendations.automation.push('Set up an automated content distribution system across multiple platforms')
    recommendations.growth.push('Implement an SEO strategy focusing on your expertise topics')
  } else if (insights.skills.toLowerCase().includes('tech') || insights.skills.toLowerCase().includes('developer')) {
    recommendations.mvs.push('Develop a SaaS tool solving a specific business problem')
    recommendations.automation.push('Build a CI/CD pipeline for automated updates and maintenance')
    recommendations.growth.push('Create a developer community around your tool')
  } else if (insights.skills.toLowerCase().includes('design') || insights.skills.toLowerCase().includes('creative')) {
    recommendations.mvs.push('Create a premium template or asset marketplace')
    recommendations.automation.push('Develop an automated asset delivery and licensing system')
    recommendations.growth.push('Build a showcase portfolio with automated lead capture')
  }

  // Analyze time availability
  if (insights.time.toLowerCase().includes('full')) {
    recommendations.mvs.push('Focus on building a comprehensive system from day one')
    recommendations.automation.push('Invest time in setting up advanced automation workflows')
  } else if (insights.time.toLowerCase().includes('part') || insights.time.toLowerCase().includes('limited')) {
    recommendations.mvs.push('Start with a minimal viable offering that can run with minimal intervention')
    recommendations.automation.push('Prioritize essential automation to handle routine tasks')
  }

  // Analyze tech comfort
  if (insights.techComfort.toLowerCase().includes('high') || insights.techComfort.toLowerCase().includes('comfortable')) {
    recommendations.automation.push('Implement advanced integrations between your tools')
    recommendations.growth.push('Use API-driven automation for scalable operations')
  } else if (insights.techComfort.toLowerCase().includes('low') || insights.techComfort.toLowerCase().includes('basic')) {
    recommendations.automation.push('Start with no-code tools like Zapier or Airtable')
    recommendations.growth.push('Focus on content-driven growth with simple automation tools')
  }

  // Analyze goals
  if (insights.goals.toLowerCase().includes('passive') || insights.goals.toLowerCase().includes('freedom')) {
    recommendations.mvs.push('Design your system for maximum automation from the start')
    recommendations.growth.push('Focus on creating evergreen assets and automated marketing')
  } else if (insights.goals.toLowerCase().includes('impact') || insights.goals.toLowerCase().includes('help')) {
    recommendations.mvs.push('Create a knowledge base or resource center for your audience')
    recommendations.growth.push('Build a community-driven growth engine')
  }

  // Default recommendations if no specific patterns are found
  if (recommendations.mvs.length === 0) {
    recommendations.mvs = [
      'Start with one core offering based on your strongest skills',
      'Create a simple delivery process that can be automated',
      'Set up basic tracking for leads and conversions'
    ]
  }
  if (recommendations.automation.length === 0) {
    recommendations.automation = [
      'Choose tools that match your tech comfort level',
      'Set up automated lead capture and nurturing',
      'Create templates and systems for recurring tasks'
    ]
  }
  if (recommendations.growth.length === 0) {
    recommendations.growth = [
      'Implement passive marketing channels',
      'Create content that compounds over time',
      'Set up referral and recommendation systems'
    ]
  }

  return { insights, recommendations }
}
