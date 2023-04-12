const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    extend: {
      gridTemplateColumn: {
        sidebar: 'fit-content 1fr',
      },
      gridTemplateRows: {
        sidebar: 'fit-content 1fr',
      },
      width: {
        99: "55rem"
      },
      shadow: {
        'outline-primary-light': '0 0 0 3px rgba(45, 212, 191, 0.5)',
        'outline-primary-dark': '0 0 0 3px rgba(35, 166, 148, 0.5)',
      },
      colors: {
        primary: {
          dark: "#2dd4bf",
          light: "#23a694",
        },
        background: {
          light: {
            100: "#fff",
            200: '#eaeceb',
            300: "#dee0dd",
            400: "#d4d3ce",
            500: "#cbc5bf",
          },
          dark: {
            100: "#000000",
            200: "#151314",
            300: "#211f22",
            400: "#2b2c31",
            500: "#343a40",
          }
        }
      },
      backgroundImage: {
        'dark-repeating-bg': "url('/dark-repeating-bg.svg')",
        'light-repeating-bg': "url('/light-repeating-bg.svg')",
      },
      keyframes: {
        moveBg: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '36px 36px' },
        },
      },
      animation: {
        moveBg: 'moveBg 3s linear infinite',
      }
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus-visable'])
    }),
  ],
}
