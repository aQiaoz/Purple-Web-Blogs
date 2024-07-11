import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Homepage from '../views/Homepage.vue'
import Post from '../views/Post.vue'
import EditPost from '../views/EditPost.vue'
import CreatePost from '../views/CreatePost.vue'
import Admin from '../views/Admin.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/post/:id',
      name: 'post',
      component: Post
    },
    {
      path: '/edit/:id',
      name: 'editpost',
      component: EditPost
    },
    {
      path: '/create',
      name: 'createpost',
      component: CreatePost
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
