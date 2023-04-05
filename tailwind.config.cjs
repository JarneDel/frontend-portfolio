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
      colors: {
        primary: {
          dark: "#2dd4bf",
          light: "#23a694",
        }
      },
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus'])
    }),
  ],
}
