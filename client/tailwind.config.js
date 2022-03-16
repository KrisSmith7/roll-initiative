module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        'turq': '#75cccc',
        'burnt-orange': '#ba5624',
        'slate': '#354F52',
        'charcoal':'#2f3e46',
        'sienna': '#53131e'
      },
      fontFamily: {
        unicase: ['Cormorant Unicase', 'serif'],
        cormorant: ['Cormorant Infant', 'serif'],
        macondo: ['Macondo Swash Caps', 'cursive'],
        antiqua: ['Modern Antiqua', 'cursive'],
      },
      backgroundImage: {
       'sidebar': "url('./assets/stock_images/stock_image10.jpg')"
      }
    },
  },
  plugins: [],
}