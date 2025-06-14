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
  chatId: string
}

export const useChat = () => {
  const messages = ref<ChatMessage[]>([])
  const isLoading = ref(false)
  const error = ref(null)
  const chatId = ref<string | null>(null)
  const isProcessingPlaybook = ref(false)

  // Load messages and chatId from localStorage on mount
  onMounted(() => {
    const savedMessages = localStorage.getItem('chatMessages')
    const savedChatId = localStorage.getItem('chatId')
    if (savedMessages) {
      messages.value = JSON.parse(savedMessages)
    }
    if (savedChatId) {
      chatId.value = savedChatId
    }
  })

  // Save messages and chatId to localStorage whenever they change
  const saveMessages = () => {
    localStorage.setItem('chatMessages', JSON.stringify(messages.value))
    if (chatId.value) {
      localStorage.setItem('chatId', chatId.value)
    }
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

  const triggerNextStep = async () => {
    if (!isProcessingPlaybook.value) return
    
    try {
      // Send empty message to trigger next step
      const response = await $fetch<ChatResponse>('/api/chat', {
        method: 'POST',
        body: {
          message: '_next_step',
          messages: messages.value.slice(-10),
          chatId: chatId.value
        }
      })

      if (response) {
        const { message, timestamp } = response
        addMessage(message, 'assistant', timestamp)

        // If it's not the final message, trigger next step after a delay
        if (!message.includes("Perfect! I've sent your personalized playbook")) {
          setTimeout(triggerNextStep, 2000)
        } else {
          isProcessingPlaybook.value = false
        }
      }
    } catch (error) {
      console.error('Error triggering next step:', error)
      isProcessingPlaybook.value = false
    }
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
          messages: messages.value.slice(-10), // Send last 10 messages for context
          chatId: chatId.value
        }
      })

      // Store chatId if received
      if (response.chatId) {
        chatId.value = response.chatId
        localStorage.setItem('chatId', response.chatId)
      }

      // Add assistant response if we got data
      if (response) {
        const { message, timestamp } = response
        addMessage(message, 'assistant', timestamp)

        // Check if this is the start of playbook process
        if (message.includes("Thank you for providing your email")) {
          isProcessingPlaybook.value = true
          // Trigger next step after a delay
          setTimeout(triggerNextStep, 2000)
        }
      }
    } catch (fetchError) {
      console.error('Chat error:', fetchError)
      error.value = fetchError
      isProcessingPlaybook.value = false
      
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
    chatId.value = null
    isProcessingPlaybook.value = false
    localStorage.removeItem('chatMessages')
    localStorage.removeItem('chatId')
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
    clearMessages() // This already clears chatId and localStorage
    // Add initial greeting and first interview question
    addMessage("Hi! I'm Chris's AI Assistant, and I'm here to help you design a calm, self-sustaining business. Let me ask you a few questions to understand your situation better.\n\nFirst question: What specific skills or expertise do you have that could be turned into a business? Think about your professional experience, personal interests, or unique knowledge.", 'assistant')
  }

  return {
    messages,
    isLoading,
    error,
    chatId,
    addMessage,
    sendMessage,
    clearMessages,
    retryLastMessage,
    startNewChat,
    isProcessingPlaybook
  }
}
