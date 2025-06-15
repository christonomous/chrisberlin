import { supabase } from '../../utils/supabase'
import { generatePlaybookSection } from '../../utils/email/playbook-ai-service'
import { H3Event, defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { chatId, sectionName } = body

  try {
    // Get existing playbook or create new one
    const { data: playbook, error: playBookError } = await supabase
      .from('playbooks')
      .select('*')
      .eq('chat_id', chatId)
      .single()

    if (playBookError && playBookError.code !== 'PGRST116') { // PGRST116 is "not found"
      throw playBookError
    }

    // Get chat messages for context
    const { data: chat, error: chatError } = await supabase
      .from('chats')
      .select('messages, email')
      .eq('id', chatId)
      .single()

    if (chatError) throw chatError

    // Generate the requested section
    const sectionContent = await generatePlaybookSection(chat.messages, sectionName)

    // If playbook doesn't exist, create it
    if (!playbook) {
      const { data: newPlaybook, error: insertError } = await supabase
        .from('playbooks')
        .insert([{
          chat_id: chatId,
          email: chat.email,
          sections: {
            [sectionName]: sectionContent
          }
        }])
        .select()
        .single()

      if (insertError) throw insertError
      
      return { success: true, section: sectionContent }
    }

    // Update existing playbook with new section
    const { error: updateError } = await supabase
      .from('playbooks')
      .update({
        sections: {
          ...playbook.sections,
          [sectionName]: sectionContent
        },
        updated_at: new Date().toISOString()
      })
      .eq('chat_id', chatId)

    if (updateError) throw updateError

    return { success: true, section: sectionContent }
  } catch (error) {
    console.error('Error generating playbook section:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to generate playbook section'
    })
  }
})
