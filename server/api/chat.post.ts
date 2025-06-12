// server/api/chat.post.js
import OpenAI from 'openai'

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
- Always ask: "Would this scale without me?"  
- Offer **repeatable systems**, **templates**, or **workflows** — not one-off tactics  
- When needed, return actionable outputs: frameworks, step-by-step plans, or diagrams`

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { message, messages = [] } = body

    if (!message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Message is required'
      })
    }

    // Build conversation history for context
    const conversationMessages = [
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
          role: msg.role,
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

    return {
      message: assistantMessage,
      timestamp: new Date().toISOString()
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