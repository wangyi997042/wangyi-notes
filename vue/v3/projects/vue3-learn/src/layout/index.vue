<template>
  <div>
    <router-view />
    <nav-bar />
  </div>
</template>

<script>
import navBar from '@/components/NavBar'

export default {
  name: 'layout-index',
  components: {
    navBar
  }
}
</script>

<style lang="less" scoped>

</style>