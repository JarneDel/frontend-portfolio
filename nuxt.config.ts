// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/devtools', '@nuxt/image-edge'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  devtools: {
    enabled: true,
  },
  image: {
    provider: 'ipx',
    dir: 'public/images',
  },
  // add smooth scroll
})
