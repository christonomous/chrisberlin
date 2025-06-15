import { supabase } from '../../../utils/supabase'
import type { ChatMessage } from '../types/chat'
import type { PlaybookSectionName } from '../../../utils/email/playbook-ai-service'
import type { PlaybookSectionResponse } from '../types/playbook'
import { sendPlaybook } from '../../../utils/email/send-playbook'

export interface PlaybookStep {
  message: string
  action: () => Promise<void>
}

const SECTIONS: PlaybookSectionName[] = [
  'executiveSummary',
  'businessModel',
  'automationStrategy',
  'growthRoadmap',
  'riskMitigation',
  'scalingFramework'
]

const SECTION_MESSAGES = {
  executiveSummary: "I'm analyzing your unique situation to identify the specific opportunities that align with your skills and goals...",
  businessModel: "Now I'm designing a minimalist business model that leverages your strengths while maintaining work-life harmony...",
  automationStrategy: "Creating automation strategies to help your business run smoothly with minimal daily intervention...",
  growthRoadmap: "Mapping out a 90-day plan to implement these systems and start scaling your impact...",
  riskMitigation: "Identifying potential challenges and creating specific strategies to address them...",
  scalingFramework: "Finally, designing a framework to help you scale sustainably while maintaining your automated, low-touch approach..."
}

export const createPlaybookSteps = (email: string, chatId: string, messages: ChatMessage[]): PlaybookStep[] => {
  const steps: PlaybookStep[] = [
    {
      message: `Thank you for providing your email! I'll create a personalized playbook for your business journey and send it to ${email}. Let me start analyzing our conversation...`,
      action: async () => {
        // Update chat with email and create initial playbook entry
        const { error: updateError } = await supabase
          .from('chats')
          .update({ email })
          .eq('id', chatId)

        if (updateError) throw updateError

        // Create initial playbook entry
        const { error: playBookError } = await supabase
          .from('playbooks')
          .insert([{
            chat_id: chatId,
            email,
            sections: {}
          }])

        if (playBookError && playBookError.code !== '23505') { // Ignore unique violation
          throw playBookError
        }
      }
    }
  ]

  // Add steps for each section
  SECTIONS.forEach((section) => {
    steps.push({
      message: SECTION_MESSAGES[section],
      action: async () => {
        // Generate section via API
        const response = await $fetch<PlaybookSectionResponse>('/api/playbook-section', {
          method: 'POST',
          body: {
            chatId,
            sectionName: section
          }
        })

        if (!response.success) {
          throw new Error(`Failed to generate ${section}`)
        }
      }
    })
  })

  // Add final step to send email
  steps.push({
    message: "Your playbook is ready! I'm preparing to send it now...",
    action: async () => {
      // Send playbook email
      await sendPlaybook(email, chatId)

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
  })

  // Add completion message
  steps.push({
    message: `Perfect! I've sent your personalized playbook to ${email}. You'll find detailed strategies for:

- Building a minimalist business model aligned with your skills
- Setting up automated systems that work while you sleep
- Creating a repeatable growth engine that doesn't need daily attention
- Scaling calmly and sustainably over time

Take your time to review the playbook. Feel free to ask me any questions about implementing the strategies - I'm here to help you build a business that serves your life, not the other way around.`,
    action: async () => {
      // No action needed for final message
    }
  })

  return steps
}
