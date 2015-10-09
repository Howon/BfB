var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {

  entry: {
    //app: path.resolve(__dirname, 'app/render/homepage.jsx'),
    // test: path.resolve(__dirname, 'app/render/chatpage.jsx'),
    // app: path.resolve(__dirname, './app/render/homepage.jsx'),
    // mobile: path.resolve(__dirname, './app/render/chatpage.jsx'),
    // vendors: ['react'] 
    // app: ['webpack/hot/dev-server', './app/render/homepage.jsx'],
    test: ['webpack/hot/dev-server', './app/render/chatpage.jsx']
  },
  output: {
    path: './public/build',
    publicPath: 'http://localhost:8080/build/',
    filename: 'test.js' //     
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