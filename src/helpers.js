const _msbuild = require('msbuild');
const path = require('path');
const spawn = require('child_process').spawn;

function getAndConfigMsBuild(resolve, reject, settings, sourcePath) {
    if (!sourcePath){
        throw "Source Path was not provided!";
    }
    var msbuild = new _msbuild();
    msbuild.sourcePath = sourcePath;

    // config msbuild exec to run from the directory of the sourcePath
    msbuild.exec = genNewExec(sourcePath); 

    msbuild.on('error',function(err, results){
        reject ({err : err, status:"failure"})
    });

    msbuild.on('done',function(err, results){
        if (err) return reject ({err : err, status:"failure"});

        resolve ({
            status : "success"
        });
    });

    if (settings.version){
        msbuild.config('version', settings.version);
    }
    else if (settings.exePath) {
        msbuild.buildexe = () => settings.exePath;
    }

    return msbuild;
}

function genNewExec(sourcePath){
    return function(exe, params, cb){
        var self = this;
        const cwd = path.dirname(sourcePath);
        function onClose(code) {
            var msg = '';
            if (code === 0) {
                msg = msg+('\n finished - (0) errors'.white.greenBG);
                self.emit('done',null,msg);
            }
            else {
                msg = ('\n error code: ' + code).grey+('\n failed - errors'.white.redBG);
                msg += '\n'+exe; 
                if(params !== undefined && typeof params === 'array'){
                    params.forEach(function(p){msg += ' ' + p; }); 
                }
                self.emit('error',code,msg);
                return;
            }		
            cb();
        }
        return spawn(exe, params, { stdio: 'inherit', cwd: cwd }).on('close', onClose );
    }
}

module.exports = {
    getAndConfigMsBuild
}