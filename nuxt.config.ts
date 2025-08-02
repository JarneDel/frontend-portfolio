import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
console.log(process.env.NODE_ENV)
export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '@vueuse/motion/nuxt',
    '@nuxt/image',
    '@nuxt/scripts',
  ],
  css: ['~/assets/style/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    provider: process.env.NODE_ENV == 'production' ? 'netlifyImageCdn' : 'ipx',
    domains: ['media.steampowered.com', 'avatars.steamstatic.com'],
  },
  nitro: {
    compressPublicAssets: {
      brotli: true,
      gzip: true,
    },
  },
  runtimeConfig: {
    // Private keys (only available on server-side)
    steamApiKey: process.env.STEAM_API_KEY,
    steamId: process.env.STEAM_ID,

    public: {
      motion: {
        directives: {
          'slide-up': {
            initial: {
              scale: 0,
              opacity: 0,
              y: 100,
            },
            visible: {
              scale: 1,
              opacity: 1,
              y: 0,
            },
          },
          'pop-bottom': {
            initial: {
              scale: 0,
              opacity: 0,
              y: 100,
            },
            visible: {
              scale: 1,
              opacity: 1,
              y: 0,
            },
          },
        },
      },
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

  scripts: {
    registry: {
      cloudflareWebAnalytics: {
        token: '55b69d9a04c240d582fde78c5c00876c',
      },
    },
  },
  compatibilityDate: '2025-02-20',
})
