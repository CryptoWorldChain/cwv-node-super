<template>
  <div>
    <div>
      <h3 class="title">block 信息</h3>
      <el-table :data="data">
        <template v-for="(item) in columns">
          <el-table-column
            v-if="item.prop == 'hash'"
            :key="item.prop"
            :label="item.label">
            <template slot-scope="scope">
              <span class="link">{{ scope.row.hash }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :key="item.prop"
            :prop="item.prop"
            :label="item.label">
          </el-table-column>
        </template>
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
</template>

<script>
var columns = [
  {prop: 'height',label: '区块高度'},
  {prop: 'hash', label: '区块哈希'},
  {prop: 'age', label: '生成时间'},
  {prop: 'tx', label: '交易'},
  {prop: 'reward', label: '挖矿奖励'},
]
export default {
  data() {
    return {
      columns,
      data: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.data = [
        {height:222,hash:'0xfjslfje323jdflsfj',age: 'one hour ago', tx:'fjsljfdlsfjsldjfd',reward: 1.32}
      ]
    }
  }
}
</script>

<style>

</style>
