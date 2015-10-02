var webpack = require('webpack');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './app/render/homepage.jsx'],
  },
  node: {
  fs: "empty"
},
  output: {
    path: './public/build',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/build/'
  },
  devServer: {
    contentBase: './public',
    publicPath: 'http://localhost:8080/build/'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}