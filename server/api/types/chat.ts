import type { ChatCompletionMessageParam } from 'openai/resources/chat'

export interface ChatMessage {
  id: number
  content: string
  role: 'user' | 'assistant'
  timestamp: string
}

export interface ChatResponse {
  message: string
  timestamp: string
  chatId: string | null
}

export interface ChatRequest {
  message: string
  messages?: ChatMessage[]
  chatId?: string | null
}

export interface AuditTrail {
  ip: string
  user_agent: string
  created_at: string
  last_updated: string
}

export interface ChatData {
  id: string
  messages: ChatMessage[]
  audit_trail: AuditTrail
}
