const fs = require('fs');
const path = require('path');

const addObjectToJsonFile = (filePath, newUser, callback) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return callback(err);
        }
 
        let users = [];
        if (data.length) {
            try {
                users = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing JSON file:', parseErr);
                return callback(parseErr);
            }
        }

        if (users.some(user => user.name === newUser.username)) {
            return callback(new Error('昵称已存在'));
        }

        users.push({ name: newUser.username, password: newUser.password });

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to JSON file:', writeErr);
                return callback(writeErr);
            }
            callback(null, '注册成功');
        });
    });
};

module.exports = addObjectToJsonFile;
