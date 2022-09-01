// const { resolve } = require('path');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    port: 8080,
    static: path.join(__dirname, 'public'),
  },
};

// const esLintPlugin = (isDev) => isDev ? [] : [ new ESLintPlugin({ extensions: ['ts', 'js'] }) ];

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
  // entry: {
  //   main: './src/js/index.js',
  // },
  entry: './src/js/index.js',
  output: {
    // clean: true,
    path: path.resolve(__dirname, 'dist'),
    // filename: '[name].[contenthash].js',
    filename: './js/bundle.js',
    assetModuleFilename: 'assets/[hash][ext]',
  },
  module: {
    rules: [
      // {
      //   test: /\.[tj]s$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(mp3|ogg)$/,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'Demo webpack'
      template: './src/index.html',
      favicon: './src/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].css'
      // filename: '[name].[contenthash].css'
    }),
/*    new CopyPlugin({
      patterns: [
        // {from: './public',}
        // { from: './public', to 'dir' },
        // noErrorOnMissing: true,
        // { from: './src/assets/quotes/*.json', to: './assets/quotes/[name][ext]' },
        // { from: './src/assets/sounds/*.mp3', to: './assets/sounds/[name][ext]' },
      ],
    }),*/
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // ...esLintPlugin(development),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  ...devServer(development),
});