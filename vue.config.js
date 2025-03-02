const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  pages: {
    index: {
      entry: "src/main.js",
      title: "Vue Movie",
    },
  },
  publicPath: "/projetos/vuemovie", // Pasta onde o projeto será hospedado
});
