const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const adduserToJsonFile = require('./adduserToJsonFile');
const findUserFromJsonFile = require('./findUserFromJsonFile');
const addpostToJsonFile = require('./addpostToJsonFile');
const findPostFromJsonFile = require('./findPostFromJsonFile');
const findPostidFromJsonFile = require('./findPostidFromJsonFile');
const deletePostFromJsonFile = require('./deletePostFromJsonFile');
const updatePostInfo = require('./updatePostInfo');
const deleteUserFromJson = require('./deleteUserFromJson');
const updateUserInfo = require('./updateUserInfo');

const app = express();
const PORT = 3000;

// 确保在服务器启动前调用 writeJson.js 文件
require('./writeJson');

const userFilePath = path.resolve(__dirname, '../data/users.json');
const postsFilePath = path.resolve(__dirname, '../data/posts.json');

app.use(cors());
app.use(bodyParser.json());

app.get('/register', (req, res) => {
    res.send('This is the registration endpoint. Use POST to register a new user.');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    console.log('Received registration request:', req.body);

    adduserToJsonFile(userFilePath, { username, password }, (err, message) => {
        if (err) {
            if (err.message === '昵称已存在') {
                return res.status(400).send(err.message);
            }
            return res.status(500).send('服务器错误');
        }
        res.send(message);
    });
});

app.get('/login', (req, res) => {
    res.send('This is the registration endpoint. Use POST to register a new user.');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log('Received login request:', req.body);

    findUserFromJsonFile(userFilePath, username, password, (err, user, message) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        if (!user) {
            return res.status(400).send({ success: false, message: message });
        }

        if (username === 'admin') {
            return res.send({ success: true, message: '管理员登录成功', isAdmin: true });
        }

        res.send({ success: true, message: message });
    });
});

// 博文管理

app.get('/posts', (req, res) => {
    findPostFromJsonFile(postsFilePath, null, (err, posts) => {
        if (err) {
            return res.status(500).json({ error: '博文加载失败' });
        }
        res.json(posts);
    });
});

// 获取单个博文
app.get('/posts/:id', (req, res) => {
    const postId = req.params.id;
    findPostidFromJsonFile(postsFilePath, postId, (err, post) => {
        if (err) {
            return res.status(404).send(err.message);
        }
        res.send(post);
    });
});

// 创建新博文
app.post('/posts', (req, res) => {
    const newPost = req.body;
    addpostToJsonFile(postsFilePath, newPost, (err, message) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send(message);
    });
});

//删除博文
app.delete('/posts/:id', (req, res) => {
    const postId = req.params.id;
    deletePostFromJsonFile(postsFilePath, postId, (err, message) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send(message);
    });
});

//编辑博文
app.put('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const updatedPost = req.body;
    updatedPost.time = new Date().toISOString().split('T')[0]; // 更新日期为当前日期
    updatePostInfo(postsFilePath, postId, updatedPost, (err, message) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send(message);
    });
});

// 用户管理

// 获取所有用户
app.get('/users', (req, res) => {
    fs.readFile(userFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ message: '读取用户数据失败' });
        }
        const users = JSON.parse(data);
        res.json(users);
    });
});

// 添加用户
app.post('/users', (req, res) => {
    const { name, password } = req.body;

    console.log('Received add user request:', { name, password });

    adduserToJsonFile(userFilePath, { username: name, password }, (err, message) => {
        if (err) {
            if (err.message === '昵称已存在') {
                return res.status(400).send(err.message);
            }
            return res.status(500).send('服务器错误');
        }
        res.send({ success: true, message: '用户添加成功' });
    });
});

app.delete('/users/:username', (req, res) => {
    const username = req.params.username;

    console.log('Received delete user request:', username);

    deleteUserFromJson(userFilePath, postsFilePath, username, (err, message) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send({ success: true, message });
    });
});

app.put('/users/:username', (req, res) => {
    const username = req.params.username;
    const { newName, password } = req.body;

    console.log('Received update user request:', { username, newName, password });

    updateUserInfo(userFilePath, postsFilePath, username, { newName, password }, (err, message) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send({ success: true, message });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
