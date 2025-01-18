export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '~/modules/supabase/module'
  ],
  compatibilityDate: '2025-01-18',
  supabase: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY
  },
  runtimeConfig: {
    supabase: {
      url: process.env.SUPABASE_URL,
      key: process.env.SUPABASE_KEY
    }
  }
});
