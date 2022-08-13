const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

// 使用nodejs方式调用webpack server
common().then((base) => {
  const config = merge(base, {
    mode: 'production',
    optimization: {
      minimizer: [
        // new OptimizeCss(),
        new CssMinimizerPlugin(),
        new TerserPlugin({
          //启用文件缓存
          // cache: true,
          // //使用多线程并行运行提高构建速度
          // parallel: true,
          // //使用 SourceMaps 将错误信息的位置映射到模块
          // sourceMap: true,
        }),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          react: {
            name: 'react',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
            priority: 12,
          },
          // utils: {
          //   name: 'utils',
          //   chunks: 'all',
          //   test: /[\\/]node_modules[\\/](axios|antd-mobile)[\\/]/,
          //   priority: 12,
          // },
        },
      },
    },
    plugins: [new BundleAnalyzerPlugin()],
  });
  const compiler = webpack(config);

  compiler.run((err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    if (stats.hasErrors() || stats.hasWarnings()) {
      console.log(stats.toString('errors-warnings'));
    }
    compiler.close((closeErr) => {
      closeErr && console.log(closeErr);
    });
  });
});

