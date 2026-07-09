// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'mixed-decls', 'if-function'],
          quietDeps: true
        } as any
      }
    }
  },
  app: {
    head: {
      title: 'Break The Eyes',
      meta: [
        { name: 'description', content: 'Break The Eyes - Digital Branding & Strategy, Multimedia Production, Tech & Digital Solutions, Events & PR Solutions.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  css: [
    "@/assets/scss/custom.scss",
    "@/assets/css/bthe.css",
    "bootstrap-icons/font/bootstrap-icons.css",
    "vue3-toastify/dist/index.css"
  ],
  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt'
  ],
  supabase: {
    redirect: false,
    types: './app/types/supabase.ts',
    cookieOptions: {
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax'
    }
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  },
  ssr: true,
  devtools: { enabled: false }
})
