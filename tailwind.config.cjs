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
      }
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus'])
    }),
  ],
}
