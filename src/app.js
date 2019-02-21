var _msbuild = require('msbuild');
var msbuild = new _msbuild();

function build(action) {
    return new Promise((resolve,reject) => {
        let path = action.params.PATH;
        let config = action.params.CONFIG;
        msbuild.configuration = config;
        msbuild.sourcePath = path;
        msbuild.build(function (err, res) {
            if (err) {
                return reject (err);
            }
            resolve (res)
        });
    })
}

function publish(action) {
    return new Promise((resolve,reject) => {
        let path = action.params.PATHPROJ;
        let profile = action.params.PROFILE;
        msbuild.publishProfile = profile;
        msbuild.sourcePath = path;
        msbuild.publish(function (err, res) {
            if (err) {
                return reject (err);
            }
            resolve (res)
        });
    })
}

module.exports = {
    build: build,
    publish: publish
}