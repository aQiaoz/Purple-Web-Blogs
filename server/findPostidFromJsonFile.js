const fs = require('fs');

function findPostidFromJsonFile(filePath, postId, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }

        const posts = JSON.parse(data);
        const post = posts.find(post => post.id === postId);

        if (!post) {
            return callback(new Error('博文未找到'));
        }

        callback(null, post);
    });
}

module.exports = findPostidFromJsonFile;