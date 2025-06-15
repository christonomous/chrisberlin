import OpenAI from 'openai'
import type { ChatMessage } from '../../server/api/types/chat'
import type { ChatCompletionMessageParam } from 'openai/resources/chat'
import { convertMarkdownToHtml } from './markdown-to-html'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const SYSTEM_PROMPT = `You are "The AI Architect" — a systems strategist trained on the personal methodology, principles, and product design philosophy of Chris, the AI solopreneur behind "Grow on Autopilot."

Your role is to write a personalized playbook that speaks directly to the reader, using "you" and "your" throughout. You are calm, focused, minimalist, and long-term in your thinking. Avoid hype and trends.

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

Your task is to analyze the reader's interview responses and create a comprehensive playbook that speaks directly to them. Write as if you're having a one-on-one conversation, maintaining a personal tone throughout all sections.

Important: Every section must:
- Address the reader directly using "you" and "your"
- Connect recommendations directly to their skills and goals
- Provide specific, actionable steps they can take
- Stay realistic given their time and tech comfort level
- Focus on their unique advantages and constraints

For each section:
1. First consider what the reader needs based on previous sections
2. Then provide detailed, actionable content speaking directly to them
3. Finally, connect this to what they'll learn in the next section

Use markdown formatting for better readability:
- Use ## for section headers
- Use ### for subsection headers
- Use **bold** for emphasis
- Use bullet points and numbered lists
- Use \`code\` for tool names and commands
- Format examples and steps clearly

Format each section with ## [Section Name] and ensure thorough, detailed content that maintains a direct, personal tone throughout.`

interface PlaybookSection {
  title: string
  content: string[]
}

export type PlaybookSectionName = 
  | 'executiveSummary'
  | 'businessModel'
  | 'automationStrategy'
  | 'growthRoadmap'
  | 'riskMitigation'
  | 'scalingFramework'

export interface GeneratedPlaybook {
  executiveSummary: string
  businessModel: PlaybookSection
  automationStrategy: PlaybookSection
  growthRoadmap: PlaybookSection
  riskMitigation: PlaybookSection
  scalingFramework: PlaybookSection
}

const SECTION_PROMPTS: Record<PlaybookSectionName, string> = {
  executiveSummary: "Let me analyze your situation and create an executive summary that captures your unique position, opportunities, and challenges. I'll speak directly to you throughout this playbook.",
  businessModel: "Based on this analysis, I'll develop a detailed business model strategy that leverages your unique advantages and addresses your constraints.",
  automationStrategy: "Now I'll create an automation strategy that specifically supports your business model while considering your technical comfort level.",
  growthRoadmap: "Here's your detailed 90-day plan to implement these automated systems while scaling your business.",
  riskMitigation: "Let's address the specific risks in your situation and create strategies to mitigate them.",
  scalingFramework: "Finally, here's how you can scale while maintaining your automated, low-risk approach."
}

export const generatePlaybookSection = async (messages: ChatMessage[], sectionName: PlaybookSectionName): Promise<string> => {
  try {
    // Get the first 5 messages for interview responses
    const interviewResponses = messages
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

    // Get additional context from recent messages
    const recentMessages = messages.slice(-40)
      .filter(msg => !interviewResponses.includes(msg.content)) // Exclude interview responses
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n\n')

    const userResponses = `
Interview Responses:
${interviewResponses}

Additional Context from Recent Conversation:
${recentMessages}
`

    const conversationHistory: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      },
      {
        role: 'user',
        content: `Let's create a comprehensive playbook section based on these interview responses:

${userResponses}

${SECTION_PROMPTS[sectionName]}`
      }
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: conversationHistory,
      temperature: 0.7,
      max_tokens: 1000
    })

    const content = completion.choices[0]?.message?.content || ''
    return convertMarkdownToHtml(content)
  } catch (error) {
    console.error(`Error generating ${sectionName}:`, error)
    throw error
  }
}

export const generateAIPlaybook = async (messages: ChatMessage[]): Promise<GeneratedPlaybook> => {
  try {
    // Get the first 5 messages for interview responses
    const interviewResponses = messages
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

    // Get additional context from recent messages
    const recentMessages = messages.slice(-40)
      .filter(msg => !interviewResponses.includes(msg.content)) // Exclude interview responses
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n\n')

    const userResponses = `
Interview Responses:
${interviewResponses}

Additional Context from Recent Conversation:
${recentMessages}
`

    let conversationHistory: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      },
      {
        role: 'user',
        content: `Let's create a comprehensive playbook based on these interview responses:

${userResponses}

Let me analyze your situation and create an executive summary that captures your unique position, opportunities, and challenges. I'll speak directly to you throughout this playbook.`
      }
    ]

    // Generate Executive Summary
    const summaryCompletion = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: conversationHistory,
      temperature: 0.7,
      max_tokens: 1000
    })

    const executiveSummary = summaryCompletion.choices[0]?.message?.content || ''
    conversationHistory.push({
      role: 'assistant',
      content: `Let me analyze the executive summary I've created and plan how it informs your business model strategy:

${executiveSummary}

Based on this analysis, I'll now develop a detailed business model strategy that leverages your unique advantages and addresses your constraints.`
    })

    // Generate Business Model
    const businessModelCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: conversationHistory,
      temperature: 0.7,
      max_tokens: 1000
    })

    const businessModel = businessModelCompletion.choices[0]?.message?.content || ''
    conversationHistory.push({
      role: 'assistant',
      content: `Now that we have your business model defined, let me analyze how this informs your automation strategy:

${businessModel}

I'll create an automation strategy that specifically supports your business model while considering your technical comfort level.`
    })

    // Generate Automation Strategy
    const automationCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: conversationHistory,
      temperature: 0.7,
      max_tokens: 1000
    })

    const automationStrategy = automationCompletion.choices[0]?.message?.content || ''
    conversationHistory.push({
      role: 'assistant',
      content: `With your business model and automation strategy in place, let me plan your growth roadmap:

${automationStrategy}

I'll create a detailed 90-day plan that implements these automated systems while scaling your business.`
    })

    // Generate Growth Roadmap
    const roadmapCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: conversationHistory,
      temperature: 0.7,
      max_tokens: 1000
    })

    const growthRoadmap = roadmapCompletion.choices[0]?.message?.content || ''
    conversationHistory.push({
      role: 'assistant',
      content: `Based on your growth plans, let me identify and address potential risks:

${growthRoadmap}

I'll create specific mitigation strategies for each risk area in your business.`
    })

    // Generate Risk Mitigation
    const riskCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: conversationHistory,
      temperature: 0.7,
      max_tokens: 1000
    })

    const riskMitigation = riskCompletion.choices[0]?.message?.content || ''
    conversationHistory.push({
      role: 'assistant',
      content: `Now that we've addressed your risks, let me create a scaling framework that builds on everything we've developed:

${riskMitigation}

I'll outline how you can scale while maintaining your automated, low-risk approach.`
    })

    // Generate Scaling Framework
    const scalingCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: conversationHistory,
      temperature: 0.7,
      max_tokens: 1000
    })

    const scalingFramework = scalingCompletion.choices[0]?.message?.content || ''

    const formatContent = (content: string): string[] => {
      return convertMarkdownToHtml(content)
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.trim())
    }

    return {
      executiveSummary: convertMarkdownToHtml(executiveSummary),
      businessModel: {
        title: 'Business Model Strategy',
        content: formatContent(businessModel)
      },
      automationStrategy: {
        title: 'Automation Strategy',
        content: formatContent(automationStrategy)
      },
      growthRoadmap: {
        title: '90-Day Growth Roadmap',
        content: formatContent(growthRoadmap)
      },
      riskMitigation: {
        title: 'Risk Mitigation',
        content: formatContent(riskMitigation)
      },
      scalingFramework: {
        title: 'Scaling Framework',
        content: formatContent(scalingFramework)
      }
    }
  } catch (error) {
    console.error('Error generating AI playbook:', error)
    throw error
  }
}
