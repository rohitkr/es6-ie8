// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {  
  entry: ['./src/main.js'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    library: 'ES6Module',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
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
          // Note: modules: false: enables tree-shaking but stops exporting Library name
          // and _modules: false: Works fine but tree-shaking doesn't work.
          // modules: false: doesn't works in ie-8.
          // presets: [ 
          //   [ 'es2015', { modules: false } ] 
          // ],
          "presets": [
            ["env", {
              "targets": {
                "browsers": ["> 0.2%"]
              },
              "modules": false, // 
              "loose": true
            }]
          ]
        }
      }
    ]
  },
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
    new HtmlWebpackPlugin({ title: 'Tree-shaking' })
  ],
  devtool: 'source-map',
  profile: true,
  devServer: {
    contentBase: './sample',
    watchContentBase: true,
    disableHostCheck: true
  }
};

