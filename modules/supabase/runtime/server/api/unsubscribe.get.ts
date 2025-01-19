import { createClient } from '@supabase/supabase-js'
import { defineEventHandler, getQuery, createError } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  if (!query.token) {
    throw createError({
      statusCode: 400,
      message: 'Token is required'
    })
  }

  const supabase = createClient(
    config.supabase.url,
    config.supabase.key
  )

  try {
    const { data: subscriber, error: fetchError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('unsubscribe_token', query.token)
      .single()

    if (fetchError || !subscriber) {
      throw createError({
        statusCode: 404,
        message: 'Invalid unsubscribe token'
      })
    }

    const { error: deleteError } = await supabase
      .from('subscribers')
      .delete()
      .eq('id', subscriber.id)

    if (deleteError) throw deleteError

    // Return HTML response
    event.node.res.setHeader('Content-Type', 'text/html')
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Unsubscribed</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f5f5f5;
            }
            .container {
              text-align: center;
              padding: 2rem;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 { color: #333; }
            p { color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Successfully Unsubscribed</h1>
            <p>You have been removed from our newsletter list.</p>
          </div>
        </body>
      </html>
    `
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }
})
