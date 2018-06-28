<template>
  <div class="transaction-detail">
    <div>
      <h3 class="title">交易详情</h3>
      <div>
        <div v-if="!txInfo.txHash" class="input-error">{{transactionInfoErr}}</div>
        <div v-else class="tx-content">
          <el-row>
            <el-col :span="4" :xs="6">
              TxHash:
            </el-col>
            <el-col :span="20" :xs="18" class="ellipsis">{{txInfo.txHash}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4" :xs="6">
              Block height:
            </el-col>
            <el-col :span="20" :xs="18">{{txInfo.blockHeight}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4" :xs="6">
              TimeStamp:
            </el-col>
            <el-col :span="20" :xs="18">
              <timeago :since="txInfo.timeStamp"></timeago>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" :xs="6">
              Status:
            </el-col>
            <el-col :span="20" :xs="18">
              {{txInfo.status}}
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <p>From:</p>
              <div>
                <el-table :data="data_from">
                  <template v-for="(item) in from_columns">
                    <el-table-column
                      v-if="item.prop == 'address'"
                      :key="item.prop"
                      :label="item.label">
                      <template slot-scope="scope">
                        <!-- <router-link class="link" :to="{name:'Account',query:{address: scope.row.address}}">{{ scope.row.address }}</router-link> -->
                        <span>{{ scope.row.address }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else
                      :key="item.prop"
                      :prop="item.prop"
                      width="150"
                      :label="item.label">
                    </el-table-column>
                  </template>
                </el-table>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <p>To:</p>
              <div>
                <el-table :data="data_to">
                  <template v-for="(item) in to_columns">
                    <el-table-column
                      v-if="item.prop == 'address'"
                      :key="item.prop"
                      :label="item.label">
                      <template slot-scope="scope">
                        <!-- <router-link class="link" :to="{name:'Account',query:{address: scope.row.address}}">{{ scope.row.address }}</router-link> -->
                        <span>{{ scope.row.address }}</span>
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
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const from_columns = [
  {prop:'address', label: 'Address'},
  {prop:'amount', label: 'Amount'},
  {prop:'fee', label: 'Fee'},
  {prop:'feeLimit', label: 'FeeLimit'},
  {prop:'token', label: 'Token'},
  {prop:'symbol', label: 'Symbol'},
  {prop:'cryptoToken', label: 'CryptoToken'}
]
const to_columns = [
  {prop: 'address',label: 'Address'},
  {prop: 'amount', label: 'Amount'},
  {prop: 'symbol', label: 'Symbol'},
  {prop: 'cryptoToken', label: 'CryptoToken'}
]
export default {
  data() {
    return {
      txInfo: {},
      data_to: [],
      data_from: [],
      transactionInfoErr: '',
      to_columns,
      from_columns
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init() {
      var txHash = this.$route.query.txHash;
      console.log('----txhash-----',txHash);
      this.$loading();
      let that = this;
      this.$http({
        method:"post",
        url:"/block/trs/pbgtt.do",
        data:{
          txHash
        }
      }).then((res)=>{
        this.$loading().close();
        if(res.retCode == 1 && res.transaction){
          this.transactionInfoErr = ''
            that.txInfo = res.transaction;
            // alert(that.blockinfo.status);
            if (that.txInfo.status == 'null') {
                that.txInfo.status = 'pending';
            }
            that.data_to = res.transaction.tos;
            that.data_from = res.transaction.froms;
        }else{
          this.transactionInfoErr = '交易详情查询失败'
            this.$message.error("交易详情查询失败",3)
        }
      }).catch((err) => {
        this.$loading().close();
        this.transactionInfoErr = '交易详情查询失败'
        this.$message.error("交易详情查询失败",3)
      })
    }
  }
}
</script>

<style lang="scss">
  .transaction-detail {
    .el-row {
      padding: 10px 0;
    }
    .tx-content {
      padding: 10px;
      background: #fafafa;
    }
  }
</style>
