<template>
  <div>
    <el-table v-if="!errmsg" :data="transactions">
      <template v-for="(item) in columns">
        <el-table-column
          v-if="item.prop == 'txHash'"
          :key="item.prop"
          :label="item.label">
          <template slot-scope="scope">
            <router-link class="link" :to="{name:'TransactionInfo',query:{txHash: scope.row.txHash}}">{{ scope.row.txHash }}</router-link>
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
    <div class="text-error">{{errmsg}}</div>
  </div>
</template>

<script>
var columns = [
  {prop: 'txHash',label: '交易哈希'},
  {prop: 'blockHeight', label: '区块高度'},
  {prop: 'age', label: '生成时间'},
  {prop: 'from', label: '转出地址'},
  {prop: 'to', label: '转入地址'},
  {prop: 'status', label: '状态'}
]
export default {
  props: {
    address:{
      required: true,
      type: String
    }
  },
  data() {
    return {
      loading: null,
      columns,
      addressInfo: {

      },
      errmsg: ''
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    'address': function () {
      this.init()
    }
  },
  computed: {
    "transactions": function () {
      console.log('watch---addressinfo', this.addressInfo);
      var that = this;
      var addressInfo = this.addressInfo;
      var result = []
      if (addressInfo.transactions) {
        var transactions = addressInfo.transactions;
        result = transactions.map((item,index) => {
          var froms = item.froms.map((obj,i) => {
            return obj.address || ''
          });
          var tos = item.tos.map((obj,i) => {
            return obj.address || ''
          });
          item.from = froms.join(',')
          item.to = tos.join(',')
          item.age = that.timeago().format(item.timeStamp)
          if (item.status == 'null') {
            item.status = ''
          }
          return item
        })
      }
      return result
    }
  },
  methods: {
    init() {
      var address = this.address;
      this.initAddressInfo(address);
    },
    initAddressInfo(value) {
      let address = '';
      if (this.$route.query.address) {
        address = this.$route.query.address
      }
      if (value) {
        address = value
      }
      this.address = address
      if (!address) {
        return
      }
      this.loading = this.$loading()
      this.$http.post('/node/adr/pbgad.do', {
        address
      }).then((res) => {
        this.loading.close()
        console.log('address --- info', res)
        if (res.retCode == 1 && res.address) {
          this.addressInfo = res.address
          this.errmsg = ''
        } else if (res.retCode != 1) {
          this.$message.error('获取账户详情错误')
          this.errmsg = '获取账户详情出错'
        }
      }).catch((err) => {
        this.$message.error('获取账户错误')
        this.errmsg = '服务器请求出错'
        this.loading.close()
      })
    }
  }
}
</script>

<style lang="scss">
  .text-error {
    padding: 50px 0;
    color: #f00;
    font-size: 12px;
    text-align: center;
  }
</style>
