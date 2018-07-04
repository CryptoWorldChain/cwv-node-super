<template>
  <div class="start-node">
    <div>
      <h3 class="title">节点启动/停止</h3>
    </div>
    <div>
      <div class="start-and-stop">
        <el-row>
          <el-col :span="12" :xs="24">
            <el-button type="primary" @click="start">启动节点</el-button>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-button type="primary" @click="stop">停止节点</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    start() {
      // alert('start')
    },
    stop() {
      // alert('stop')
    }
  }
}
</script>

<style lang="scss">
  .start-and-stop {
    .el-col {
      padding: 30px;
      .el-button {
        min-width: 160px;
        display: block;
        margin: 0 auto;
      }
      @media screen and(max-width: 768px) {
        .el-button {
          width: 100%;
        }
      }
    }
  }
</style>
