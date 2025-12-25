<template>
  <div>
    <van-space :size="20">
      <van-button @click="$emit('submit', { a: 123 })" type="primary">点击触发submit1事件</van-button>
      <van-button @click="handleClick" type="primary">点击触发submit事件</van-button>
    </van-space>
    <p>countStore.count: {{ countStore.count }}</p>
  </div>
</template>

<script>
import { useCountStore, useMainStore } from "@/store";
export default {
  name: "uerInfo",
  emits: ["inFocus", "submit"],
  props: {
    foo: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    console.log("props", props.foo);
    const countStore = useCountStore();
    console.log("countStore", );


    function handleClick() {
      console.log("按钮被点击了");
      emit("inFocus", { orderId: 12345 });
    }

    return {
      handleClick,
      countStore
    };
  },
};
</script>
