import OpenAI from 'openai'
import type { ChatCompletionMessageParam } from 'openai/resources/chat'
import type { ChatMessage } from '../types/chat'
import { SYSTEM_PROMPT } from './interview'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const generateChatResponse = async (
  message: string,
  previousMessages: ChatMessage[] = []
): Promise<string> => {
  // Build conversation history for context
  const conversationMessages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: SYSTEM_PROMPT
    }
  ]

  // Add previous messages for context (last 10 messages)
  const recentMessages = previousMessages.slice(-10)
  for (const msg of recentMessages) {
    if (msg.role === 'user' || msg.role === 'assistant') {
      conversationMessages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })
    }
  }

  // Add current message
  conversationMessages.push({
    role: 'user',
    content: message
  })

  try {
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // or 'gpt-4' if you prefer
      messages: conversationMessages,
      max_tokens: 1000,
      temperature: 0.7,
      stream: false
    })

    const assistantMessage = completion.choices[0]?.message?.content

    if (!assistantMessage) {
      throw new Error('No response from AI')
    }

    return assistantMessage
  } catch (error) {
    console.error('OpenAI API Error:', error)
    
    // Handle OpenAI specific errors
    if (error.code === 'insufficient_quota') {
      throw new Error('API quota exceeded')
    }
    
    if (error.code === 'invalid_api_key') {
      throw new Error('Invalid API key')
    }

    throw error
  }
}
