import { H3Event } from 'h3'
import { defineEventHandler, getRequestHeaders, readBody, createError } from 'h3'
import type { ChatMessage, ChatRequest, ChatResponse, AuditTrail } from './types/chat'
import { extractEmail } from './utils/email'
import { getInterviewProgress } from './utils/interview'
import { createChat, updateChat } from './utils/database'
import { generateChatResponse } from './utils/chat-service'
import { createPlaybookSteps } from './utils/playbook-steps'

// Track playbook steps for each chat
const playbookProgress = new Map<string, number>()
const playbookSteps = new Map<string, ReturnType<typeof createPlaybookSteps>>()

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

    // Get client info for audit trail
    const headers = getRequestHeaders(event)
    const ip = headers['x-forwarded-for'] || headers['x-real-ip'] || '0.0.0.0'
    const userAgent = headers['user-agent'] || 'Unknown'
    const timestamp = new Date().toISOString()

    let assistantMessage: string
    const interviewProgress = getInterviewProgress(messages)
    const email = extractEmail(message)

    // Check if this is a step progression message
    if (message === '_next_step' && chatId) {
      const steps = playbookSteps.get(chatId)
      const currentStep = playbookProgress.get(chatId) || 0

      if (steps && currentStep < steps.length) {
        try {
          await steps[currentStep].action()
          assistantMessage = steps[currentStep].message
          playbookProgress.set(chatId, currentStep + 1)
        } catch (error) {
          console.error('Error executing playbook step:', error)
          // On error, skip to final message
          assistantMessage = steps[steps.length - 1].message
          playbookProgress.set(chatId, steps.length)
          playbookSteps.delete(chatId)
        }
      } else {
        // If no steps or completed, generate normal response
        assistantMessage = await generateChatResponse(message, messages)
      }
    }
    // Check if this is an email message and we should start playbook process
    else if (interviewProgress >= 4 && chatId) {
      // Check for email in current message or history
      const emailInHistory = messages.some(msg => extractEmail(msg.content))
      
      if ((email || emailInHistory) && !playbookSteps.has(chatId)) {
        // Start playbook generation if we have email and haven't started yet
        const foundEmail = email || messages.find(msg => extractEmail(msg.content))?.content || ''
        const steps = createPlaybookSteps(extractEmail(foundEmail) || '', chatId, messages)
        playbookSteps.set(chatId, steps)
        playbookProgress.set(chatId, 0)
        
        // Execute first step
        try {
          await steps[0].action()
          assistantMessage = steps[0].message
          playbookProgress.set(chatId, 1)
        } catch (error) {
          console.error('Error executing first playbook step:', error)
          assistantMessage = steps[steps.length - 1].message
          playbookProgress.set(chatId, steps.length)
          playbookSteps.delete(chatId)
        }
      } else {
        // Already processing playbook or no email yet, generate normal response
        assistantMessage = await generateChatResponse(message, messages)
      }
    } else {
      // Normal chat flow
      assistantMessage = await generateChatResponse(message, messages)
    }

    // Prepare new messages
    const newMessages: ChatMessage[] = []
    
    // Only add user message if it's not a step trigger
    if (message !== '_next_step') {
      newMessages.push({
        id: Date.now() + Math.random(),
        content: message,
        role: 'user' as const,
        timestamp
      })
    }

    // Add assistant message
    newMessages.push({
      id: Date.now() + Math.random() + 1,
      content: assistantMessage,
      role: 'assistant' as const,
      timestamp
    })

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
