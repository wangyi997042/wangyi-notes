// import { createStore } from 'vuex'

// import state from './state'
// import actions from './actions'
// import mutations from './mutations'

// export default createStore({
//   actions,
//   state,
//   mutations,
//   module: {}
// })


// ...existing code...
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    // 把原 state.js 中的状态迁移到这里
    cart: [], 
    user: null,
    // ...其他状态...
  }),
  getters: {
    // 示例 getter（等同于 Vuex getters）
    cartCount: (state) => state.cart.length,
    // ...其他 getters ...
  },
  actions: {
    // 把原 actions/mutations 中的逻辑迁移到这里（action 中可同步或异步修改 state）
    addToCart(item) {
      this.cart.push(item)
    },
    removeFromCart(index) {
      this.cart.splice(index, 1)
    },
    setUser(user) {
      this.user = user
    },
    // 异步示例
    async fetchUser() {
      const res = await fetch('/api/user')
      this.user = await res.json()
    }
  }
})

export const useCountStore = defineStore('count', {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
})