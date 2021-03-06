const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new ExtractTextPlugin(
  { filename:'styles/bundle.min.css', disable:false, allChunks: true }
);

// Webpack Development Config
module.exports = {

  //devtool: 'source-map',

  context: path.join(__dirname, ''), // copy-webpack-plugin output path
  entry: [
    path.join(__dirname, "./scripts/app.js"),
    path.join(__dirname, "./styles/index.js")
  ],

  output: {
    path: '/',//not used
    filename: 'scripts/bundle.min.js',
    publicPath: 'http://localhost:3069/'
  },

  module: {
    loaders: [
      { test: /\.less$/,  exclude: /node_modules/, loader: extractLESS.extract(['css-loader','less-loader']) },
      { test: /\.(js|jsx)$/i, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['env']} },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /.*\.(gif|png|jpe?g|svg)$/i, loaders: [
        'file?name=images/[name].[ext]',
        'image-webpack'
      ]}
    ]
  },

  plugins: [
    extractLESS,
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.UglifyJsPlugin({ //test minified size
    //   comments: false,
    //   compress: { warnings: false }
    // }),
    new CopyWebpackPlugin([
      {from: path.join(__dirname, "./images"), to: "images"},
      {from: path.join(__dirname, "./fonts"), to: "fonts"},
      {from: path.join(__dirname, "./audio"), to: "audio"}
    ])
  ]

};
