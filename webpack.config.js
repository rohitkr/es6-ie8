// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {  
  entry: ['./src/main.js'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    library: 'ES6Module',
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
          // presets: [ 
          //   [ 'es2015', { modules: false } ] 
          // ],
          "presets": [
            ["env", {
              "targets": {
                "browsers": ["> 0.2%"]
              },
              "_modules": false, // 
              "loose": true
            }]
          ]
        }
      }
    ]
  },
  plugins: [ new HtmlWebpackPlugin({ title: 'Tree-shaking' }) ],
  devtool: 'source-map',
  profile: true,
  devServer: {
    contentBase: './sample',
    watchContentBase: true,
    disableHostCheck: true
  }
};

