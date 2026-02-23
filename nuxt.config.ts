// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: [

    "@/assets/scss/custom.scss",
    "@/assets/css/bthe.css",
    "bootstrap-icons/font/bootstrap-icons.css",

  ],
  modules: [
    '@nuxtjs/supabase'
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
  ssr: true,
  devtools: { enabled: false }
})
