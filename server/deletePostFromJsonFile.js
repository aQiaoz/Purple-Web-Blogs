const fs = require('fs');

function deletePostFromJsonFile(filePath, postId, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }

        let posts = JSON.parse(data);
        posts = posts.filter(post => post.id !== postId);

        const jsonString = JSON.stringify(posts, null, 2);
        fs.writeFile(filePath, jsonString, (err) => {
            if (err) {
                return callback(err);
            }
            callback(null, '博文成功删除');
        });
    });
}

module.exports = deletePostFromJsonFile;