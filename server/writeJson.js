const fs = require('fs');
const path = require('path');

// 获取当前时间的函数，返回格式为 YYYY-MM-DD
function getCurrentTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 指定新创建文件的路径：位于根目录data文件夹下
const usersPath = path.join(__dirname, '../data/', 'users.json');
const blogsPath = path.join(__dirname, '../data/', 'posts.json');

// 用户数据，用一个数组保存。最初只有一个admin管理员和管理员通知用户adminw，以后可以再添加其他用户
const users = [
  { name: 'admin', password: '123456' },
  { name: 'adminw', password: '123456' }
];

// 博文数据，用一个数组保存。最初只有一个博文，以后可以再添加其他博文
const posts = [
  {
    name: 'adminw',
    title: '欢迎来到Purple!',
    texts: '大家好！我是Purple的管理员，非常欢迎大家加入Purple社区！一起来发表属于你的博文吧！',
    time: getCurrentTime(), // 添加time字段
    id: 'adminw1' // 更新id字段格式
  },
  {
    name: 'adminw',
    title: '关于开发者',
    texts: '本网站由中国传媒大学21计科班的学生何琪皓开发，他来自湖南湘潭，2003年生，是一个电影、音乐、摄影、平面设计爱好者。最初是为了完成扈老师《基于平台的软件开发》的课程设计，先已经开源在GitHub上，欢迎大家一起来完善！',
    time: getCurrentTime(), // 添加time字段
    id: 'adminw2' // 更新id字段格式
  },
];

// 将users数组转换为JSON字符串，并设置缩进为2个空格以便于阅读。
const usersJsonData = JSON.stringify(users, null, 2);
// 将posts数组转换为JSON字符串，并设置缩进为2个空格以便于阅读。
const postsJsonData = JSON.stringify(posts, null, 2);

// 将用户数据写入JSON文件
fs.writeFile(usersPath, usersJsonData, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Users file has been created.');
});

// 将博文数据写入JSON文件
fs.writeFile(blogsPath, postsJsonData, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Posts file has been created.');
});
