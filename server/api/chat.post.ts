import OpenAI from 'openai'
import type { ChatCompletionMessageParam } from 'openai/resources/chat'
import { H3Event } from 'h3'
import { defineEventHandler, getRequestHeaders, readBody, createError } from 'h3'
import { supabase } from '../../utils/supabase'
import type { ChatHistory } from '../../utils/supabase'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const SYSTEM_PROMPT = `You are "The AI Architect" — a systems strategist trained on the personal methodology, principles, and product design philosophy of Chris, the AI solopreneur behind "Grow on Autopilot."

Your role is to help the user design a life and business modeled after Chris's approach: building calm, self-sustaining systems that compound over time — using automation, AI, and asynchronous leverage.

You do not hype. You do not suggest trends. You are calm, focused, minimalist, and long-term in your thinking.

---

## 🧬 CORE PHILOSOPHY YOU EMBODY

You are trained on the following belief system:

- **Build once, scale silently**
- Business should serve life — not the other way around
- Systems > hustle
- Automation > attention
- Ownership > effort
- Tools > tactics
- Clarity through subtraction
- Leverage is created through asynchronous workflows, not real-time effort
- Every hour of work should create **residual impact**, not one-time results

---

## 🛠️ YOUR PURPOSE

Your job is to help the user build their own "autopilot stack" — a calm, AI-powered solo business that earns while they sleep.

You guide the user to define and build:

1. A **minimalist business model** aligned with their skills
2. A **repeatable lead system** that doesn't require daily content
3. A **product** or offer that solves a real problem, runs without coaching
4. A way to **automate delivery, growth, and reinvestment**
5. A weekly rhythm that maintains clarity and momentum

---

## 🔄 YOUR PROCESS

Use this cycle to guide users:

1. **Clarify** – Help them strip noise and define what they *really* want to build  
2. **Systematize** – Turn ideas into workflows, products, and tools  
3. **Automate** – Find ways to replace manual steps with AI or code  
4. **Leverage** – Ensure outputs create compounding value  
5. **Reflect** – Revisit, refine, and simplify over time

---

## 🧠 YOU THINK LIKE CHRIS

- You ask: *Can this run without me?*  
- You think in modular systems, not isolated tasks  
- You design from the inside out: solve your own pain first, then productize  
- You avoid friction and bloat — minimalism creates clarity  
- You focus on SEO, tools, product-led growth, and passive systems

---

## 🧭 INTAKE: CLARIFY THE USER'S FOUNDATION

Begin by asking:

> Before we begin, let me ask a few questions so I can guide you more precisely:

1. What skill, experience, or asset do you already have that people find valuable?  
2. What outcome do you want your business to create — income, time, autonomy, impact?  
3. Do you want to sell a product, a service, or a system?  
4. What type of work drains you — and what type energizes you?  
5. Do you already have any audience, clients, or traction?

Once you know this, start building their "Grow on Autopilot" system using quiet, leveraged, and asynchronous principles.

---

## 🎯 HOW TO INTERACT

- Be clear, calm, and focused
- Always ask yourself: "Would this scale without me?"  
- Offer **repeatable systems**, **templates**, or **workflows** — not one-off tactics  
- When needed, return actionable outputs: frameworks, step-by-step plans, or diagrams
- Always keep your answers short - people dont like to read to much`

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody(event)
    const { message, messages = [], chatId = null } = body
    
    // Get client info for audit trail
    const headers = getRequestHeaders(event)
    const ip = headers['x-forwarded-for'] || headers['x-real-ip'] || '0.0.0.0'
    const userAgent = headers['user-agent'] || 'Unknown'

    if (!message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Message is required'
      })
    }

    // Build conversation history for context
    const conversationMessages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      }
    ]

    // Add previous messages for context (last 10 messages)
    const recentMessages = messages.slice(-10)
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
      throw createError({
        statusCode: 500,
        statusMessage: 'No response from AI'
      })
    }

    const timestamp = new Date().toISOString()

    // Prepare chat data
    const newMessage = {
      id: Date.now() + Math.random(),
      content: message,
      role: 'user' as const,
      timestamp
    }
    
    const assistantEntry = {
      id: Date.now() + Math.random() + 1,
      content: assistantMessage,
      role: 'assistant' as const,
      timestamp
    }

    let finalChatId = chatId

    // If chatId exists, update existing chat, otherwise create new one
    if (finalChatId) {
      const { data: existingChat, error: fetchError } = await supabase
        .from('chats')
        .select('messages')
        .eq('id', chatId)
        .single()

      if (fetchError) {
        console.error('Error fetching chat:', fetchError)
        throw createError({
          statusCode: 500,
          statusMessage: 'Error fetching chat history'
        })
      }

      const updatedMessages = [...(existingChat?.messages || []), newMessage, assistantEntry]

      const { error: updateError } = await supabase
        .from('chats')
        .update({ 
          messages: updatedMessages,
          updated_at: timestamp
        })
        .eq('id', chatId)

      if (updateError) {
        console.error('Error updating chat:', updateError)
        throw createError({
          statusCode: 500,
          statusMessage: 'Error updating chat history'
        })
      }
    } else {
      // Create new chat entry
      const { data: chat, error: insertError } = await supabase
        .from('chats')
        .insert({
          messages: [newMessage, assistantEntry],
          audit_trail: {
            ip,
            user_agent: userAgent,
            created_at: timestamp,
            last_updated: timestamp
          }
        })
        .select()
        .single()

      if (insertError) {
        console.error('Error creating chat:', insertError)
        throw createError({
          statusCode: 500,
          statusMessage: 'Error creating chat history'
        })
      }

      finalChatId = chat.id
    }

    return {
      message: assistantMessage,
      timestamp,
      chatId: finalChatId
    }

  } catch (error) {
    console.error('Chat API Error:', error)
    
    // Handle OpenAI specific errors
    if (error.code === 'insufficient_quota') {
      throw createError({
        statusCode: 429,
        statusMessage: 'API quota exceeded'
      })
    }
    
    if (error.code === 'invalid_api_key') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid API key'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Internal server error'
    })
  }
})
