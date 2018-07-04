<template>
  <div class="contract-index">
    <div>
      <div>
        <h3 class="title">合约</h3>
      </div>
      <div>
        <el-table
          :data="data"
        >
          <el-table-column
            prop="hash"
            label="hash">
          </el-table-column>
          <el-table-column
            prop="codeHash"
            label="codeHash">
          </el-table-column>
          <el-table-column
            prop="code"
            label="code"
            width="180">
          </el-table-column>
          <el-table-column
            prop="data"
            label="data"
            width="180">
          </el-table-column>
          <el-table-column
            prop="time"
            label="time"
            width="180">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    }
  },
  mounted() {
    this.$http.post('/node/man/pbglc.do').then((res) => {
      if (res && res.retCode == 1 && res.contracts && typeof res.contracts.join == 'function') {
        this.data = res.contracts.map((item,index) => {
          item.time = this.timeago().format(item.timestamp);
          return item;
        })
      }else {
        this.$message.error('未能请求到合约')
      }
    }).catch((err) => {
      this.$message.error('未能请求到合约');
    })
  },
}
</script>

<style>

</style>
