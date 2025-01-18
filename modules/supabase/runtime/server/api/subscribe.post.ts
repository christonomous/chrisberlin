import { createClient } from '@supabase/supabase-js'
import { defineEventHandler, readBody, createError } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  if (!body.email) {
    throw createError({
      statusCode: 400,
      message: 'Email is required'
    })
  }

  const supabase = createClient(
    config.supabase.url,
    config.supabase.key
  )

  try {
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email: body.email }])

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }
})
