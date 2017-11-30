/******************************************************
Instructs Webpack to generate a bundle.js file -- all the
code my app needs to run -- in a format that the browser 
can understand in the public directory, and tells webpack to use babel. 
******************************************************/

//Run webpack to generate bundle.js file, which is served to index.html as a script.

const path = require('path');

module.exports = {
  entry: './js/app.js', 
//app.js is the entry point.

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  }, 
//then webpack generates a bundle.js file inside the 'public' directory.
    
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
        //this instructs webpack to use babel on files whose names end with .js -- exluding files in node_modules directory.
    ]
  }
};