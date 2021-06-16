<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-if="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'

export default {
  components: {
    FooterGuide
  },
  mounted() {
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getUserInfo')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
// 整个应用组件的样式
#app
  width 100%
  height 100%
  background #f5f5f5
</style>
