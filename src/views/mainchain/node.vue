<template>
  <div>
    <div>
      <div>
        <h3 class="title">节点信息</h3>
        <el-table :data="data">
          <el-table-column
            v-for="(item) in columns"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label">
          </el-table-column>
        </el-table>
        <!-- <div class="pager">
          <div class="pager-inner">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="50">
            </el-pagination>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
var columns = [
  {prop: 'node_name',label: '节点名称'},
  {prop: 'uri', label: '节点URI'},
  {prop: 'age', label: '启动时间'},
  {prop: 'recv_cc', label: '接受量'},
  {prop: 'send_cc', label: '发送量'},
  {prop: 'node_idx', label: '节点ID'},
  {prop: 'block_cc', label: '区块数量'},
  {prop: 'status', label: '状态'}
]
export default {
  data() {
    return {
      columns,
      data: [],
      loading: null
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.loading = this.$loading()
      this.$http.post('/node/adi/pbgns.do').then((res) => {
        this.loading.close()
        console.log('节点信息',res)
        if(res.retCode == 1) {
          var that = this;
          if (res.nodes && res.nodes.length) {
            this.data = res.nodes.map((item,index) => {
              item.age = that.timeago().format(item.startup_time)
              return item
            })
          }
        } else {
          this.$message.error('获取节点信息出错')
        }
      }).catch((err) => {
        this.loading.close()
        this.$message.error('获取节点信息出错')
        console.log('errr');
      })
    }
  }
}
</script>

<style>

</style>
