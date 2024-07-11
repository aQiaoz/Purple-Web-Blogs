<template>
  <div class="container" @click="hideDropdowns">
    <div class="background1" :class="{ darken: showDropdown }"></div>
    <div class="main-wrapper">
      <div class="main">
        <div class="post">
          <div v-if="isAuthor" class="more">
            <span class="iconfont icon-checkmore" @click.stop="toggleDropdown"></span>
          </div>
          <div class="post-header">
            <h2>{{ post.title }}</h2>
            <p class="date">{{ post.time }}</p>
          </div>
          <div class="author-info">
            <span class="iconfont icon-user-filling"></span>
            <p class="author">{{ post.name }}</p>
          </div>
          <div class="post-content" v-html="post.texts"></div>
        </div>
        <div class="bkbutton">
          <button class="back-button" @click="goBack">返回</button>
        </div>
        <div class="copyright">
          <p>© 2024 Purple. 何琪皓 2021212033020</p>
        </div>
      </div>
    </div>
    <div v-if="showDropdown" class="dropdown-overlay" @click="hideDropdowns">
      <div class="dropdown-menu" @click.stop>
        <button class="button1" @click="editPost">编辑</button>
        <button class="button2" @click="deletePost">删除</button>
        <button class="button3" @click="hideDropdowns">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Post",
  data() {
    return {
      post: null,
      username: localStorage.getItem('username'),
      showDropdown: false,
      isAuthor: false,
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
        this.isAuthor = this.username === this.post.name;
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    },
    editPost() {
      this.$router.push({ path: `/edit/${this.post.id}` });
    },
    async deletePost() {
      try {
        const response = await axios.delete(`http://localhost:3000/posts/${this.post.id}`);
        alert(response.data);
        this.$router.push({ path: "/homepage" });
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    hideDropdowns() {
      this.showDropdown = false;
    },
    goBack() {
      this.$router.push({ path: "/homepage" });
    }
  }
};
</script>

<style scoped>
body {
  margin: 0;
  overflow: hidden;
  /* 禁止背景滚动 */
}

.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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

.background1.darken {
  filter: brightness(0.5);
}

.main-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1;
}

.main {
  max-height: 95%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
}

.more {
  position: absolute;
  top: 10px;
  right: 10px;
}

.icon-checkmore {
  font-size: 40px;
  /* 增大图标大小 */
  cursor: pointer;
  color: #a12370;
}

.post {
  position: relative;  /* 添加这一行，使 more 的 position: absolute 生效 */
  top: 40px;
  width: 80%;
  max-width: 900px;
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 12px 16px rgba(0, 0, 0, 0.24), 0 17px 50px rgba(0, 0, 0, 0.19);
}

.post-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.post h2 {
  text-align: center;
  color: #ca2c8e;
  /* 标题的紫色 */
  font-size: 2rem;
  /* 增大字体 */
}

.icon-user-filling {
  font-size: 20px;
  /* 增大图标大小 */
  cursor: pointer;
  color: #a12370;
}

.author-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.author {
  margin: 0;
  font-weight: bold;
  color: #707070;
}

.post-content {
  white-space: pre-wrap;
  /* 保留换行和空格 */
  line-height: 1.6;
  /* 调整行高 */
  word-wrap: break-word;
  /* 防止超长单词导致布局问题 */
  overflow: visible;
}

button {
  width: 150px;
  margin: 10px;
  background-color: #ca2c8e;
  color: #fafafa;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 20px;
}

button:hover {
  background-color: #a12370;
}
.bkbutton {
  margin-bottom: 60px; /* 增加距离 */

}
.back-button {
  margin-top: 60px; /* 增加距离 */
  margin-bottom: 60px; /* 增加距离 */
  align-self: center;
}

.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.dropdown-menu {
  width: 300px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button1{
  width: 300px;
  margin: 0;
  margin-bottom: 1px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.button2{
  width: 300px;
  margin: 0;
  border-radius: 0;
}

.button3{
  width: 300px;
  margin: 0;
  margin-top: 1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

}

.copyright {
  margin-top: 20px;
  text-align: center;
  bottom: 0;
  color: #961364;
  font-size: 13px;
  font-weight: bold;
}

.post-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.post-header .date {
  margin-top: 1px;
  font-size: 0.9rem;
  color: #707070;
}
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 22px;
  color: #a12370;
  margin-right: 1px;
  margin-top: 3px;
}

.icon-user-filling:before {
  content: "\e828";
}

.icon-checkmore:before {
  content: "\e6a8";
}
</style>
