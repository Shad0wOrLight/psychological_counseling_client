const { defineConfig } = require("@vue/cli-service");
const { VantResolver } = require("unplugin-vue-components/resolvers");
const ComponentsPlugin = require("unplugin-vue-components/webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },

  // devServer: {
  //   host: "0.0.0.0",
  //   port: 8080,
  //   client: {
  //     webSocketURL: "ws://0.0.0.0:8888/ws",
  //   },
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //   },
  // },
});
