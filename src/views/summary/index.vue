<template>
  <div class="summary-index">
    <div class="node-info" v-if="node.serverTime">
      <h3 style="margin: 10px 0 20px 0;">节点摘要信息</h3>
      <div style="min-height: 300px; padding-bottom: 20px;">
        <el-row>
          <el-col :span="12" :xs="24">
            <h4>DPOS</h4>
            <table class="border-table">
              <tr v-for="(value, key) in node.dpos" :key="key">
                <td>{{key}}</td>
                <td  v-if="key == 'startUpTime'">
                  <timeago :since="value"></timeago>
                </td>
                <td v-else>{{value}}</td>
              </tr>
            </table>
          </el-col>
          <el-col :span="12" :xs="24">
            <h4>RAFT</h4>
            <table class="border-table">
              <tr v-for="(value, key) in node.raft" :key="key">
                <td>{{key}}</td>
                <td  v-if="key == 'startUpTime'">
                  <timeago :since="value"></timeago>
                </td>
                <td v-else>{{value}}</td>
              </tr>
            </table>
          </el-col>
        </el-row>
        <div style="margin-top: 10px;" v-for="(value,key) in node" v-if="key != 'address'" :key="key+0">
          <el-row v-if="value.name">
          </el-row>
          <el-row v-else>
            <el-col :span="4" :xs="8">
              <div>
                {{key}}:
              </div>
            </el-col>
            <el-col :span="20" :xs="16">
              <div v-if="key == 'serverTime'">
                {{moment(+value).format('YYYY-MM-DD HH:mm:ss')}}
              </div>
              <div v-else>
                {{value}}
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-col :span="4" :xs="8">
              address:
            </el-col>
            <el-col :span="20" :xs="16">
              <div v-if="address">
                <a href="javascript:;" class="link" @click="goToAddress">
                  {{address}}
                </a>
              </div>
              <div v-else>
                <el-button size="mini" type="primary" @click="goToAddress">去设置</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div v-else class="node-info">
      <h3 style="margin: 10px 0 20px 0;">节点摘要信息</h3>
      <p style="padding: 10% 0">没有获取到节点信息</p>
    </div>
    <div class="first-block-info">
      <h3>创世块信息</h3>
      <div v-if="firstBlock.hash">
        <el-row>
          <el-col :span="4">Hash:   </el-col>
          <el-col :span="20">
            <a href="javascript:;" class="ellipsis block" title="复制Hash" @click="copy">{{firstBlock.hash}}</a>
          </el-col>
        </el-row>
      </div>
      <div v-else style="padding: 5% 0;">
        没有获取到创世块的信息
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      firstBlock: {},
      node:{
        dpos: {},
        raft: {}
      },
      moment
    }
  },
  mounted() {
    this.initNode()
    this.init()
  },
  computed: {
    address() {
      var node = this.node;
      return node.address ? node.address : '';
    }
  },
  methods: {
    // 账户详情
    goToAddress() {
      var address = this.address;
      this.$router.push({
        name:'Account',
        query:{
          address
        }
      })
    },
    initNode() {
      this.$http.post('/node/man/pbgni.do').then((res) => {
        console.log('----res',res)
        if (res.serverTime) {
          this.node = res;
        }else {
          this.node = {};
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    init() {
      this.$loading();
      this.$http({
        url:'/node/man/pbggb.do',
        method: 'post',
        data:{}
      }).then((res) => {
        this.$loading().close()
        console.log('res----',res)
        if(res.retCode == '1') {
          this.firstBlock = res;
        } else {

        }
      }).catch((err) => {
        // this.$message.error('未能请求到创世块信息，请稍后重试')
        this.$loading().close()
        console.log('----err-----',err)
      })
    },
    copy() {
      var message = this.firstBlock.hash ? this.firstBlock.hash : '';
      var that = this;
      if (!message) {
        return ;
      }
      this.$copyText(message).then(function (e) {
        that.$message.success('复制成功')
      }, function (e) {
        that.$message.error('复制失败，请稍后重试')
      })
    }
  }
}
</script>

<style lang="scss">
  .node-info {
    border-bottom: 1px solid #eee;
    line-height: 1.5em;
    .node-item {
      .node-item-left {
        margin-right: 10px;
      }
      .node-item-right {
        font-size: 14px;
      }
    }
  }
  .first-block-info {
    padding: 10px 0 20px 0;
  }
  .node-info h3, .first-block-info h3 {
    padding: 10px;
    background: #f5f5f5;
  }
</style>
