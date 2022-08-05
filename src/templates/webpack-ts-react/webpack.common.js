const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const __DEV__ = process.env.NODE_ENV === 'development'

module.exports = {
  stats: {
    chunks: false,
    children: false,
    modules: false,
    colors: true
  },
  devtool: __DEV__ ? 'source-map' : false,
  entry: './src/main.tsx',
  output: {
    libraryTarget: 'umd',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', 'json'],
    alias: {
      '@src': path.join(__dirname, 'src'),
      '@components': path.join(__dirname, './src/components'),
      '@shared': path.join(__dirname, './shared'),
      '@api': path.join(__dirname, './api')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            }
          },
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            }
          },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(tsx|ts|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-typescript', { allowNamespaces: true }],
                '@babel/preset-react',
                [
                  '@babel/preset-env',
                  {
                    targets: { chrome: '63' },
                    loose: true
                  }
                ]
              ],
              plugins: [
                'jsx-control-statements',
                ['@babel/plugin-syntax-dynamic-import'],
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-nullish-coalescing-operator',
                '@babel/plugin-transform-react-constant-elements'
              ]
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|ico|webp)$/,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 8192,
              fallback: require.resolve('file-loader'),
              name: '[name]-[hash].[ext]',
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.(svg)$/,
        loader: 'svg-react-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      hash: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash:12].css',
      ignoreOrder: false
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      cacheGroups: {
        default: {
          name: 'bundle',
          priority: -30
        },
        common: {
          test: /[\\/]src\/components[\\/]/,
          name: 'common',
          priority: -20
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: -10
        }
      }
    }
  }
}
