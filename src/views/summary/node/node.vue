<template>
  <div>
    节点信息
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: null
    }
  },
  mounted() {
    this.initNode()
  },
  methods: {
    initNode() {
      let address = '';
      this.loading = this.$loading()
      this.$http({
        url:'/node/man/pbgna.do',
        method: 'post',
        data:{
          address
        }
      }).then((res) => {
        this.loading.close()
        console.log(res);
      }).catch((err) => {
        this.loading.close()
        this.$message.error('获取节点失败，请检查网络后重试')
        console.log('获取节点错误',err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
