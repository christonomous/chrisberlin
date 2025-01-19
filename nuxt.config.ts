export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '~/modules/supabase/module'
  ],
  compatibilityDate: '2025-01-18',
  runtimeConfig: {
    supabase: {
      url: process.env.SUPABASE_URL,
      key: process.env.SUPABASE_KEY
    },
    email: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
      name: process.env.EMAIL_NAME,
      smtp: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true'
      }
    },
    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000'
    }
  }
});
