const fs = require('fs');
const path = require('path');

const deleteUserFromJson = (userFilePath, postsFilePath, username, callback) => {
    fs.readFile(userFilePath, 'utf8', (err, userData) => {
        if (err) {
            return callback(new Error('读取用户数据失败'));
        }

        const users = JSON.parse(userData);
        const userIndex = users.findIndex(user => user.name === username);

        if (userIndex === -1) {
            return callback(new Error('用户未找到'));
        }

        users.splice(userIndex, 1);

        fs.writeFile(userFilePath, JSON.stringify(users, null, 2), 'utf8', err => {
            if (err) {
                return callback(new Error('删除用户失败'));
            }

            fs.readFile(postsFilePath, 'utf8', (err, postData) => {
                if (err) {
                    return callback(new Error('读取博文数据失败'));
                }

                const posts = JSON.parse(postData);
                const updatedPosts = posts.filter(post => post.name !== username);

                fs.writeFile(postsFilePath, JSON.stringify(updatedPosts, null, 2), 'utf8', err => {
                    if (err) {
                        return callback(new Error('删除用户博文失败'));
                    }

                    callback(null, '用户及其博文删除成功');
                });
            });
        });
    });
};

module.exports = deleteUserFromJson;