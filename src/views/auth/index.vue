<template>
  <div class="server-err-page">
    <div>
      <h4>网络请求似乎失败了,<router-link  class="back-to-home" :to="{name: 'Home'}">返回首页</router-link></h4>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .server-err-page {
    h4 {
      padding: 30px 20px;
    }
  }
  a.back-to-home {
    color: #409EFF;
  }
</style>
