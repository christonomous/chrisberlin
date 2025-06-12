// composables/useChat.js
import { ref } from 'vue'

export const useChat = () => {
  const messages = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const addMessage = (content, role = 'user', timestamp = new Date().toISOString()) => {
    const message = {
      id: Date.now() + Math.random(),
      content,
      role,
      timestamp
    }
    messages.value.push(message)
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
      const response = await $fetch('/api/chat', {
        method: 'POST',
        body: {
          message: content,
          messages: messages.value.slice(-10) // Send last 10 messages for context
        }
      })

      // Add assistant response
      addMessage(response.message, 'assistant', response.timestamp)
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

  return {
    messages,
    isLoading,
    error,
    addMessage,
    sendMessage,
    clearMessages,
    retryLastMessage
  }
}