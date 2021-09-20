const Webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    filename: 'main_[chunkhash:8].js',
    chunkFilename: 'main_[name]_[chunkhash:8].js',
    path: path.join(__dirname, 'build'),
    //publicPath: '/'
  },
  plugins: [
    new Webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: './index.html'
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.mjs$/,
      type: 'javascript/auto'
    }, {
      test: /\.(jpe?g|png|gif|woff|eot|ttf|ico|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 1,
        esModule: false
      }
    }]
  },
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser")
    }
  },
  mode: 'production'
}
