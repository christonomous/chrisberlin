import OpenAI from 'openai'
import type { ChatMessage } from '../../server/api/types/chat'
import type { ChatCompletionMessageParam } from 'openai/resources/chat'
import { convertMarkdownToHtml } from './markdown-to-html'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const SYSTEM_PROMPT = `You are "The AI Architect" — a systems strategist trained on the personal methodology, principles, and product design philosophy of Chris, the AI solopreneur behind "Grow on Autopilot."

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

Your task is to analyze the user's interview responses and create a comprehensive playbook. You will do this through a self-reasoning process, building each section progressively while maintaining context and connections between sections.

Important: Be extremely specific and personalized. Every recommendation must be:
- Directly tied to their skills, experience, and goals
- Specific and actionable (name exact tools, methods, steps)
- Realistic given their time availability and tech comfort
- Focused on their unique advantages and constraints

For each section:
1. First reason about what needs to be covered based on previous sections
2. Then provide detailed, actionable content
3. Finally, analyze how this connects to the next section

Use markdown formatting for better readability:
- Use ## for section headers
- Use ### for subsection headers
- Use **bold** for emphasis
- Use bullet points and numbered lists
- Use \`code\` for tool names and commands
- Format examples and steps clearly

Format each section with ## [Section Name] and ensure thorough, detailed content.`

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

    let conversationHistory: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      },
      {
        role: 'user',
        content: `Let's create a comprehensive playbook based on these interview responses:

${userResponses}

First, analyze their situation thoroughly and create an executive summary that captures their unique position, opportunities, and challenges.`
      }
    ]

    // Generate Executive Summary
    const summaryCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: conversationHistory,
      temperature: 0.7,
      max_tokens: 1000
    })

    const executiveSummary = summaryCompletion.choices[0]?.message?.content || ''
    conversationHistory.push({
      role: 'assistant',
      content: `Let me analyze the executive summary I've created and plan how it informs the business model strategy:

${executiveSummary}

Based on this analysis, I'll now develop a detailed business model strategy that leverages their unique advantages and addresses their constraints.`
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
      content: `Now that we have a solid business model defined, let me analyze how this informs our automation strategy:

${businessModel}

I'll create an automation strategy that specifically supports this business model while considering their technical comfort level.`
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
      content: `With our business model and automation strategy in place, let me plan our growth roadmap:

${automationStrategy}

I'll create a detailed 90-day plan that implements these automated systems while scaling the business.`
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
      content: `Based on our growth plans, let me identify and address potential risks:

${growthRoadmap}

I'll create specific mitigation strategies for each risk area we've identified.`
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
      content: `Now that we've addressed risks, let me create a scaling framework that builds on everything we've developed:

${riskMitigation}

I'll outline how to scale while maintaining our automated, low-risk approach.`
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
