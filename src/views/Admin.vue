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
                    <h2>欢迎回来! 管理员</h2>
                </div>
                <span class="iconfont icon-search" @click.stop="toggleSearch"></span>
                <div v-if="showSearch" class="search-box" @click.stop>
                    <input type="text" v-model="searchQuery" @input="searchUsers" placeholder="搜索用户">
                </div>
            </div>
            <div class="admin-modules">
                <button class="add-button" @click="toggleAddUser">添加用户</button>
                <div v-for="user in nonAdminUsers" :key="user.name" class="user-item">
                    <div class="user-name">{{ user.name }}</div>
                    <div class="user-password">密码: {{ user.password }}</div>
                    <div class="user-posts">博文量: {{ user.postCount }}</div>
                    <div class="user-buttons">
                        <button @click="showEditUser(user)">编辑</button>
                        <button @click="deleteUser(user.name)">删除</button>
                    </div>
                </div>
                <div v-if="showEditModal" class="modal">
                    <div class="modal-content" @click.stop>
                        <h3>编辑用户</h3>
                        <div class="text-list">
                            <input type="text" v-model="editUser.newName" placeholder="新用户名">
                            <input type="text" v-model="editUser.newPassword" placeholder="新密码">
                        </div>
                        <div class="button-list">
                            <button @click="updateUser">确定</button>
                            <button @click="closeEditModal">取消</button>
                        </div>
                    </div>
                </div>
                <div v-if="showAddModal" class="modal">
                    <div class="modal-content" @click.stop>
                        <h3>添加用户</h3>
                        <div class="text-list">
                            <input type="text" v-model="newUsername" placeholder="用户名">
                            <input type="text" v-model="newPassword" placeholder="密码">
                            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                        </div>
                        <div class="button-list">
                            <button @click="addUser">确定</button>
                            <button @click="closeAddModal">取消</button>
                        </div>
                    </div>
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
    name: "Admin",
    data() {
        return {
            users: [],
            newUsername: '',
            newPassword: '',
            editUser: { name: '', newName: '', newPassword: '' },
            searchQuery: '',
            showLogout: false,
            showSearch: false,
            showEditModal: false,
            showAddModal: false,
            errorMessage: '',
        };
    },
    computed: {
        nonAdminUsers() {
            return this.users.filter(user => user.name !== 'admin' && user.name.includes(this.searchQuery));
        }
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get('http://localhost:3000/users');
                const postsResponse = await axios.get('http://localhost:3000/posts');
                const posts = postsResponse.data;

                this.users = response.data.map(user => {
                    const postCount = posts.filter(post => post.name === user.name).length;
                    return { ...user, postCount };
                });
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
        async addUser() {
            if (!this.newUsername || !this.newPassword) {
                this.errorMessage = '用户名和密码不能为空';
                return;
            }

            if (this.users.some(user => user.name === this.newUsername)) {
                this.errorMessage = '用户名已存在';
                return;
            }

            try {
                const response = await axios.post('http://localhost:3000/users', {
                    name: this.newUsername,
                    password: this.newPassword
                });
                alert(response.data.message);
                this.fetchUsers();
                this.closeAddModal();
            } catch (error) {
                console.error("Error adding user:", error);
            }
        },
        async deleteUser(username) {
            try {
                const response = await axios.delete(`http://localhost:3000/users/${username}`);
                alert(response.data.message);
                this.fetchUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        },
        async updateUser() {
            try {
                const response = await axios.put(`http://localhost:3000/users/${this.editUser.name}`, {
                    newName: this.editUser.newName,
                    password: this.editUser.newPassword
                });
                alert(response.data.message);
                this.fetchUsers();
                this.closeEditModal();
            } catch (error) {
                console.error("Error updating user:", error);
            }
        },
        showEditUser(user) {
            this.editUser = { ...user, newName: user.name, newPassword: user.password };
            this.showEditModal = true;
        },
        closeEditModal() {
            this.showEditModal = false;
        },
        toggleAddUser() {
            this.showAddModal = !this.showAddModal;
            if (this.showAddModal) {
                this.newUsername = '';
                this.newPassword = '';
                this.errorMessage = '';
            }
        },
        closeAddModal() {
            this.showAddModal = false;
        },
        toggleLogout() {
            this.showLogout = !this.showLogout;
        },
        toggleSearch() {
            this.showSearch = !this.showSearch;
        },
        hideDropdowns() {
            this.showLogout = false;
            this.showSearch = false;
        },
        logout() {
            localStorage.removeItem('username');
            this.$router.push({ path: "/login" });
        }
    }
};
</script>

<style scoped>
/* Styles remain the same */
</style>


<style scoped>
body {
    margin: 0;
    overflow-x: hidden;
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

.icon-menu,
.icon-search {
    font-size: 30px;
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

.admin-modules {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
}

.admin-modules h3 {
    margin: 0;
}

h2 {
    font-style: normal;
    text-align: center;
    margin: 20px 0;
    color: #f41fa3;
    font-size: 3rem;
    margin-top: 30px;
    text-shadow: 2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;
}

.add-button {
    background-color: #ca2c8e;
    color: #fafafa;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px 20px;
    margin-bottom: 20px;
    font-size: 20px;
}

.add-button:hover {
    background-color: #bd2985;
}

.user-item {
    background: rgb(255, 255, 255);
    padding: 20px;
    border-radius: 5px;
    margin: 10px 0;
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.3s;
}

.user-name,
.user-password {
    text-align: left;
    margin-right: 10px;
    color: #ca2c8e;
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    min-width: 120px;
}

.user-posts{
    text-align: left;
    margin-right: 10px;
    color: #7b7b7b;
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    min-width: 120px;

}

.user-item:hover {
    transform: scale(1.05);
}

.user-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.user-buttons button {
    margin-left: 10px;
}

button {
    width: 150px;
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

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    height: 40%;
    width: 30%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    position: relative;
}

.modal-content h3 {
    margin-top: 30px;
    margin-bottom: 20px;
    text-align: center;
    color: #ca2c8e;
    font-size: 25px;
}

.text-list {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.text-list input {
    cursor: pointer;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #d1d0d0;
    border-radius: 5px;
    width: 80%;
    text-align: center;
}

.error-message {
    color: red;
    font-size: 0.9em;
    position: absolute;
    bottom: 124px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    text-align: center;
}

.button-list {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.button-list button {
    cursor: pointer;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    margin-top: 1px;
    width: 40%;
    text-align: center;
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
