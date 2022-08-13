const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');
const WebpackDevServer = require('webpack-dev-server');

// 使用nodejs方式调用webpack server
common().then((webpackConfig) => {
  const config = merge(webpackConfig, {
    mode: 'development',
    plugins: [],
    devtool: 'cheap-module-source-map',
    devServer: {
      port: 4003,
      host: '0.0.0.0',
      hot: true,
      compress: true,
    },
  });

  const compiler = webpack(config);
  const server = new WebpackDevServer({ ...config.devServer }, compiler);

  server.startCallback(() => {
    console.log('Starting server on http://localhost:4003');
  });
});
