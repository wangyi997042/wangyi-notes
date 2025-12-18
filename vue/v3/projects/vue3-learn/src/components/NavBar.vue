<template>
  <div class="nav-bar van-hairline--top">
    <ul class="nav-list">
      <router-link  class="nav-list-item active" to="home">
        <van-icon name="home-o" />
        <span>首页</span>
      </router-link>
      <router-link  class="nav-list-item" to="category">
        <van-icon name="shop-o" />
        <span>分类</span>
      </router-link>
      <router-link  class="nav-list-item" to="cart">
        <van-icon  name="shopping-cart-o" :badge="!count ? '' : count" />
        <span>购物车</span>
      </router-link>
      <router-link  class="nav-list-item" to="user">
        <van-icon name="user-o" />
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getLocal } from '@/common/js/utils';
import { useMainStore } from '@/store'

export default {
  setup() {
    const route = useRoute()
    const store = useMainStore()
    console.log('nav-bar===', store.state);
    
    onMounted(() => {
      const token = getLocal('token')
      const path = route.path;
      if(token && !['/home', '/category'].includes(path)) {
        store.dispatch('updateCart')
      }
    })
    const count = computed(() => {
      return store.cartCount
    })

    return {
      count
    }
  }
}


</script>


<style lang="less" scoped >
    @import '../common/style/mixin';
    .nav-bar{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      padding: 5px 0;
      z-index: 1000;
      background: #fff;
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
      .nav-list {
        width: 100%;
        .fj();
        flex-direction: row;
        padding: 0;
        .nav-list-item {
          display: flex;
          flex: 1;
          flex-direction: column;
          text-align: center;
          color: #666;
          &.router-link-active {
            color: @primary;
          }
          i {
            text-align: center;
            font-size: 22px;
          }
          span{
            font-size: 12px;
          }
          .van-icon-shopping-cart-o {
            margin: 0 auto;
            margin-bottom: 2px;
          }
        }
      }
    }
</style>
