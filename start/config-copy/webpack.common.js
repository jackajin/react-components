const processCwd = process.cwd();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const env = require(processCwd + '/start/config/env');
const entry = path.join(processCwd, 'src');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  context: entry,
  entry: path.join(entry, './index.tsx'),
  output: {
    filename: '[name].bundle.js',
    path: path.join(processCwd, 'dist'),
    clean: true,
    chunkFilename: '[name].bundle.js',
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(processCwd, 'src/index.html'),
      title: '工程协同',
      debug: true,
    }),
    new WebpackBar(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    fallback: {
      fs: false,
      path: false,
      assert: false,
    },
    alias: {
      '@': entry,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: [/(node_modules)/, /(lib)/],
        use: [
          {
            loader: path.join(processCwd, './start/config/loaders/env-loader.js'),
            options: {
              env,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-syntax-dynamic-import'],
            },
          },
          'astroturf/loader',
          {
            loader: path.join(processCwd, './start/config/loaders/env-loader.js'),
            options: {
              env,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|cur|woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[contenthash][ext]',
        },
      },
      {
        test: /\.scss$/,
        use: [
          // 'thread-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportLocalsConvention: 'camelCase',
                mode: 'local',
                localIdentName: '[name]-[hash:base64:5]-[local]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: { exportLocalsConvention: 'camelCase', mode: 'local', localIdentName: '[local]' } },
          },
        ],
      },
    ],
  },
};

module.exports = async () => {
  return config;
};
