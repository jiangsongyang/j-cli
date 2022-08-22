import { join, resolve } from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import { ProgressPlugin } from 'webpack'
import { CWD } from '../shared/constant'

const NODE_MODULES_PATH = resolve(CWD, '../cli/node_modules')

export const WEBPACK_COMMON_CONFIG= {
  entry: resolve(CWD, 'src/main.tsx'),
  output: {
    filename: '[name].bundle.js',
    path: resolve(CWD, 'dist'),
    clean: true,
    publicPath: '/assets-se',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [join(NODE_MODULES_PATH, 'style-loader'), join(NODE_MODULES_PATH, 'css-loader')],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          join(NODE_MODULES_PATH, 'style-loader'),
          join(NODE_MODULES_PATH, 'css-loader'),
          {
            loader: join(NODE_MODULES_PATH, 'less-loader'), // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(tsx)?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: join(NODE_MODULES_PATH, 'babel-loader'),
            options: {
              presets: [
                join(NODE_MODULES_PATH, '@babel/preset-env'),
                join(NODE_MODULES_PATH, '@babel/preset-react'),
                [
                  join(NODE_MODULES_PATH, '@babel/preset-typescript'),
                  { isTSX: true, allExtensions: true },
                ],
              ],
              // 缓存：第二次构建时，会读取之前的缓存
              cacheDirectory: true,
              plugins: [
                [join(NODE_MODULES_PATH, 'babel-plugin-react-require')],
                [
                  join(NODE_MODULES_PATH, 'babel-plugin-import'),
                  {
                    libraryName: 'antd',
                    style: true, // or 'css'
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(ts)?$/,
        // include: [resolve('src'), resolve('api')],
        exclude(modulePath) {
          return /node_modules/.test(modulePath) && !/\/common\//.test(modulePath)
        },
        use: [
          {
            loader: join(NODE_MODULES_PATH, 'ts-loader'),
          },
        ],
      },
    ],
  },
  plugins: [
    new ProgressPlugin({
      activeModules: false,
      entries: true,
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: 'entries',
    }),
    new ESLintPlugin({
      fix: true /* 自动帮助修复 */,
      extensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'react'],
      exclude: 'node_modules',
    }),
    new HtmlWebpackPlugin({
      template: resolve(CWD, 'public/index.html'),
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  externals: [],
}
