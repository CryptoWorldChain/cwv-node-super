<template>
  <div class="block-info">
    <div>
      <h3 class="title">区块详情</h3>
      <div>
        <div v-if="!blockInfo.blockHash" class="input-error">{{blockErr}}</div>
        <div v-else>
          <div v-if="blockErr" class="block-error">{{blockErr}}</div>
          <div v-else>
            <el-row>
              <el-col :span="4" :xs="6">Height:</el-col>
              <el-col :span="20" :xs="18" class="ellipsis">
                <router-link :class="{'prev-block': true,disabled:!(blockInfo.height >= 1)}" :to="{name:'BlockInfo',query:{height:blockInfo.height - 1 >= 0 ? blockInfo.height - 1: '0'}}">&lt; Prev</router-link>
                {{blockInfo.height}}
                <router-link class="next-block" :to="{name:'BlockInfo',query:{height:blockInfo.height + 1}}">Next &gt;</router-link>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" :xs="6">TimeStamp:</el-col>
              <el-col :span="20" :xs="18" class="ellipsis">
                <timeago :since="blockInfo.timestamp"></timeago>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" :xs="6">Transactions:</el-col>
              <el-col :span="20" :xs="18" class="ellipsis">
                <div>{{transactons.length}} transactons</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" :xs="6">Hash:</el-col>
              <el-col :span="20" :xs="18" class="ellipsis">{{blockInfo.blockHash}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="4" :xs="6">ParentHash:</el-col>
              <el-col :span="20" :xs="18" class="ellipsis">
                <router-link class="link" :to="{name:'BlockInfo',query:{hash:blockInfo.parentHash}}">
                  {{blockInfo.parentHash}}
                </router-link>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" :xs="6">Reward</el-col>
              <el-col :span="20" :xs="18" class="ellipsis">
                {{parseFloat(blockInfo.reward) ? parseFloat(blockInfo.reward) : 0}}
              </el-col>
            </el-row>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blockErr: '',
      transactons: [],
      blockInfo: {},
    }
  },
  mounted() {
    this.init()
  },
  beforeRouteUpdate(to,from,next) {
    var height = this.blockInfo.height;
    var toHeight = to.query.height;
    if (height == 0 && toHeight == 0) {
      next(false)
    } else {
      next()
    }
  },
  watch: {
    "$route": "init"
  },
  methods: {
    init() {
      var blockHash = this.$route.query.hash
      var blockHeight = this.$route.query.height
      if(blockHash) {
        this.$loading()
        this.$http.post('/node/blk/pbgha.do',{
          blockHash
        }).then((res) => {
          this.$loading().close()
          console.dir(res.block)
          if (res.retCode == 1 &&  res.block && res.block.header) {
            this.blockErr = '';
            this.blockInfo = res.block.header;
            this.transactons = res.block.body.transactions ? res.block.body.transactions : [];
          } else {
            this.blockErr = '未能加载hash为 ' + blockHash + ' 的区块';
          }
        }).catch((err) => {
          this.$loading().close()
          this.blockErr = '区块加载出错';
        })
      } else if (blockHeight || blockHeight == 0) {
        blockHeight = blockHeight.toString()
        if (blockHeight == 0) {

          } else if (blockHeight.match(/^\d+$/)){
          this.blockErr = ''
          } else {
          this.blockErr = '区块高度错误'
          return
        }
        this.$loading()
        this.$http.post('/node/blk/pbghe.do',{
          blockHeight
        }).then((res) => {
          this.$loading().close()
          // console.log(res.block,res.retCode == 1 && res.block && res.block.header)
          if (res.retCode == 1 && res.block && res.block.header) {
            this.blockErr = ''
            this.blockInfo = res.block.header
            this.transactons = res.block.body.transactions ? res.block.body.transactions : []
          } else {
            this.blockErr = '未能加载区块 #' + blockHeight
          }
        }).catch((err) => {
          this.$loading().close()
          this.blockErr = '区块加载出错'
        })
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
  .block-info {
    .el-row {
      padding: 8px 0;
    }
    .prev-block,.next-block {
      display: inline-block;
      vertical-align: middle;
      width: 48px;
      height: 22px;
      text-align: center;
      line-height: 22px;
      color: #fff;
      font-size: 12px;
      background: #337ab7;
      cursor: pointer;
      margin: 0 6px;
      &.disabled {
        background: #6c9fcc;
      }
    }
    .block-error {
      font-size: 12px;
      color: #f00;
      padding: 40px 10px;
    }
  }
</style>
