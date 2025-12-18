<template>
  <div>
    <h1>Vue 子应用</h1>
    <p>mainName{{ mainStore.cartCount }}</p>
    <p>主应用传递的用户信息：{{ countStore.doubleCount }}</p>

    <van-button  @click="increment" type="primary">+</van-button>
    <van-button  @click="decrement" type="primary">-</van-button>
  </div>
</template>

<script setup>
import {
  useCountStore,
  useMainStore
} from '@/store'
import { ref } from 'vue';

const user = ref({
  name: '默认用户'
})

const countStore = useCountStore()
const mainStore = useMainStore()
console.log(countStore);

function increment() {
  mainStore.addToCart({ id: 1, name: '测试商品', quantity: 1 })
  countStore.increment();
  console.log('全局状态已修改，当前计数值：', countStore.count);
}

function decrement() {
  mainStore.removeFromCart(0)
  countStore.decrement();
  console.log('全局状态已修改，当前计数值：', countStore.count);
}

</script>