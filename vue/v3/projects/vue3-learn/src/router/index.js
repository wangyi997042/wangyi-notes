import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/category',
      name: 'category',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Category.vue'),
      meta: {
        index: 2
      }
    },

  ]
})

export default router;