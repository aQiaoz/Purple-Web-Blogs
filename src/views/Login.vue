<template>
  <div class="container">
    <div class="background1"></div>
    <div class="main">
      <div class="title-container">
        <h2>Purple</h2>
      </div>
      <div class="loginbox">
        <div class="loginbox-in">
          <div class="userbox">
            <span class="iconfont">&#xe682;</span>
            <input class="user" v-model="username" placeholder="昵称" />
          </div>
          <p class="error" v-if="errors.username">{{ errors.username }}</p>
          <br />
          <div class="pwdbox">
            <span class="iconfont">&#xe676;</span>
            <input class="pwd" v-model="password" type="password" placeholder="密码" />
          </div>
          <p class="error" v-if="errors.password">{{ errors.password }}</p>
          <br />
          <button type="primary" class="login_btn" @click="login">登录</button>
          <p class="register-link">
            还没有账号? <router-link to="/register" class="register-link-text">立即注册</router-link>
          </p>
          <div class="at-sign">@何琪皓</div>
        </div>
        <div class="background2"></div>
      </div>
      <div class="copyright">
        <p>© 2024 Purple. 何琪皓 2021212033020</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errors: {},
    };
  },
  methods: {
    async login() {
      this.errors = {};

      if (!this.username) {
        this.errors.username = "昵称不能为空";
      }

      if (!this.password) {
        this.errors.password = "密码不能为空";
      }

      if (Object.keys(this.errors).length === 0) {
        try {
          const response = await axios.post("http://localhost:3000/login", {
            username: this.username,
            password: this.password,
          });

          alert(response.data.message);
          if (response.data.success) {
            localStorage.setItem('username', this.username);
            if (this.username === 'admin') {
              this.$router.push({ path: "/admin" });
            } else {
              this.$router.push({ path: "/homepage" });
            }
          }
        } catch (error) {
          if (error.response && error.response.data) {
            alert(error.response.data.message);
          } else {
            alert("登录失败");
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  filter: blur(5px);
  z-index: -1;
}

.main {
  height: 85%;
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}

.loginbox {
  width: 800px;
  height: 400px;
  display: flex;
  box-shadow: 0 12px 16px rgba(0, 0, 0, 0.24),
    0 17px 50px rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.loginbox-in {
  background-color: #ffffff;
  width: 300px;
  padding: 30px;
  position: relative;
}

.userbox,
.pwdbox {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.userbox input,
.pwdbox input {
  flex: 1;
  border: none;
  border-bottom: 2px solid #e9e9e9;
  background-color: transparent;
  height: 30px;
  font-size: 15px;
  color: #c42e8b;
  font-weight: bold;
  outline: none;
}

.userbox input:focus,
.pwdbox input:focus {
  border-bottom: 2px solid #c42e8b;
}

.login_btn {
  width: 100%;
  padding: 10px;
  background-color: #ca2c8e;
  color: #fafafa;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.login_btn:hover {
  background-color: #a12370;
}

.background2 {
  width: 500px;
  background-image: url("./img/background2.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
}

.register-link {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.register-link-text {
  color: #a12370;
  margin-left: 130px;
}

.title-container h2 {
  font-style: italic;
    /* 使字体倾斜 */
    text-align: center;
    margin-bottom: 50px;
    color: #f41fa3;
    font-size: 5rem;
    margin-top: 30px;
    text-shadow: 2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;
}

input:-webkit-autofill {
  /* 修改默认背景框的颜色 */
  box-shadow: 0 0 0px 1000px #ffffff inset !important;
  /* 修改默认字体的颜色 */
  -webkit-text-fill-color: #c42e8b;
}

input:-webkit-autofill::first-line {
  /* 修改默认字体的大小 */
  font-size: 15px;
  /* 修改默认字体的样式 */
  font-weight: bold;
}

.error {
  color: red;
  font-size: 12px;
  margin: -10px 0 10px 35px;
}

.copyright {
  text-align: center;
  position: absolute;
  bottom: 0;
  color: #961364;
  font-size: 13px;
  font-weight: bold;
}

.at-sign {
  position: absolute;
  bottom: 19px;
  right: 19px;
  color: gray;
  font-size: 14px;
}

@font-face {
  font-family: "iconfont logo";
  src: url("https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834");
  src: url("https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834#iefix") format("embedded-opentype"),
    url("https://at.alicdn.com/t/font_985780_km7mi63cihi.woff?t=1545807318834") format("woff"),
    url("https://at.alicdn.com/t/font_985780_km7mi63cihi.ttf?t=1545807318834") format("truetype"),
    url("https://at.alicdn.com/t/font_985780_km7mi63cihi.svg?t=1545807318834#iconfont") format("svg");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 30px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 22px;
  color: #a12370;
  margin-right: 5px;
  margin-top: 3px;
}

.icon-lock:before {
  content: "\e676";
}

.icon-user:before {
  content: "\e682";
}
</style>
