const {getAllPackageJsonFiles, writePrettyJson, argsValidation} = require('./utils');
const fs = require('fs');
const directory = '..';
const files = getAllPackageJsonFiles(directory);

const args = process.argv;
argsValidation(args, 3, 'move-dep-to-devdep.js sinon');
const package = args[2];

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(content);
    const {dependencies, devDependencies} = json;
    let shuldUpdate = false;
    if (dependencies && Object.keys(dependencies).includes(package)) {
        const propertyVersion = dependencies[package];
        devDependencies[package] = propertyVersion;
        delete dependencies[package];
        shuldUpdate = true;
    }
    json.devDependencies = devDependencies;
    json.dependencies = dependencies;
    if (shuldUpdate) {
        console.log(`updating: ${file}`);
        writePrettyJson(file, json);
    }
});
