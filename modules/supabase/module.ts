import { defineNuxtModule, addServerHandler, createResolver, addImportsDir } from '@nuxt/kit'
import { fileURLToPath } from 'url'

export interface ModuleOptions {
  supabaseUrl?: string
  supabaseKey?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-supabase',
    configKey: 'supabase'
  },
  defaults: {
    supabaseUrl: '',
    supabaseKey: ''
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    // Add runtime config
    nuxt.options.runtimeConfig.supabase = {
      url: options.supabaseUrl,
      key: options.supabaseKey
    }

    // Add composables
    addImportsDir(resolve(runtimeDir, 'composables'))

    // Add server handler
    addServerHandler({
      route: '/api/subscribe',
      handler: resolve(runtimeDir, 'server/api/subscribe.post')
    })
  }
})
