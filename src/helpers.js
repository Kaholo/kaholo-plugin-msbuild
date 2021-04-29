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
    msbuild.on('error', (err) => reject({status: "failure", err: err}));
    msbuild.on('done', () => resolve({status : "success"}));
    
    if (settings.exePath) {
        msbuild.buildexe = () => settings.exePath;
    }
    else if (settings.version){
        msbuild.config('version', settings.version);
    }
    return msbuild;
}

function genNewExec(sourcePath){
    return function(exe, params, cb){
        var self = this;
        const cwd = path.dirname(sourcePath);
        function onClose(code) {
            if (code !== 0) {
                return self.emit('error',code,"");;
            }
            self.emit('done', null, "");	
            cb();
        }
        return spawn(exe, params, { stdio: 'inherit', cwd: cwd }).on('close', onClose );
    }
}

module.exports = {
    getAndConfigMsBuild
}