const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  stats: 'detailed',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[hash].bundle.js",
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'handlebars': 'handlebars/dist/handlebars.js',
      'api': path.resolve(__dirname, '/src/api'),
      'components': path.resolve(__dirname, '/src/components'),
      'services': path.resolve(__dirname, '/src/services'),
      'core': path.resolve(__dirname, '/src/core'),
      'helpers': path.resolve(__dirname, '/src/helpers'),
      'img': path.resolve(__dirname, '/src/img'),
      'typings': path.resolve(__dirname, '/src/typings'),
      'utils': path.resolve(__dirname, '/src/utils'),
      'views': path.resolve(__dirname, '/src/views'),
      'tests': path.resolve(__dirname, '/src/tests'),
    },
    fallback: {
      "fs": false
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json')
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          precompileOptions: {
            knownHelpersOnly: false,
          },
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new CleanWebpackPlugin(),
  ],
}
