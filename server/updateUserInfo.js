const fs = require('fs');
const path = require('path');

const updateUserInfo = (userFilePath, postsFilePath, username, newInfo, callback) => {
    fs.readFile(userFilePath, 'utf8', (err, userData) => {
        if (err) {
            return callback(new Error('读取用户数据失败'));
        }

        const users = JSON.parse(userData);
        const userIndex = users.findIndex(user => user.name === username);

        if (userIndex === -1) {
            return callback(new Error('用户未找到'));
        }

        const user = users[userIndex];

        if (newInfo.newName) {
            user.name = newInfo.newName;
        }

        if (newInfo.password) {
            user.password = newInfo.password;
        }

        fs.writeFile(userFilePath, JSON.stringify(users, null, 2), 'utf8', err => {
            if (err) {
                return callback(new Error('更新用户数据失败'));
            }

            if (newInfo.newName) {
                fs.readFile(postsFilePath, 'utf8', (err, postData) => {
                    if (err) {
                        return callback(new Error('读取博文数据失败'));
                    }

                    const posts = JSON.parse(postData);
                    posts.forEach(post => {
                        if (post.name === username) {
                            post.name = newInfo.newName;
                            post.id = newInfo.newName + post.id.replace(username, '');
                        }
                    });

                    fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), 'utf8', err => {
                        if (err) {
                            return callback(new Error('更新博文用户名失败'));
                        }

                        callback(null, '用户信息更新成功');
                    });
                });
            } else {
                callback(null, '用户信息更新成功');
            }
        });
    });
};

module.exports = updateUserInfo;
