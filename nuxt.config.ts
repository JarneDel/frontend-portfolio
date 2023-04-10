// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/devtools'],
  // plugins: [{ src: '~/plugins/lottie', mode: 'client' }],
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
