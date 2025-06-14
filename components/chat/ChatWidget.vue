<template>
  <div 
    :class="[
      'chat-container bg-base-100 shadow-lg flex flex-col overflow-hidden transition-all duration-300',
      isFullscreen 
        ? 'fixed inset-0 z-[9999] rounded-none w-full h-full' 
        : 'rounded-lg fixed-height'
    ]"
  >
    <!-- Header with fullscreen toggle -->
    <div class="chat-header p-4 border-b border-base-300 flex items-center justify-between bg-base-100">
      <div class="flex items-center gap-2">
        <div>
          <h3 class="font-semibold text-sm">Solopreneurship AI Assistant</h3>
          <p class="text-xs opacity-70">Helping you to grow on Autopilot</p>
        </div>
      </div>
      
      <div class="flex items-center gap-2">
        <!-- New Chat button -->
        <button 
          @click="startNewChat"
          class="btn btn-ghost btn-sm gap-2"
          title="Start a new chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span class="hidden sm:inline">New Chat</span>
        </button>

        <!-- Fullscreen toggle button -->
        <button 
          @click="toggleFullscreen"
          class="btn btn-ghost btn-sm btn-circle"
          :title="isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'"
        >
          <svg 
            v-if="!isFullscreen"
            xmlns="http://www.w3.org/2000/svg" 
            class="h-4 w-4" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
          <svg 
            v-else
            xmlns="http://www.w3.org/2000/svg" 
            class="h-4 w-4" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          >
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Messages Container -->
    <div 
      ref="messagesContainer" 
      class="messages-container p-4 space-y-4 bg-base-300 flex-1 overflow-y-auto"
    >
      <ChatMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :class="isFullscreen ? 'max-w-[800px] mx-auto' : 'max-w-[400px]'"
      />
      <div v-if="isLoading || isProcessingPlaybook" class="flex justify-start">
        <div class="flex flex-col gap-2">
          <svg class="typing-indicator" width="50" height="20" viewBox="0 0 50 20">
            <circle class="dot" cx="10" cy="10" r="3" fill="currentColor">
              <animate
                attributeName="opacity"
                dur="1s"
                values="0.4;1;0.4"
                repeatCount="indefinite"
                begin="0s"
              />
            </circle>
            <circle class="dot" cx="25" cy="10" r="3" fill="currentColor">
              <animate
                attributeName="opacity"
                dur="1s"
                values="0.4;1;0.4"
                repeatCount="indefinite"
                begin="0.3s"
              />
            </circle>
            <circle class="dot" cx="40" cy="10" r="3" fill="currentColor">
              <animate
                attributeName="opacity"
                dur="1s"
                values="0.4;1;0.4"
                repeatCount="indefinite"
                begin="0.6s"
              />
            </circle>
          </svg>
          <div v-if="isProcessingPlaybook" class="text-sm opacity-70">
            Creating your personalized playbook...
          </div>
        </div>
      </div>
    </div>

    <!-- Message Input -->
    <div class="message-input p-4 border-t border-base-300 bg-base-100">
      <div class="join w-full">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Describe your business challenge..."
          class="input bg-base-200 join-item w-full focus:outline-none"
          @keyup.enter="handleSend"
          :disabled="isProcessingPlaybook"
        />
        <button 
          @click="handleSend" 
          class="btn join-item"
          :disabled="!newMessage.trim() || isProcessingPlaybook"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 2L11 13"></path>
            <path d="M22 2L15 22L11 13L2 9L22 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import { useChat } from '../../composables/useChat'
import ChatMessage from './ChatMessage.vue'

const { messages, isLoading, isProcessingPlaybook, sendMessage, addMessage, startNewChat } = useChat()
const newMessage = ref('')
const messagesContainer = ref(null)
const isFullscreen = ref(false)

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Scroll on new messages or when container size changes
watch([messages, isLoading, isProcessingPlaybook], () => {
  nextTick(() => {
    scrollToBottom()
  })
}, { deep: true })

// Scroll when fullscreen state changes
watch(isFullscreen, () => {
  nextTick(() => {
    scrollToBottom()
  })
})

// Initial scroll and greeting when component mounts
onMounted(() => {
  if (messages.value.length === 0) {
    addMessage("Hi, I'm Chris's Solopreneurship AI Assistant.\n\nI'm here to help you design a calm, self-sustaining business — using the same systems Chris built to automate income and grow quietly.\n\nTo get started, just tell me:\n- What do you already have — skills, assets, or experience?\n- What outcome are you aiming for — freedom, income, impact?\n- And do you want to sell a service, a product, or a system?\n\nYou can answer one or all — or just share what's on your mind.", 'assistant')
  }
  nextTick(() => {
    scrollToBottom()
  })
})

const handleSend = async () => {
  if (!newMessage.value.trim() || isProcessingPlaybook.value) return
  await sendMessage(newMessage.value)
  newMessage.value = ''
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const closeFullscreen = () => {
  isFullscreen.value = false
}

// Handle escape key to exit fullscreen
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isFullscreen.value) {
    closeFullscreen()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.fixed-height {
  height: 800px;
  max-height: 800px;
}

.chat-container {
  position: relative;
}

.messages-container {
  scrollbar-width: thin;
}

.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track {
  background: transparent;
}

.messages-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.message-input {
  background-color: var(--base-100);
}

.typing-indicator {
  opacity: 0.7;
}

.typing-indicator .dot {
  opacity: 0.4;
}

.chat-header {
  flex-shrink: 0;
  z-index: 10;
}

/* Fullscreen styles */
.chat-container.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  max-height: none;
}

/* Animation for gradient button */
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
</style>
