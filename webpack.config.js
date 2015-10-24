var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
  entry: {
    home: ['webpack/hot/dev-server', './app/render/homepage.jsx'],    
    chat: ['webpack/hot/dev-server', './app/render/chatpage.jsx']
  },
  output: {
    path: './public/build',
    filename: '[name].js'
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