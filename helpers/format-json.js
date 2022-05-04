const {getAllPackageJsonFiles, writePrettyJson} = require('./utils');
const fs = require('fs');
const directory = '..';
const files = getAllPackageJsonFiles(directory);

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(content);
    writePrettyJson(file, json);
});
