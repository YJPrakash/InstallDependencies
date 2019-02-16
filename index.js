#!/usr/bin/env node

'use strict';
(async () => {
    const util = require('util');
    const FR = require('./fileRequester.js');
    const exec = util.promisify(require('child_process').exec);
    const fs = require('fs');
    const path = require('path');

    let readPackageJSON = () => FR.readFile(path.resolve(process.cwd(), "package.json"));

    function installPackage(packageName) {
        console.log(packageName);
        return exec(`nls ${packageName}`)
            .then((e) => {
                fs.appendFile('.successLog.txt', e, () => {});
            })
            .catch((e) => {
                fs.appendFile('.errorLog.txt', e, () => {});
            });
    }

    let main = (async () => {
        readPackageJSON()
            .then(async (packageJSON) => {
                packageJSON = JSON.parse(packageJSON);
                packageJSON.dependencies = packageJSON.dependencies || {};
                packageJSON.devDependencies = packageJSON.devDependencies || {};
                let packages = {
                    ...packageJSON.dependencies,
                    ...packageJSON.devDependencies
                }
                for (let [k, v] of Object.entries(packages)) {
                    if (v[0] === "^") v = v.slice(1, v.length);
                    await installPackage(`${k}@${v}`)
                }
            }).catch((e) => {
                console.log("error");
                fs.appendFile('.errorLog.txt', `Missing package.json `, () => {});
            });
    })();

})();
