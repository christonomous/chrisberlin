import { createClient } from '@supabase/supabase-js'
import { defineEventHandler, createError } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.supabase.url, config.supabase.key)
  
  const { data, error } = await supabase.from('launches').select('*')
  // if (error) throw createError({ statusCode: 500, message: error.message })
  
  return data
})
