
<script setup>
import { isRef } from 'vue';


  const props = defineProps(['foo'])

  const emit = defineEmits(['inFocus', 'submit'])

  console.log('props', isRef(props.foo));

  function handleClick() {
    console.log('按钮被点击了');
    emit('inFocus', { orderId: 12345 });
  }
  
</script>
<style lang="less" scoped>

</style>

<template>
  <div>
    <van-space :size="20">
      <van-button @click="$emit('submit', { a: 123 })" type="primary">点击触发submit1事件</van-button>
      <van-button @click="handleClick" type="primary">点击触发submit事件</van-button>
    </van-space>
  </div>
</template>
