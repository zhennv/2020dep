const webpack = require("webpack");
const path = require("path");
const SRC_PATH = path.resolve(__dirname, 'src');

module.exports = {
  // linkOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        "assets": "@/assets",
        "views": "@/views",
        "styles": "@/styles",
        "images": "@/assets/images",
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        "scene": JSON.stringify(process.env.scene),
        "zhennv": JSON.stringify("zhennv"),
      }),
      new webpack.ProvidePlugin({
        configCommon: [path.resolve(SRC_PATH, 'providers/constant.js'), 'default']
      })
    ]
  }
}