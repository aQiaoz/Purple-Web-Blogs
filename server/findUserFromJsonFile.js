const fs = require('fs');

const findUserFromJsonFile = (filePath, username, password, callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return callback(new Error('服务器错误'));
        }

        const users = JSON.parse(data);
        const user = users.find(user => user.name === username);

        if (!user) {
            return callback(null, null, '昵称不存在');
        }

        if (user.password !== password) {
            return callback(null, null, '密码错误');
        }

        callback(null, user, '登录成功');
    });
}

module.exports = findUserFromJsonFile;
