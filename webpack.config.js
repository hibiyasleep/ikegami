const path = require('path')
const package = require('./package.json')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ArchivePlugin = require('webpack-archive-plugin')

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/dist/',
    filename: 'ikegami.[name]-' + package.version + '.js',
    chunkFilename: 'ikegami.[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      }, {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      }, {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                'sass': [
                  'vue-style-loader',
                  'css-loader',
                  {
                    loader: 'sass-loader',
                    options: {
                      indentedSyntax: true,
                      data: '@import "variables";',
                      includePaths: [ path.resolve(__dirname, './styles') ]
                    }
                  }
                ]
              }
            }
          // }, {
          //   loader: 'vue-svg-inline-loader',
          //   options: {
          //     inlineKeyword: 'svg-inline'
          //   }
          }
        ]
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.svg$/,
        loader: 'url-loader'
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: './assets',
          outputPath: 'assets/'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('./src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    hot: true,
    // noInfo: true,
    inline: true,
    overlay: true,
    disableHostCheck: true,
    historyApiFallback: true,
    index: 'index.html'
  },
  performance: {
    hints: false
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
//  new BundleAnalyzerPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      compress: true,
      contentBase: '/dist/'
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: 'index.js'
    })
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

if(process.env.NODE_ENV === 'production') {
  module.exports.devtool = undefined
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.optimization = {
    minimize: true,
    nodeEnv: 'production',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
  module.exports.plugins.push(
    new ArchivePlugin({
      output: `dist/ikegami-${package.version}`,
      format: 'tar'
    })
  )
}

if(process.env.ANALYZE) {
  module.exports.plugins.push(
    new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
      analyzerMode: 'static'
    })
  )
}
