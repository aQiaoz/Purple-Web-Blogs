const fs = require('fs');

function findPostFromJsonFile(filePath, name, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }

        let posts = JSON.parse(data);

        // 不再筛选，直接返回所有博文
        callback(null, posts);
    });
}

module.exports = findPostFromJsonFile;
