var _msbuild = require('msbuild');

function build(action) {
    return new Promise((resolve,reject) => {
        var msbuild = new _msbuild();
        let path = action.params.PATH;
        let config = action.params.CONFIG;
        msbuild.configuration = config;
        msbuild.sourcePath = path;

        msbuild.on('error',function(err,results){
            reject ({err : err, status:"failure"})
        });

        msbuild.on('done',function(err,results){
            if (err) return reject ({err : err, status:"failure"});

            resolve ({
                status : "success"
            })
        });

        msbuild.build();
    })
}

function publish(action) {
    return new Promise((resolve,reject) => {
        var msbuild = new _msbuild();
        let path = action.params.PATHPROJ;
        let profile = action.params.PROFILE;
        msbuild.publishProfile = profile;
        msbuild.sourcePath = path;


        msbuild.on('error',function(err,results){
            reject ({err : err, status:"failure"})
        });

        msbuild.on('done',function(err,results){
            if (err) return reject ({err : err, status:"failure"});

            resolve ({
                status : "success"
            })
        });

        msbuild.publish();
    })
}

module.exports = {
    build: build,
    publish: publish
}