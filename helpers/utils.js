const fs = require('fs');

function getAllPackageJsonFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (!dir.includes('node_modules')) {
            file = dir + '/' + file;
            const stat = fs.statSync(file);
            if (stat && stat.isDirectory()) results = results.concat(getAllPackageJsonFiles(file));
            else {
                if (file.includes('package.json')) results.push(file);
            }
        }
    });
    return results;
}

function writePrettyJson(file, obj) {
    fs.writeFileSync(file, JSON.stringify(obj, null, 4));
}

function argsValidation(args, size, usage) {
    if (args.length < size) {
        throw `missing args to script usage :'node ${usage}'`;
    }
}

module.exports = {
    getAllPackageJsonFiles,
    writePrettyJson,
    argsValidation
};
