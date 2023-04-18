// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/devtools'],
  nitro: {
    compressPublicAssets: {
      brotli: true,
      gzip: true,
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
  head: {
    title: 'Jarne Delarue',
    meta: [
      {
        name: 'description',
        content:
          "Hi there, I'm Jarne Delarue. Welcome to my portfolio, I'm a Full-Stack Web Developer based in Flanders. I enjoy building beautiful and functional websites ",
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        name: 'keywords',
        content: 'Jarne Delarue, Portfolio, Web Developer, Full-Stack,',
      },
      {
        name: 'author',
        content: 'Jarne Delarue',
      },
    ],
  },
})
