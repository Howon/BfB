var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'src', 'build');

var config = {
  // We change to normal source mapping
  devtool: 'source-map',
  entry: {
    home: './src/static/jsx/HomePageAnchor.jsx',
    course: './src/static/jsx/CoursePageAnchor.jsx'
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
      exclude: [nodeModulesPath],
      query: {presets: ['es2015', 'react'] }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  },
};

module.exports = config;