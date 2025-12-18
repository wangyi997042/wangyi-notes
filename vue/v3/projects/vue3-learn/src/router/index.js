import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import (/* webpackChunkName: "home" */ '@/layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import(/* webpackChunkName: "home" */ '@/views/Home/Home.vue'),
          meta: {
            index: 1
          }
        },
        {
          path: 'category',
          name: 'category',
          component: () => import(/* webpackChunkName: "home" */ '@/views/Category/Category.vue'),
          meta: {
            index: 2
          }
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import(/* webpackChunkName: "home" */ '@/views/Cart/Cart.vue'),
          meta: {
            index: 3
          }
        },
        {
          path: 'user',
          name: 'user',
          component: () => import(/* webpackChunkName: "home" */ '@/views/User/User.vue'),
          meta: {
            index: 4
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Login/login.vue'),
      meta: {
        index: 3
      }
    },


  ]
})

export default router;