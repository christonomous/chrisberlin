export default defineNuxtConfig({
  app: {
    head: {
      title: 'Chris | Smart Money',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Smart Money Concepts & Orderflow for Hybrid Trading' },
        { property: 'og:title', content: 'Chris | Smart Money' },
        { property: 'og:description', content: 'Smart Money Concepts & Orderflow for Hybrid Trading' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: process.env.SITE_URL + '/profile.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Chris | Smart Money' },
        { name: 'twitter:description', content: 'Smart Money Concepts & Orderflow for Hybrid Trading' },
        { name: 'twitter:image', content: process.env.SITE_URL + '/profile.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    ['~/modules/subscription/module', {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }]
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
