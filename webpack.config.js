const path = require('path')
const webpack = require('webpack')
const BundleAnalyzer = require('webpack-bundle-analyzer');

module.exports = {
    entry: ['./src/index.js'],
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js',
      library: 'ES6Module',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module: {
      rules: [{
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "plugins": [
              ["transform-es3-member-expression-literals"],
              ["transform-es3-property-literals"],
              ["transform-proto-to-assign"],
              ["transform-runtime", {
                "helpers": true,
                "polyfill": true,
                "regenerator": true
              }],
              ['add-module-exports']
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
    resolve: {
      extensions: ['.js']
    },
    devtool: 'source-map',
    plugins: [

      // new webpack.optimize.UglifyJsPlugin({
      //   mangle: false,
      //   mangleProperties: {
      //     screw_ie8: false,
      //     ignore_quoted: true
      //   },
      //   compress: {
      //     screw_ie8: false,
      //     properties: false
      //   },
      //   output: {
      //     screw_ie8: false
      //   }
      // }),

      // new BundleAnalyzer.BundleAnalyzerPlugin({
      //   analyzerMode: 'static',
      //   reportFilename: '../../webpack-analyser/index.html',
      //   statsFilename: './webpack-analyser/data/stats.json',
      //   defaultSizes: 'stat'
      // })

    ],
    profile: true,
    devServer: {
      contentBase: './sample',
      watchContentBase: true,
      disableHostCheck: true
    }
  }

