import { H3Event } from 'h3'
import { defineEventHandler, getRequestHeaders, readBody, createError } from 'h3'
import type { ChatMessage, ChatRequest, ChatResponse, AuditTrail } from './types/chat'
import { extractEmail, handleEmailSubscription } from './utils/email'
import { getInterviewProgress } from './utils/interview'
import { createChat, updateChat } from './utils/database'
import { generateChatResponse } from './utils/chat-service'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody(event) as ChatRequest
    const { message, messages = [], chatId = null } = body
    
    if (!message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Message is required'
      })
    }

    // Check for email in message after 4 interview questions
    const interviewProgress = getInterviewProgress(messages)
    console.log('Current interview progress:', interviewProgress)
    
    if (interviewProgress >= 4) {
      const email = extractEmail(message)
      console.log('Extracted email:', email)
      
      if (email && chatId) {
        console.log('Processing email subscription and sending playbook for:', email)
        await handleEmailSubscription(email, chatId, messages)
      }
    }
    
    // Get client info for audit trail
    const headers = getRequestHeaders(event)
    const ip = headers['x-forwarded-for'] || headers['x-real-ip'] || '0.0.0.0'
    const userAgent = headers['user-agent'] || 'Unknown'
    const timestamp = new Date().toISOString()

    // Generate AI response
    const assistantMessage = await generateChatResponse(message, messages)

    // Prepare new messages
    const newMessages: ChatMessage[] = [
      {
        id: Date.now() + Math.random(),
        content: message,
        role: 'user',
        timestamp
      },
      {
        id: Date.now() + Math.random() + 1,
        content: assistantMessage,
        role: 'assistant',
        timestamp
      }
    ]

    let finalChatId = chatId

    // Update existing chat or create new one
    if (finalChatId) {
      const result = await updateChat(finalChatId, newMessages, timestamp)
      finalChatId = result.chatId
    } else {
      const auditTrail: AuditTrail = {
        ip,
        user_agent: userAgent,
        created_at: timestamp,
        last_updated: timestamp
      }
      const chat = await createChat(newMessages, auditTrail)
      finalChatId = chat.id
    }

    const response: ChatResponse = {
      message: assistantMessage,
      timestamp,
      chatId: finalChatId
    }

    return response

  } catch (error: any) {
    console.error('Chat API Error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Internal server error'
    })
  }
})
