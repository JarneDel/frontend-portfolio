const plugin = require("tailwindcss/plugin")

export default {
  theme: {
    extend: {
      gridTemplateColumn: {
        "sidebar": "fit-content 1fr"
      },
      gridTemplateRows: {
        "sidebar": "fit-content 1fr"
      }
    }
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus'])
    })
  ],


}