const fs = require('fs');

function updatePostInfo(filePath, postId, updatedPost, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }

        let posts = JSON.parse(data);
        const postIndex = posts.findIndex(post => post.id === postId && post.name === updatedPost.name);
        if (postIndex === -1) {
            return callback(new Error('博文没找到'));
        }

        posts[postIndex] = { ...posts[postIndex], ...updatedPost };

        const jsonString = JSON.stringify(posts, null, 2);
        fs.writeFile(filePath, jsonString, (err) => {
            if (err) {
                return callback(err);
            }
            callback(null, '博文编辑成功！');
        });
    });
}

module.exports = updatePostInfo;
