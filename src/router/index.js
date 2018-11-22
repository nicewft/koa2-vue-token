import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import User from '@/views/user/user.vue'
import Login from '@/views/login/login'
import Register from '@/views/register/register'

Vue.use(Router)

const router = new Router()
router.beforeEach((to, from, next) => {
  let token = store.state.token
  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'User',
      component: User,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requiresAuth: false
      }
    }
  ]
})
