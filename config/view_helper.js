const manifest = require('../public/assets/rev-manifest.json');
const env = require('./environment');
// const fs = require('fs');

module.exports = function(app){
    app.locals.assetPath = function(filePath){
        if(env.name == 'development'){
            return '/' + filePath;
        }
        return '/' + manifest[filePath];

        // this also works
        // return JSON.parse(fs.readFileSync('./public/assets/rev-manifest.json'))[filePath]
    }
}
