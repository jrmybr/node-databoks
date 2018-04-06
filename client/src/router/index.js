import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Profile from '@/views/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})
