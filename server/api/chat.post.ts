import OpenAI from 'openai'
import type { ChatCompletionMessageParam } from 'openai/resources/chat'
import { H3Event } from 'h3'
import { defineEventHandler, getRequestHeaders, readBody, createError } from 'h3'
import { supabase } from '../../utils/supabase'
import type { ChatHistory } from '../../utils/supabase'
import { sendPlaybook } from '../../utils/email/send-playbook'

// Email regex pattern
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Function to extract email from message
const extractEmail = (message: string): string | null => {
  const words = message.split(/\s+/)
  for (const word of words) {
    if (EMAIL_REGEX.test(word)) {
      return word.toLowerCase()
    }
  }
  return null
}

// Function to count assistant messages to track interview progress
const getInterviewProgress = (messages: ChatMessage[]): number => {
  return messages.filter(msg => msg.role === 'assistant').length - 1 // -1 for initial greeting
}

// Function to handle email subscription
const handleEmailSubscription = async (email: string, chatId: string, messages: ChatMessage[]) => {
  try {
    // Get chat messages for playbook
    const { data: existingChat } = await supabase
      .from('chats')
      .select('messages')
      .eq('id', chatId)
      .single()

    // Insert into subscribers table
    const { data: subscriber, error: subscribeError } = await supabase
      .from('subscribers')
      .insert([{ 
        email,
        unsubscribe_token: Math.random().toString(36).substring(2) // Simple token generation
      }])
      .select()
      .single()

    if (subscribeError) {
      if (subscribeError.code === '23505') { // Unique constraint violation
        // Get existing subscriber
        const { data: existingSubscriber } = await supabase
          .from('subscribers')
          .select('id')
          .eq('email', email)
          .single()
        
        if (existingSubscriber) {
          // Update chat with existing subscriber id
          await supabase
            .from('chats')
            .update({ subscriber_id: existingSubscriber.id })
            .eq('id', chatId)
        }
      } else {
        throw subscribeError
      }
    } else if (subscriber) {
      // Update chat with new subscriber id
      await supabase
        .from('chats')
        .update({ subscriber_id: subscriber.id })
        .eq('id', chatId)
    }

    // Send playbook email using all chat messages
    console.log('Preparing to send playbook email to:', email)
    const allMessages = existingChat?.messages || messages
    try {
      await sendPlaybook(email, allMessages)
      console.log('Playbook email sent successfully')
    } catch (emailError) {
      console.error('Failed to send playbook email:', emailError)
      // Continue execution - we don't want to fail the chat if email fails
    }
  } catch (error) {
    console.error('Error handling subscription:', error)
    if (error.data) {
      console.error('API error details:', error.data)
    }
    throw error
  }
}

interface ChatMessage {
  id: number
  content: string
  role: 'user' | 'assistant'
  timestamp: string
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const INTERVIEW_QUESTIONS = [
  "What specific skills or expertise do you have that could be turned into a business? Think about your professional experience, personal interests, or unique knowledge.",
  "What's your main goal for building this business? Are you looking for financial freedom, location independence, or perhaps creating impact in a specific field?",
  "How much time can you realistically dedicate to building this business right now? This helps me suggest the most suitable approach.",
  "What's your comfort level with technology and automation? This will help me recommend appropriate tools and systems.",
  "Have you tried starting any business ventures before? What worked and what didn't?"
]

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

## 🧭 INTERVIEW PROCESS

You will conduct a focused 5-question interview to understand the user's needs and goals. Here's how to proceed:

1. Start with a brief welcome and ask the first question from INTERVIEW_QUESTIONS.
2. For each response, acknowledge key points and ask the next question.
3. After collecting all 5 responses, summarize the insights and say:
   "I have a good understanding of your situation now. I can create a tailored playbook with specific strategies and systems for your business. To receive this, please share your email address."
4. When they provide an email:
   - Thank them
   - Mention you'll send the playbook to their email
   - Continue the conversation by starting to outline key strategies based on their answers

Important:
- Keep responses focused and concise
- Ask only one question at a time
- Track which question you're on (1-5)
- After email collection, shift to providing actionable advice

---

## 🎯 HOW TO INTERACT

- Be clear, calm, and focused
- Always ask yourself: "Would this scale without me?"  
- Offer **repeatable systems**, **templates**, or **workflows** — not one-off tactics  
- When needed, return actionable outputs: frameworks, step-by-step plans, or diagrams
- Always keep your answers short - people dont like to read to much

## 📧 EMAIL COLLECTION

When a user provides their email:
1. Validate it's a proper email format
2. If valid, respond with gratitude and mention the playbook
3. If invalid, politely ask for a valid email address

Example response after valid email:
"Thank you! I'll send your personalized playbook to [email]. Based on what you've shared, let me start outlining some key strategies for your business..."`

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody(event)
    const { message, messages = [], chatId = null } = body
    
    // Check for email in message after 5 interview questions
    const interviewProgress = getInterviewProgress(messages)
    if (interviewProgress >= 5) {
      const email = extractEmail(message)
      if (email && chatId) {
        await handleEmailSubscription(email, chatId, messages)
      }
    }
    
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
