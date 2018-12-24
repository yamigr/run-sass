const path = require('path')
const sass = require('node-sass')
const watch = require('watch')
const fs = require('fs')

class FileHandler {

    /**
     *
     * @param {object} opt options 
     */
    constructor(opt){
        this.options = typeof opt === 'object' ? opt : {}
    }

    /**
     * Run
     */
    run(){
        let self = this

        if(!this.options.sourceDir || !this.options.destinationDir) throw new Error('No source- or destinationDir defined.')

        watch.watchTree(this.options.sourceDir, function (f, curr, prev) {
            if (typeof f == "object" && prev === null && curr === null) {
                let files = Object.keys(f)
                //console.log('startup:', files)
                for(let name in files){
                    // if file has extension, and not is the sourceDir. Because watchTree will give as first parameter the sourceDir
                    if(path.parse(files[name]).ext){
                        self.compile(files[name])
                    }
                }
              // Finished walking the tree
            } else if (prev === null) {
                //console.log('new:',f)
                self.compile(f)
            } else if (curr.nlink === 0) {
                //console.log('removed:',f)
                self.removeFile(f)
            } else {
                //console.log('changed:',f)
                self.compile(f)
            }
          })
    }

    /**
     * Filename with the resolved path (source)
     * @param {string} filenameWithPath 
     */
    compile(filenameWithPath){
        let self = this
        let filename = self.options.destinationDir + '/' + path.parse(filenameWithPath).name + '.css'
        sass.render({
            file: filenameWithPath,
            outFile: self.options.destinationDir,
        }, function(err, result) { 
            if(err) console.error(err)
            // No errors during the compilation, write this result on the disk
            fs.writeFile(filename, result.css, function(err){
                if(err) console.error(err)
                return
            });
        });
    }

    removeFile(filenameWithPath){
        fs.unlink(this.options.destinationDir + '/' + path.parse(filenameWithPath).name + '.css', (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
    }

    createFile(filename) {
        fs.open(filename,'r',function(err, fd){
          if (err) {
            fs.writeFile(filename, '', function(err) {
                if(err) {
                    console.error(err);
                }
            });
          } else {
          }
        });
      }

  
}

module.exports = FileHandler