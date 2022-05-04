const {getAllPackageJsonFiles, writePrettyJson, argsValidation} = require('./utils');
const fs = require('fs');
const directory = '..';

const args = process.argv;
argsValidation(args, 4, 'lerna - updater sinon ^4.3.3');

const files = getAllPackageJsonFiles(directory);

const package = args[2];
const version = args[3];

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(content);
    const {dependencies, devDependencies} = json;
    let shuldUpdate = false;
    if (dependencies && Object.keys(dependencies).includes(package)) {
        dependencies[package] = version;
        shuldUpdate = true;
    }
    if (devDependencies && Object.keys(devDependencies).includes(package)) {
        devDependencies[package] = version;
        shuldUpdate = true;
    }
    json.devDependencies = devDependencies;
    json.dependencies = dependencies;
    if (shuldUpdate) {
        console.log(`updating: ${file}`);
        writePrettyJson(file, json);
    }
});
