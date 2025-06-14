import { supabase } from '../../../utils/supabase'
import type { ChatMessage } from '../types/chat'
import { generateAIPlaybook } from '../../../utils/email/playbook-ai-service'
import { sendPlaybook } from '../../../utils/email/send-playbook'

export interface PlaybookStep {
  message: string
  action: () => Promise<void>
}

export const createPlaybookSteps = (email: string, chatId: string, messages: ChatMessage[]): PlaybookStep[] => {
  let generatedPlaybook: any = null

  return [
    {
      message: `Thank you for providing your email! I'll create a personalized playbook for your business journey and send it to ${email}. Let me start analyzing our conversation...`,
      action: async () => {
        // Update chat with email
        const { error: updateError } = await supabase
          .from('chats')
          .update({ email })
          .eq('id', chatId)

        if (updateError) throw updateError
      }
    },
    {
      message: "I'm carefully reviewing our discussion to understand your unique situation. I'll identify the specific opportunities that align with your skills and goals, following the principle of 'build once, scale on autopilot'...",
      action: async () => {
        // Get chat messages for playbook
        const { data: existingChat, error } = await supabase
          .from('chats')
          .select('messages')
          .eq('id', chatId)
          .single()

        if (error) throw error
      }
    },
    {
      message: "Now I'm crafting your personalized playbook. I'm designing systems and automation strategies specifically for your situation, focusing on creating residual impact rather than one-time results...",
      action: async () => {
        // Generate playbook content
        generatedPlaybook = await generateAIPlaybook(messages)
      }
    },
    {
      message: "Your playbook is ready! I'm preparing to send it now. It includes detailed strategies for building calm, self-sustaining systems that will help your business grow on autopilot...",
      action: async () => {
        if (!generatedPlaybook) {
          // Regenerate if somehow lost
          generatedPlaybook = await generateAIPlaybook(messages)
        }

        // Send playbook email
        await sendPlaybook(email, messages)

        // Try to insert into subscribers table, but don't fail if it errors
        try {
          await supabase
            .from('subscribers')
            .insert([{ 
              email,
              unsubscribe_token: Math.random().toString(36).substring(2)
            }])
            .select()
            .single()
        } catch (error) {
          console.error('Error inserting subscriber:', error)
        }
      }
    },
    {
      message: `Perfect! I've sent your personalized playbook to ${email}. You'll find detailed strategies for:

- Building a minimalist business model aligned with your skills
- Setting up automated systems that work while you sleep
- Creating a repeatable growth engine that doesn't need daily attention
- Scaling calmly and sustainably over time

Take your time to review the playbook. Feel free to ask me any questions about implementing the strategies - I'm here to help you build a business that serves your life, not the other way around.`,
      action: async () => {
        // No action needed for final message
      }
    }
  ]
}
