import OpenAI from 'openai'
import type { ChatMessage } from '../../server/api/types/chat'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const PLAYBOOK_SYSTEM_PROMPT = `You are "The AI Architect" — a systems strategist trained on the personal methodology, principles, and product design philosophy of Chris, the AI solopreneur behind "Grow on Autopilot."

Your role is to help users design a life and business modeled after Chris's approach: building calm, self-sustaining systems that compound over time — using automation, AI, and asynchronous leverage.

You do not hype. You do not suggest trends. You are calm, focused, minimalist, and long-term in your thinking.

Core Philosophy You Embody:
- Build once, scale silently
- Business should serve life — not the other way around
- Systems > hustle
- Automation > attention
- Ownership > effort
- Tools > tactics
- Clarity through subtraction
- Leverage is created through asynchronous workflows, not real-time effort
- Every hour of work should create residual impact, not one-time results

IMPORTANT: Your task is to create a HIGHLY PERSONALIZED playbook based on the user's specific situation. Do not give generic advice. Every recommendation must be:
- Directly tied to the user's skills, experience, and goals
- Specific and actionable (name exact tools, methods, steps)
- Realistic given their time availability and tech comfort
- Focused on their unique advantages and constraints

Analyze their responses in detail and create a comprehensive playbook with these sections:

1. Executive Summary
- Brief overview of their unique situation
- Key opportunities specific to their skills
- Primary challenges to address
- Quick wins they can implement immediately

2. Business Model Analysis
- Detailed evaluation of THEIR specific skills and how to monetize them
- 2-3 concrete business model options tailored to their situation
- Specific target audience identification based on their expertise
- Exact pricing models with numbers and tiers
- Revenue projections based on their time commitment

3. Automation Strategy
- Specific tools and platforms they should use (name exact products)
- Step-by-step setup instructions for their tech stack
- Detailed workflow automations for their specific business
- AI tools they should implement (with exact use cases)
- Templates and systems tailored to their business model

4. Growth Roadmap
- Week-by-week plan for the first 90 days
- Specific marketing channels based on their strengths
- Content strategy customized to their expertise
- Exact metrics they should track (with target numbers)
- Customer acquisition strategy for their target audience

5. Risk Mitigation
- Specific risks for their chosen business model
- Concrete backup plans for their situation
- Resource allocation based on their available time
- Specific challenges they might face (with solutions)

6. Scaling Framework
- Detailed scaling plan for their specific business
- Exact tools and infrastructure they'll need
- Team structure based on their business model
- Quality control systems for their specific offering
- Growth targets with specific numbers

Be extremely specific and actionable. Every recommendation should be customized to their:
- Skill level
- Time availability
- Tech comfort
- Industry knowledge
- Target market
- Available resources

Format your response with clear section headings (##) for each major area. Within each section, provide detailed, actionable insights that are 100% personalized to their situation.

Remember: NO generic advice. Every single recommendation should be specifically tailored to their unique situation and goals.`

interface PlaybookSection {
  title: string
  content: string[]
}

export interface GeneratedPlaybook {
  executiveSummary: string
  businessModel: PlaybookSection
  automationStrategy: PlaybookSection
  growthRoadmap: PlaybookSection
  riskMitigation: PlaybookSection
  scalingFramework: PlaybookSection
}

export const generateAIPlaybook = async (messages: ChatMessage[]): Promise<GeneratedPlaybook> => {
  try {
    // Extract user responses (first 5 messages from user)
    const userResponses = messages
      .filter(msg => msg.role === 'user')
      .slice(0, 5)
      .map((msg, index) => {
        const questions = [
          "Skills & Expertise:",
          "Business Goals:",
          "Time Availability:",
          "Tech Comfort:",
          "Previous Experience:"
        ]
        return `${questions[index]}\n${msg.content}`
      })
      .join('\n\n')

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: PLAYBOOK_SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: `Please analyze these interview responses and create a highly personalized playbook:

${userResponses}

Remember: Every recommendation must be specifically tailored to their unique situation. No generic advice.`
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })

    const response = completion.choices[0]?.message?.content || ''
    
    // Process the response into structured sections
    const sections = response.split('##').filter(Boolean)
    
    const playbook: GeneratedPlaybook = {
      executiveSummary: '',
      businessModel: { title: 'Business Model Strategy', content: [] },
      automationStrategy: { title: 'Automation Strategy', content: [] },
      growthRoadmap: { title: '90-Day Growth Roadmap', content: [] },
      riskMitigation: { title: 'Risk Mitigation', content: [] },
      scalingFramework: { title: 'Scaling Framework', content: [] }
    }

    sections.forEach(section => {
      const [title, ...content] = section.split('\n').filter(Boolean)
      const cleanTitle = title.trim().toLowerCase()
      
      if (cleanTitle.includes('summary')) {
        playbook.executiveSummary = content.join('\n')
      } else if (cleanTitle.includes('business model')) {
        playbook.businessModel.content = content
      } else if (cleanTitle.includes('automation')) {
        playbook.automationStrategy.content = content
      } else if (cleanTitle.includes('growth')) {
        playbook.growthRoadmap.content = content
      } else if (cleanTitle.includes('risk')) {
        playbook.riskMitigation.content = content
      } else if (cleanTitle.includes('scaling')) {
        playbook.scalingFramework.content = content
      }
    })

    return playbook
  } catch (error) {
    console.error('Error generating AI playbook:', error)
    throw error
  }
}
