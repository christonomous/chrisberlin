import { supabase } from '../../../utils/supabase'
import { sendPlaybook } from '../../../utils/email/send-playbook'
import type { ChatMessage } from '../types/chat'

// Email regex pattern
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const extractEmail = (message: string): string | null => {
  const words = message.split(/\s+/)
  for (const word of words) {
    if (EMAIL_REGEX.test(word)) {
      return word.toLowerCase()
    }
  }
  return null
}

export const handleEmailSubscription = async (email: string, chatId: string, messages: ChatMessage[]) => {
  try {
    console.log('Starting email subscription process for:', email)
    
    // Get chat messages for playbook
    const { data: existingChat } = await supabase
      .from('chats')
      .select('messages')
      .eq('id', chatId)
      .single()

    console.log('Retrieved chat history for playbook generation')

    // Update chat with email
    const { error: updateError } = await supabase
      .from('chats')
      .update({ email })
      .eq('id', chatId)

    if (updateError) {
      console.error('Error updating chat with email:', updateError)
      throw updateError
    }

    console.log('Updated chat with email:', email)

    // Try to insert into subscribers table, but don't fail if it errors
    // The subscription module handles proper subscriber management
    try {
      await supabase
        .from('subscribers')
        .insert([{ 
          email,
          unsubscribe_token: Math.random().toString(36).substring(2)
        }])
        .select()
        .single()
    } catch (subscribeError) {
      // Log but don't throw - subscription module will handle proper signup
      console.error('Error inserting subscriber:', subscribeError)
    }

    // Send playbook email using all chat messages
    console.log('Preparing to send playbook email to:', email)
    const allMessages = existingChat?.messages || messages
    try {
      await sendPlaybook(email, allMessages)
      console.log('Playbook email sent successfully to:', email)
    } catch (emailError) {
      console.error('Failed to send playbook email:', emailError)
      // Don't throw since we're running in background
      // But do log the full error for debugging
      console.error('Playbook email error details:', {
        error: emailError,
        email,
        chatId,
        messageCount: allMessages.length
      })
    }
  } catch (error) {
    console.error('Error in background email subscription process:', error)
    console.error('Full context:', {
      email,
      chatId,
      error: error.message,
      errorData: error.data,
      stack: error.stack
    })
    // Don't throw since we're running in background
    // But ensure all error details are logged
  }
}
