
var Sass = require('../lib/main')

var sass = new Sass({ sourceDir : __dirname + '/sass', destinationDir : __dirname + '/css' }) 

sass.run()