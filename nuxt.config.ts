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
  app: {
    head: {
      title: 'Jarne Delarue',
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
      ],
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
        {
          name: 'msapplication-TileColor',
          content: '#da532c',
        },
        {
          name: 'theme-color',
          content: '#211f22',
        },
      ],
    },
  },
})
