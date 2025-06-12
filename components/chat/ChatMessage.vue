<template>
  <div 
    :class="[
      'chat',
      message.role === 'assistant' ? 'chat-start' : 'chat-end'
    ]"
  >
    <div class="chat-image avatar">
      <div class="w-8 rounded-full overflow-hidden">
        <img
          class="w-full h-full object-cover"
          :alt="message.role === 'assistant' ? 'KI Assistant' : 'Nutzer'"
          :src="message.role === 'assistant' 
            ? 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
            : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'"
        />
      </div>
    </div>
    <div class="chat-header">
      {{ message.role === 'assistant' ? 'KI Assistant' : 'Sie' }}
      <time class="text-xs opacity-50">{{ formatTime(message.timestamp) }}</time>
    </div>
    <div class="chat-bubble prose text-white" v-html="parseMarkdown(message.content)"></div>
    <div class="chat-footer opacity-50">
      {{ message.role === 'assistant' ? 'Responsed' : 'Sent' }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { marked } from 'marked'

defineProps({
  message: {
    type: Object,
    required: true
  }
})

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

const parseMarkdown = (content) => {
  return marked(content)
}
</script>

<style scoped>
.chat-bubble :deep(p) {
  margin-bottom: 1em;
}

.chat-bubble :deep(p:last-child) {
  margin-bottom: 0;
}

.prose {
  max-width: none;
}
</style>
