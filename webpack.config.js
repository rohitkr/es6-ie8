const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          "plugins": [
            ["transform-es3-member-expression-literals"],
            ["transform-es3-property-literals"],
            ["transform-proto-to-assign"],
            ["transform-runtime", {
              "helpers": false,
              "polyfill": true,
              "regenerator": false
            }],
            ["add-module-exports"]
          ],
          "presets": [
            ["env", {
              "targets": {
                "browsers": ["> 0.2%"]
              },
              "_modules": false,
              "loose": true
            }]
          ]
        }
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      mangleProperties: {
        screw_ie8: false,
        ignore_quoted: true
      },
      compress: {
        screw_ie8: false,
        properties: false
      },
      output: {
        screw_ie8: false
      }
    })
  ],
  devServer: {
    contentBase: './sample',
    watchContentBase: true,
    disableHostCheck: true
  }
}
