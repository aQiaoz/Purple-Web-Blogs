<template>
  <div class="container">
    <div class="background1"></div>
    <div class="main">
      <h2>创建新博文</h2>
      <div class="postbox">
        <input v-model="newPost.title" placeholder="标题" />
        <textarea v-model="newPost.texts" placeholder="内容"></textarea>
      </div>
      <button @click="createPost">发布</button>
      <button @click="goBack">返回</button>
    </div>
    <div class="copyright">
      <p>© 2024 Purple. 何琪皓 2021212033020</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "CreatePost",
  data() {
    return {
      newPost: {
        title: "",
        texts: "",
        name: "",
        time: ""
      }
    };
  },
  methods: {
    async createPost() {
      if (!this.newPost.title || !this.newPost.texts) {
        alert("标题和内容不能为空");
        return;
      }
      // 设置当前用户名
      this.newPost.name = localStorage.getItem("username");

      if (!this.newPost.name) {
        alert("未能获取当前用户信息，请重新登录");
        this.$router.push('/login');
        return;
      }

      // 设置当前时间
      const currentDate = new Date();
      this.newPost.time = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

      try {
        const response = await axios.post("http://localhost:3000/posts", this.newPost);
        alert(response.data);
        this.$router.push({ path: "/homepage" });
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    goBack() {
      this.$router.push({ path: "/homepage" });
    }
  },
  created() {
    if (!localStorage.getItem('username')) {
      this.$router.push('/create');
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.background1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("./img/background2.jpg");
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.main {
  width: 800px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 12px 16px rgba(0, 0, 0, 0.24),
    0 17px 50px rgba(0, 0, 0, 0.19);
  position: relative;
  z-index: 1;
}

.postbox {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

input {
  cursor: pointer;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
}

textarea {
  height: 300px;
  /* 你可以根据需要调整高度 */
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  resize: none;
  /* 禁止拉伸 */
  overflow-y: auto;
  font-size: 14px;
}

h2 {
  text-align: center;
  color: #ca2c8e;
  /* 标题的紫色 */
  font-size: 2rem;
  /* 增大字体 */
}

button {
  width: 150px;
  margin-top: 10px;
  background-color: #ca2c8e;
  color: #fafafa;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 20px;
}

button:hover {
  background-color: #c82b8b;
}

.copyright {
  position: absolute;
  bottom: 0;
  margin-top: 100px;
  text-align: center;
  color: #961364;
  font-size: 13px;
  font-weight: bold;
}
</style>
