<template>
  <div>
    <h1>Vue 子应用</h1>
    <p>mainName{{ mainStore.cartCount }}</p>
    <p>主应用传递的用户信息：{{ countStore.doubleCount }}</p>

    <p>用户名称：{{ mainStore.getUserById(123).name }}</p>
    <p>获取其他store 的值{{ countStore.userName }}</p>
    <p>computedVal{{ computedVal }}</p>

    <van-space :size="20">
      <van-button @click="increment" type="primary">+</van-button>
      <van-button @click="decrement" type="primary">-</van-button>
      <van-button @click="reset" type="primary">重置</van-button>
    </van-space>

    <Order foo="233" @submit.once="callback" @inFocus="callback" />
    <UserInfo foo="UserInfo" @submit.once="callback" @inFocus="callback" />
  </div>
</template>

<script setup>
import { useCountStore, useMainStore } from "@/store";
import Order from "./components/order.vue";
import UserInfo from "./components/userInfo.vue";
import { ref, watch, computed, unsubscribe, onUnmounted } from "vue";
import { storeToRefs } from "pinia";

const user = ref({
  name: "默认用户",
});

const countStore = useCountStore();
const mainStore = useMainStore();
// console.log(countStore);

// const pinia = usePinia();
watch(
  () => mainStore.users,
  (newVal) => {
    console.log("watch变化", newVal);
  },
  { deep: true, immediate: true }
);

const computedVal = computed(() => countStore.count * 2);

countStore.$subscribe(
  (mutation, state) => {
    // console.log('全局状态变化了：', JSON.stringify(state));
    console.log("获取其他store 的值", countStore.userName);
  },
  { flush: "sync" }
);
countStore.$onAction(
  ({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
  }) => {
    console.log("action 被调用了", name, args, store);

    console.log("插件注册：", countStore.secret);
  }
);
function increment() {
  mainStore.addToCart({ id: 1, name: "测试商品", quantity: 1 });
  mainStore.setUser([
    { id: 123, name: "小明", quantity: 1 },
    { id: 124, name: "小红", quantity: 2 },
  ]);
  countStore.increment(12);

  user.value.name = "修改后的用户名称";
  // countStore.count += 2;
  // countStore.$patch({
  //   count: 123
  // })

  console.log("全局状态已修改，当前计数值：", countStore.count, mainStore.getUserById(123));
}

function decrement() {
  mainStore.removeFromCart(0);
  countStore.decrement();
  console.log("全局状态已修改，当前计数值：", countStore.count);
}

function reset() {
  countStore.$reset();
  console.log("重置：", countStore.count);
}

function callback(payload) {
  console.log("接收到子组件的事件回调", payload);
}
onUnmounted(() => {
  console.log("组件卸载了");
});
</script>
