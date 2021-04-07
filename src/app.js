const { getAndConfigMsBuild } = require("./helpers");

async function build(action, settings, target) {
    const config = (action.params.CONFIG || "").trim();
    const path = (action.params.PATHPROJ || "").trim();
    return new Promise((resolve,reject) => {
        var msbuild = getAndConfigMsBuild(resolve, reject, settings, path);
        if (config) {
            msbuild.configuration = config;
        }
        if (target){
            const overrideParams = [`/t:${target}`];
            msbuild.config('overrideParams', overrideParams);
        }
        msbuild.build();
    });
}

async function publish(action, settings) {
    const profile = (action.params.PROFILE || "").trim();
    const path = (action.params.PATHPROJ || "").trim();
    return new Promise((resolve,reject) => {
        var msbuild = getAndConfigMsBuild(resolve, reject, settings, path);
        if (profile) {
            msbuild.publishProfile = profile;
        }
        
        msbuild.publish();
    });
}

async function restore(action, settings) {
    return build(action, settings, "Restore");
}

async function rebuild(action, settings) {
    return build(action, settings, "Rebuild");
}

module.exports = {
    build,
    publish,
    restore,
    rebuild
}