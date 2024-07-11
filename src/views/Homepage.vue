<template>
  <div class="container" @click="hideDropdowns">
    <div class="background1"></div>
    <div class="content">
      <div class="header">
        <span class="iconfont icon-menu" @click.stop="toggleLogout"></span>
        <div v-if="showLogout" class="logout" @click.stop>
          <button @click="logout">登出</button>
        </div>
        <div class="title-container">
          <h2>Purple</h2>
        </div>
        <span class="iconfont icon-search" @click.stop="toggleSearch"></span>
        <div v-if="showSearch" class="search-box" @click.stop>
          <input type="text" v-model="searchQuery" @input="searchPosts" placeholder="搜索博文标题或作者">
        </div>
      </div>
      <div class="icon-post-container">
        <span class="iconfont icon-create" @click="createPost"></span>
      </div>
      <div class="post-list">
        <div v-for="post in filteredPosts" :key="post.id" class="post-item" @click="viewPost(post.id)">
          <h3>{{ post.title }}</h3>
          <p class="time">{{ post.time }}</p>
          <div class="post-info">
            <div class="author-info">
              <span class="iconfont user">&#xe828;</span>
              <p class="author">{{ post.name }}</p>
            </div>
          </div>
          <div class="post-content" v-html="post.texts"></div>
        </div>
        <div class="copyright">
          <p>© 2024 Purple. 何琪皓 2021212033020</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Homepage",
  data() {
    return {
      posts: [],
      filteredPosts: [],
      username: localStorage.getItem('username') || '',
      searchQuery: '',
      showLogout: false,
      showSearch: false
    };
  },
  created() {
    if (!this.username) {
      this.$router.push('/login');
    } else {
      this.fetchPosts();
    }
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        this.posts = response.data;
        this.filteredPosts = this.posts;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    viewPost(id) {
      this.$router.push({ path: `/post/${id}` });
    },
    createPost() {
      this.$router.push({ path: "/create" });
    },
    logout() {
      localStorage.removeItem('username');
      this.$router.push({ path: "/login" });
    },
    toggleLogout() {
      this.showLogout = !this.showLogout;
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
    },
    searchPosts() {
      this.filteredPosts = this.posts.filter(post => 
        post.title.includes(this.searchQuery) || post.name.includes(this.searchQuery)
      );
    },
    hideDropdowns() {
      this.showLogout = false;
      this.showSearch = false;
    }
  }
};
</script>


<style scoped>
body {
  margin: 0;
  overflow-x: hidden;
  /* 禁止背景滚动 */
}

.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
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

.content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: auto;
  right: auto;
  position: relative;
  padding: 10px;
}

.title-container {
  margin-top: 60px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.icon-post-container {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  /* 调整与标题之间的距离 */
}

.icon-create {
  margin-right: 20px;
  font-size: 50px;
  /* 增大图标大小 */
  cursor: pointer;
  color: #dd319b;
  text-shadow: 2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;
}

.icon-create:hover {
  color: #ff3fb5;
}

.icon-menu,
.icon-search {
  font-size: 30px;
  /* 增大图标大小 */
  cursor: pointer;
  color: #a12370;
}

.icon-menu:hover {
  color: #bd2985;
}

.icon-search:hover {
  color: #bd2985;
}

.logout {
  position: absolute;
  top: 50px;
  left: 10px;
}

.search-box {
  position: absolute;
  top: 7px;
  right: 60px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.search-box input {
  border: none;
  outline: none;
  width: 200px;
  padding: 5px;
}

.search-box input::placeholder {
  color: #aaa;
}

.post-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  /* 避免与标题重叠，调整与图标的距离 */
  /* 避免与标题重叠 */
}

.post-item {
  cursor: pointer;
  width: 80%;
  max-width: 900px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  background-color: #ffffff;
  transition: transform 0.3s;
}

.post-item h3 {
  text-align: center;
  color: #ca2c8e;
  font-size: 25px;
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: bold;
}

.time{
  text-align: center;
  font-size: 0.9rem;
  color: #707070;
}

.post-content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  /* 限制显示至多10行 */
  line-clamp: 10;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  /* 保留换行和空格 */
}

.post-item:hover {
  transform: scale(1.05);
}

h2 {
  font-style: italic;
  text-align: center;
  margin: 20px 0;
  color: #f41fa3;
  font-size: 5rem;
  margin-top: 30px;
  text-shadow: 2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;
}

.user {
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
  background-color: #bd2985;
}

.copyright {
  margin-top: 100px;
  text-align: center;
  bottom: 0;
  color: #961364;
  font-size: 13px;
  font-weight: bold;
}

@font-face {
  font-family: "iconfont logo";
  src: url('https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834');
  src: url('https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834#iefix') format('embedded-opentype'),
    url('https://at.alicdn.com/t/font_985780_km7mi63cihi.woff?t=1545807318834') format('woff'),
    url('https://at.alicdn.com/t/font_985780_km7mi63cihi.ttf?t=1545807318834') format('truetype'),
    url('https://at.alicdn.com/t/font_985780_km7mi63cihi.svg?t=1545807318834#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 30px;
  margin-right: 5px;
  margin-top: 5px;
}

.icon-search:before {
  content: "\e82e";
}

.icon-menu:before {
  content: "\e86b";
}

.icon-customer-fill:before {
  content: "\e828";
}

.icon-create:before {
  content: "\e845";
}
</style>
