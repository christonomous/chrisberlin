import { supabase } from '../../../utils/supabase'
import type { ChatMessage, AuditTrail, ChatData } from '../types/chat'

export const createChat = async (
  messages: ChatMessage[],
  auditTrail: AuditTrail
): Promise<ChatData> => {
  const { data: chat, error: insertError } = await supabase
    .from('chats')
    .insert({
      messages,
      audit_trail: auditTrail
    })
    .select()
    .single()

  if (insertError) {
    console.error('Error creating chat:', insertError)
    throw insertError
  }

  if (!chat) {
    throw new Error('Failed to create chat')
  }

  return chat as ChatData
}

export const updateChat = async (
  chatId: string,
  messages: ChatMessage[],
  timestamp: string
): Promise<{ messages: ChatMessage[], chatId: string }> => {
  const { data: existingChat, error: fetchError } = await supabase
    .from('chats')
    .select('messages')
    .eq('id', chatId)
    .single()

  if (fetchError) {
    console.error('Error fetching chat:', fetchError)
    throw fetchError
  }

  const updatedMessages = [...(existingChat?.messages || []), ...messages]

  const { error: updateError } = await supabase
    .from('chats')
    .update({ 
      messages: updatedMessages,
      updated_at: timestamp
    })
    .eq('id', chatId)

  if (updateError) {
    console.error('Error updating chat:', updateError)
    throw updateError
  }

  return {
    messages: updatedMessages,
    chatId
  }
}
