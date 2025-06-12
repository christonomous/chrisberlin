// composables/useChat.ts
import { ref, onMounted } from 'vue'
import { $fetch } from 'ofetch'

interface ChatMessage {
  id: number
  content: string
  role: 'user' | 'assistant'
  timestamp: string
}

interface ChatResponse {
  message: string
  timestamp: string
}

export const useChat = () => {
  const messages = ref<ChatMessage[]>([])
  const isLoading = ref(false)
  const error = ref(null)

  // Load messages from localStorage on mount
  onMounted(() => {
    const savedMessages = localStorage.getItem('chatMessages')
    if (savedMessages) {
      messages.value = JSON.parse(savedMessages)
    }
  })

  // Save messages to localStorage whenever they change
  const saveMessages = () => {
    localStorage.setItem('chatMessages', JSON.stringify(messages.value))
  }

  const addMessage = (content: string, role: 'user' | 'assistant' = 'user', timestamp: string = new Date().toISOString()) => {
    const message = {
      id: Date.now() + Math.random(),
      content,
      role,
      timestamp
    }
    messages.value.push(message)
    saveMessages()
    return message
  }

  const sendMessage = async (content) => {
    if (!content.trim()) return

    // Clear any previous errors
    error.value = null

    // Add user message
    addMessage(content, 'user')
    
    // Set loading state
    isLoading.value = true

    try {
      // Send to API
      const response = await $fetch<ChatResponse>('/api/chat', {
        method: 'POST',
        body: {
          message: content,
          messages: messages.value.slice(-10) // Send last 10 messages for context
        }
      })

      // Add assistant response if we got data
      if (response) {
        const { message, timestamp } = response
        addMessage(message, 'assistant', timestamp)
      }
    } catch (fetchError) {
      console.error('Chat error:', fetchError)
      error.value = fetchError
      
      // Add error message based on status
      let errorMessage = 'Sorry, I encountered an error. Please try again.'
      
      if (fetchError.statusCode === 429) {
        errorMessage = 'API rate limit exceeded. Please wait a moment and try again.'
      } else if (fetchError.statusCode === 401) {
        errorMessage = 'Authentication error. Please check the API configuration.'
      } else if (fetchError.statusCode === 500) {
        errorMessage = 'Server error occurred. Please try again later.'
      }
      
      addMessage(errorMessage, 'assistant')
    } finally {
      isLoading.value = false
    }
  }

  const clearMessages = () => {
    messages.value = []
    error.value = null
    localStorage.removeItem('chatMessages')
  }

  const retryLastMessage = async () => {
    if (messages.value.length === 0) return
    
    // Find the last user message
    const lastUserMessage = [...messages.value].reverse().find(msg => msg.role === 'user')
    if (lastUserMessage) {
      // Remove the last assistant error message if it exists
      if (messages.value[messages.value.length - 1]?.role === 'assistant') {
        messages.value.pop()
      }
      await sendMessage(lastUserMessage.content)
    }
  }

  const startNewChat = () => {
    clearMessages()
    // Add initial greeting message like when first mounted
    addMessage("Hi there! I'm Chris's AI Architect Assistant. I'm here to help you build calm, self-sustaining systems that compound over time.\n\nBefore we begin, let me ask a few questions so I can guide you more precisely:\n\n1. What skill, experience, or asset do you already have that people find valuable?\n2. What outcome do you want your business to create — income, time, autonomy, impact?\n3. Do you want to sell a product, a service, or a system?\n4. What type of work drains you — and what type energizes you?\n5. Do you already have any audience, clients, or traction?\n\nFeel free to answer one or all of these questions, or simply tell me what's on your mind about your business!", 'assistant')
  }

  return {
    messages,
    isLoading,
    error,
    addMessage,
    sendMessage,
    clearMessages,
    retryLastMessage,
    startNewChat
  }
}
