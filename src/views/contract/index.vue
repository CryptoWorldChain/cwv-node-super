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
            label="codeHash"
            width="300">
          </el-table-column>
          <el-table-column
            prop="code"
            label="code">
          </el-table-column>
          <el-table-column
            prop="data"
            label="data"
            width="180">
          </el-table-column>
          <!-- <el-table-column
            prop="time"
            label="time"
            width="180">
          </el-table-column> -->
        </el-table>
        <div class="input-error contract-error">{{ contractErr }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      contractErr: ''
    }
  },
  mounted() {
    this.$loading()
    this.$http.post('/node/man/pbglc.do').then((res) => {
      this.$loading().close()
      if (res && res.retCode == 1) {
        if (res.contracts && typeof res.contracts.join == 'function') {
          this.contractErr = '';
          this.data = res.contracts.map((item,index) => {
            item.time = this.timeago().format(item.timestamp);
            return item;
          })
        }
      }else {
        this.$message.error('未能请求到合约')
      }
    }).catch((err) => {
      this.$loading().close()
      // this.$message.error('未能请求到合约');
      this.contractErr = '未能请求到合约数据，请稍后重试';
    })
  },
}
</script>

<style lang="scss">
  .contract-error {
    padding: 20px 0;
  }
</style>
