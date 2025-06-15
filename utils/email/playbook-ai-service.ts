import OpenAI from 'openai'
import type { ChatMessage } from '../../server/api/types/chat'
import type { ChatCompletionMessageParam } from 'openai/resources/chat'
import { convertMarkdownToHtml } from './markdown-to-html'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const SYSTEM_PROMPT = `You are creating sections of a business playbook. Write in a direct, professional style that speaks to the reader using "you" and "your". Avoid welcome messages, introductions, or any meta-commentary about the playbook itself.

Core Principles to Follow:
- Build once, scale silently
- Business should serve life — not the other way around
- Systems > hustle
- Automation > attention
- Ownership > effort
- Tools > tactics
- Clarity through subtraction
- Leverage through asynchronous workflows
- Every hour creates residual impact

Content Requirements:
1. Start each section immediately with actionable content
2. Connect advice directly to the reader's skills and goals
3. Provide specific, realistic steps based on their tech comfort
4. Focus on their unique advantages and constraints
5. Maintain consistent tone across sections

Formatting:
- Use ## for section headers
- Use ### for subsection headers
- Use **bold** for emphasis
- Use bullet points for lists
- Use \`code\` for tool names
- Format examples clearly

Important:
- Never use welcome messages or introductions
- Don't reference the playbook itself
- Start each section with immediate value
- Focus on actionable content
- Maintain professional, direct tone`

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
  executiveSummary: "Analyze the current situation, opportunities, and challenges. Focus on specific strengths and actionable insights.",
  businessModel: "Design a business model that leverages existing advantages and addresses key constraints. Provide concrete steps and implementation details.",
  automationStrategy: "Create an automation strategy that supports the business model while considering technical comfort level. Include specific tools and workflows.",
  growthRoadmap: "Develop a 90-day implementation plan with clear milestones and metrics. Break down complex tasks into manageable steps.",
  riskMitigation: "Identify potential risks and provide specific mitigation strategies. Include preventive measures and contingency plans.",
  scalingFramework: "Define a framework for sustainable growth that maintains automation and efficiency. Focus on systems that scale without proportional effort."
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

${SECTION_PROMPTS.executiveSummary}`
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
      content: `${executiveSummary}

${SECTION_PROMPTS.businessModel}`
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
      content: `${businessModel}

${SECTION_PROMPTS.automationStrategy}`
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
      content: `${automationStrategy}

${SECTION_PROMPTS.growthRoadmap}`
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
      content: `${growthRoadmap}

${SECTION_PROMPTS.riskMitigation}`
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
      content: `${riskMitigation}

${SECTION_PROMPTS.scalingFramework}`
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
