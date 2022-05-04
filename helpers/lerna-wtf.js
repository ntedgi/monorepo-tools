const {getAllPackageJsonFiles} = require('./utils');
const fs = require('fs');
const directory = '..';

const depMapper = {};
const files = getAllPackageJsonFiles(directory);
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(content);
    const {name, version, dependencies, devDependencies} = json;
    depMapper[name] = {...depMapper[name], realVersion: version};
    deps = [dependencies, devDependencies].filter(it => it != null);
    deps.forEach(depCollection => {
        Object.keys(depCollection).forEach(key => {
            if (!depMapper.hasOwnProperty(key)) {
                depMapper[key] = {
                    version: [],
                    versionSet: new Set()
                };
            }
            if (!depMapper[key].hasOwnProperty('version')) {
                depMapper[key].version = [];
                depMapper[key].versionSet = new Set();
            }

            depMapper[key].version.push(depCollection[key]);
            depMapper[key].versionSet.add(depCollection[key]);
        });
    });
});

Object.keys(depMapper).forEach(key => {
    if (depMapper[key].version && depMapper[key].versionSet.size > 1) {
        console.log(key);
        console.log(depMapper[key]);
        console.log(key, depMapper[key].versionSet.size);
        const maxVersion = depMapper[key].version.sort()[depMapper[key].version.length - 1];
        console.log(`latest:${maxVersion}`);
        console.log('#################################################################');
    }
});
