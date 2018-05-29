<template>
  <div>
    <div>
      <div>
        <h3 class="title">交易记录</h3>
        <el-table :data="data">
          <el-table-column
            v-for="(item) in columns"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label">
          </el-table-column>
        </el-table>
        <div class="pager">
          <div class="pager-inner">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="50">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var columns = [
  {prop: 'txHash',label: '哈希'},
  {prop: 'blockHeight', label: '区块高度'},
  {prop: 'timestamp', label: '时间'},
  {prop: 'froms', label: '转出地址'},
  {prop: 'tos', label: '转入地址'},
  {prop: 'status', label: '状态'}
]
export default {
  data() {
    return {
      columns,
      data: []
    }
  },
  mounted() {
    
  }
}
</script>

<style>

</style>
