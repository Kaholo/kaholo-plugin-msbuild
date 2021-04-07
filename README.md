# kaholo-plugin-msbuid
MSBuild plugin for Kaholo.

## Settings
1. Tools Version - the tools version to run commands with. determines local path to msbuild.exe.

## Method: Build
Build solution.


### Parameters
1. Path to .sln (String) **Required** - Path of sln file to build.
2. Config (String) **Optional** - Build configuration. usually debug/release.

## Method: Publish
Publish a web app.

### Parameters
1. Path to .sln\\.proj (String) **Required** - Path to .sln\\.proj file of web app to publish
2. Profile (String) **Optional** - Publish profile. Targets a specific machine.

## Method: Restore
Run MSBuild Restore command on provided solution. Restore downloads all missing libraries.

### Parameters
1. Path to .sln (String) **Required** - Path of sln file to restore.

## Method: Rebuild
Rebuild solution.

### Parameters
1. Path to .sln (String) **Required** - Path of sln file to rebuild.
2. Config (String) **Optional** - Build configuration. usually debug/release.
