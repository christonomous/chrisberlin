<template>
  <div class="chat-container bg-base-100 rounded-lg shadow-lg flex flex-col overflow-hidden fixed-height">
    <div ref="messagesContainer" class="messages-container p-4 space-y-4 bg-base-300">
      <ChatMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
        class="max-w-[400px]"
      />
      <div v-if="isLoading" class="flex justify-start">
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
      </div>
    </div>
    <div class="message-input p-4 border-t border-base-300">
      <div class="join w-full">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Schreibe etwas"
          class="input bg-base-200 join-item w-full focus:outline-none"
          @keyup.enter="handleSend"
        />
        <button 
          @click="handleSend" 
          class="btn join-item"
          :disabled="!newMessage.trim()"
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

const { messages, isLoading, sendMessage, addMessage } = useChat()
const newMessage = ref('')
const messagesContainer = ref(null)

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Scroll on new messages or when container size changes
watch([messages, isLoading], () => {
  nextTick(() => {
    scrollToBottom()
  })
}, { deep: true })

// Initial scroll and greeting when component mounts
onMounted(() => {
  if (messages.value.length === 0) {
    addMessage("Hi there, I am an AI Assitent helping Solopreneurs to grow on autopilot!", 'assistant')
  }
  nextTick(() => {
    scrollToBottom()
  })
})

const handleSend = async () => {
  if (!newMessage.value.trim()) return
  await sendMessage(newMessage.value)
  newMessage.value = ''
}
</script>

<style scoped>
.fixed-height {
  height: 600px;
  max-height: 600px;
}

.chat-container {
  position: relative;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  height: calc(100% - 84px); /* Accounting for input area and padding */
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
  position: relative;
  background-color: var(--base-100);
}

.typing-indicator {
  opacity: 0.7;
}

.typing-indicator .dot {
  opacity: 0.4;
}
</style>
