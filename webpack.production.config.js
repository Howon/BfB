var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'app', 'build');

var config = {
  // We change to normal source mapping
  devtool: 'source-map',
  entry: {
    home: './app/render/homepage.jsx',  
    class: './app/render/classpage.jsx'
  },
  output: {
    path: buildPath,
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
      exclude: [nodeModulesPath]
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  },
};

module.exports = config;