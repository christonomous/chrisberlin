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

    // Insert into subscribers table (keep this for the subscription module)
    const { error: subscribeError } = await supabase
      .from('subscribers')
      .insert([{ 
        email,
        unsubscribe_token: Math.random().toString(36).substring(2)
      }])
      .select()
      .single()

    if (subscribeError && subscribeError.code !== '23505') { // Ignore if subscriber already exists
      console.error('Error inserting subscriber:', subscribeError)
      // Don't throw error - we want to continue with playbook sending
    }

    // Send playbook email using all chat messages
    console.log('Preparing to send playbook email to:', email)
    const allMessages = existingChat?.messages || messages
    try {
      await sendPlaybook(email, allMessages)
      console.log('Playbook email sent successfully to:', email)
    } catch (emailError) {
      console.error('Failed to send playbook email:', emailError)
      // Continue execution - we don't want to fail the chat if email fails
    }
  } catch (error) {
    console.error('Error handling subscription:', error)
    if (error.data) {
      console.error('API error details:', error.data)
    }
    throw error
  }
}
