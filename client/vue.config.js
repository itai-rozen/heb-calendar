const path = require('path')
module.exports = {
  lintOnSave: false,
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer:  {
    disableHostCheck: true ,
    proxy: {
      '/api':{
        target: 'http://localhost:5000'
      }
    }
  }
}
