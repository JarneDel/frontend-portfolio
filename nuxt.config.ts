// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/devtools'],
  nitro: {
    compressPublicAssets: {
      brotli: true,
      gzip: true,
    },
    publicAssets: {
      baseUrl: 'images',
      dir: 'public/images',
      extensions: ['png', 'jpg', 'jpeg', 'webp', 'svg'],
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  devtools: {
    enabled: true,
  },
})
