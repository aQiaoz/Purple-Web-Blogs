<template>
  <div class="container">
    <div class="background1"></div>
    <div class="main">
      <h2>编辑博文</h2>
      <div class="postbox">
        <input v-model="post.title" placeholder="标题" />
        <textarea v-model="post.texts" placeholder="内容"></textarea>
      </div>
      <button @click="updatePost">保存</button>
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
  name: "EditPost",
  data() {
    return {
      post: null,
      username: localStorage.getItem('username')
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    async fetchPost() {
      const postId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:3000/posts/${postId}?name=${this.username}`);
        this.post = response.data;
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    },
    async updatePost() {
      try {
        this.post.time = new Date().toISOString().split('T')[0]; // 更新日期为当前日期
        const response = await axios.put(`http://localhost:3000/posts/${this.post.id}`, this.post);
        alert(response.data);
        this.$router.push({ path: `/post/${this.post.id}` });
      } catch (error) {
        console.error("Error updating post:", error);
      }
    },
    goBack() {
      this.$router.push({ path: `/post/${this.$route.params.id}` });
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
  height: auto;
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

h2 {
  text-align: center;
  color: #ca2c8e;
  /* 标题的紫色 */
  font-size: 2rem;
  /* 增大字体 */
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
  background-color: #bd2984;
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
