
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const processCwd = process.cwd();

const config = {
  entry: path.join(`${processCwd}/src`, 'index.ts'),
  output: {
    path: path.join(`${processCwd}/src`, 'dist'),
    clean: true,
  },
  mode: 'development',
  plugins:[
    new HtmlWebpackPlugin(),
    new WebpackBar()
  ],
}


const compiler = webpack(config)
compiler.run();