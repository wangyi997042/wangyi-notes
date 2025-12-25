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
import { createPinia, defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    // 把原 state.js 中的状态迁移到这里
    cart: [], 
    users: [],
    // ...其他状态...
  }),
  getters: {
    // 示例 getter（等同于 Vuex getters）
    cartCount: (state) => state.cart.length,
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId) || { name: '未知用户' }
    },
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
      this.users = user
    },
    // 异步示例
    async fetchUser() {
      const res = await fetch('/api/user')
      this.users = await res.json()
    }
  }
})

export const useCountStore = defineStore('count', {
  state: () => ({
    count: 1
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    userName: () => {
      const mainStore = useMainStore();
      return mainStore.getUserById(123).name
    }
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

// 在安装此插件后，插件可以保存在不同的文件中
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia();
// 将该插件交给 Pinia
pinia.use(SecretPiniaPlugin)


export default pinia;