(function (exports) {
    var fs = require('fs');

    exports.readFileSync = function (path) {
        return fs.readFileSync(path);
    };

    exports.readFile = function (path) {
        return new Promise(function (fulfill, reject) {
            fs.readFile(path, "utf8", function (err, data) {
                if (err) reject(err);
                else fulfill(data);
            });
        });
    };

    exports.writeFile = function (path, text) {
        return new Promise(function (fulfill, reject) {
            fs.writeFile(path, text, function (err, data) {
                if (err) reject(err);
                else fulfill(data);
            });
        });
    };

    exports.unlink = function (path) {
        return new Promise(function (fulfill, reject) {
            fs.unlink(path, function (err) {
                if (err) reject(err);
                else fulfill();
            });
        });
    };

    exports.isFileExist = function (path) {
        return new Promise(function (fulfill, reject) {
            fs.stat(path, function (err, data) {
                if (err === null) fulfill(true);
                else if (err.code == "ENOENT") fulfill(false);
                else reject(err);
            });
        });
    };

})(this);
