const fs = require('fs');
const path = require('path');

const addpostToJsonFile = (filePath, newObject, callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return callback(err);
        }

        let jsonArray = JSON.parse(data);

        // 自动生成ID为当前用户已有博文数+1，ID格式：用户名+数字
        const userPosts = jsonArray.filter(post => post.name === newObject.name);
        newObject.id = newObject.name + (userPosts.length + 1).toString();

        jsonArray.push(newObject);

        const jsonString = JSON.stringify(jsonArray, null, 2);
        fs.writeFile(filePath, jsonString, (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                return callback(err);
            }
            callback(null, '博文成功发布');
        });
    });
};

module.exports = addpostToJsonFile;
