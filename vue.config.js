const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pages: {
    index: {
      entry: "src/main.js",
      title: "Vue Movie"
    }
  },
  publicPath: '/vue-movie-frontend' // Pasta onde o projeto será hospedado
})
