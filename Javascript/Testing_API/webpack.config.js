// webpack.config.js
const path = require('path');

module.exports = {
  entry: {
    app: './script.js',
    login: './js/login.js',
    signup: './js/signup.js',
    home: './js/home.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
        directory: path.join(__dirname),
      },
      port: 8080,
      hot: true,
  },
};
