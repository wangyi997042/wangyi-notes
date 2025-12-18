/* eslint-disable */
<template>
  <div>
    <h1>Vue 子应用</h1>
    <p>主应用传递的用户信息：{{ user.name }}</p>
    <button @click="updateGlobalState">修改全局状态</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user: { name: '未接收到数据' }
    };
  },
  mounted() {
    // 接收主应用传递的数据
    // this.user = this.$actions.getGlobalState().user;
  },
  methods: {
    updateGlobalState() {
      // 修改全局状态
      this.$actions.setGlobalState({ user: { name: 'Jane Doe' } });
    },
  },
};
</script>