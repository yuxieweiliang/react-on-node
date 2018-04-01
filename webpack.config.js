const webpack = require('webpack');
const path = require('path');
const publicPath =path.resolve(__dirname, './build');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  // context: path.resolve('./app'),
  // devtool: 'eval-source-map',
  entry: {
    index: './app/main.js',
    book: './app/book.js',
    other: './app/other.js',
    vendors: ['react', 'react-dom']
  },
  output: {
    path: publicPath, // 也可以使用 publicPath
    filename: '[name].build.js',
    // publicPath: publicPath,
    // webpack-dev-server伺服的文件是相对publicPath这个路径的
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    // 定义了解析模块路径时的配置，常用的就是extensions，可以用来指定模块的后缀，这样在引入模块时就不需要写后缀了，会自动补全
    extensions: ['.js', '.jsx'],
    alias: {
      moment: "moment/min/moment-with-locales.min.js" // 为路径设置别名
      //'type': path.resolve(rootDir, './lib/jquery.min.js')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        // enforce: "pre",
        exclude: /node_modules/,
        use: ['babel-loader']
        /*loader: ["eslint-loader"]*/
      },
      // 处理less
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback:"style-loader",
          use:[{
            loader:"css-loader"
          },{
            loader:"postcss-loader"
          },{
            loader:"less-loader"
          }]
        })
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jade$/,
        loader: 'jade'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=8192'
      },
    ]
  },
  plugins: [
    /*new CleanWebpackPlugin(['./build/'], {
      verbose: true,
      dry: false,
    }),*/
    // 根据出现次数为每一个模块或者chunk设置id
    new webpack.optimize.OccurrenceOrderPlugin(),

    // 模块热替换
    new webpack.HotModuleReplacementPlugin(),

    // 跳过错误
    new webpack.NoEmitOnErrorsPlugin(),

    new ExtractTextPlugin('[name].css'),

    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    // 抽取公用脚本
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendors'],
      filename: 'vendors.js',
      minChunks: Infinity,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};