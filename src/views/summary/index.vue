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
        <div style="margin-top: 40px;" class="" v-if="typeof accountInfo.balance != 'undefined'">
          <el-row>
            <el-col :span="4" :xs="8">锁定：</el-col>
            <el-col :span="10" :xs="16">
              <el-input v-model="lockValue" type="number" placeholder="请输入">
                <template slot="append">
                  <el-button @click="openLockDialog" type="primary">确定</el-button>
                </template>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" :xs="8">账户余额：</el-col>
            <el-col :span="10" :xs="16">
              {{balance}}
            </el-col>
          </el-row>
        </div>
        <div v-for="(value,key) in node" v-if="key != 'address'" :key="key+0">
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
                <el-button size="mini" type="primary" @click="setAddress">去设置</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div v-else class="node-info">
      <h3 style="margin: 10px 0 20px 0;">节点摘要信息</h3>
      <p class="input-error" style="padding: 10% 0">没有获取到节点信息</p>
    </div>
    <div class="first-block-info" v-loading="firstLoading">
      <h3>创世块信息</h3>
      <div v-if="firstBlock.blockHash" class="first-block">
        <el-row>
          <el-col :span="4">Hash:   </el-col>
          <el-col :span="20">
            <a href="javascript:;" class="ellipsis block" title="复制Hash" @click="copy">{{firstBlock.blockHash}}</a>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">Timestamp:   </el-col>
          <el-col :span="20">
            <a href="javascript:;" class="ellipsis block" title="复制Hash" @click="copy">{{firstBlock.age}}</a>
          </el-col>
        </el-row>
      </div>
      <div v-else class="input-error" style="padding: 5% 0;">
        没有获取到创世块的信息
      </div>
    </div>
    <el-dialog
      :modal-append-to-body="false"
      title="锁定"
      :visible.sync="lockVisible"
      @close="closeDialog"
      center>
      <div>
        <el-input clearable v-model="lockpwd"  auto-complete="new-password" type="password" placeholder="请输入您的密码"></el-input>
        <div class="input-error">{{lockPwdErr}}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-block" type="primary" @click="lock">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import { numReg } from '@/utils/validate';
import { getAddress, setAddress, removeAddress } from '@/utils/auth'
export default {
  data() {
    return {
      firstLoading: true,
      lockValue: '',
      lockPwdErr: '',// 密码错误信息
      lockpwd: '',
      lockVisible: false,
      firstBlock: {},
      node:{
        dpos: {},
        raft: {}
      },
      moment,
      accountInfo: {},
      loading: null
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    address() {
      var node = this.node;
      return node.address || '';
    },
    balance() {
      let account = this.accountInfo;
      if (account.balance) {
        return account.balance;
      }else {
        return '0';
      }
    }
  },
  methods: {
    // 账户详情
    goToAddress() {
      var address = this.address;
      if (!address) {
        return false
      }
      this.$router.push({
        name:'Account',
        query:{
          address
        }
      })
    },
    setAddress() {
      this.$router.push({
        name:'Account'
      })
    },
    initNode() {
      this.loading = this.$loading();
      this.$http.post('/node/man/pbgni.do').then((res) => {
        this.loading.close()
        this.initFirst();
        if (res.serverTime) {
          this.node = res;
          if (this.node && this.node.address) {
            let address = this.node.address;
            setAddress(address)
            this.initAccount(address)
          } else {
            removeAddress()
          }
        }else {
          this.node = {};
        }
      }).catch((err) => {
        this.initFirst();
        this.loading.close();
        console.log(err)
      })
    },
    initAccount(address) {
      this.$loading();
      this.$http.post('/node/adr/pbgad.do', {
        address
      }).then((res) => {
        this.$loading().close()
        if (res.retCode == 1 && res.address ) {
          this.accountInfo = res.address
        } else {
          this.$message.error('获取账户详情错误')
        }
      }).catch((err) => {
        this.$loading().close()
      })
    },
    init() {
      this.initNode();
    },
    initFirst () {
      let that = this;
      this.firstLoading = true;
      this.$http({
        url:'/node/blk/pbggb.do',
        method: 'post',
        data:{}
      }).then((res) => {
        that.firstLoading = false;
        console.log('res----',res)
        if(res.retCode == '1' && res.block && res.block.header) {
          this.firstBlock = res.block.header;
          this.firstBlock.age = this.timeago().format(this.firstBlock.timestamp);
        } else {

        }
      }).catch((err) => {
        // this.$message.error('未能请求到创世块信息，请稍后重试')
        that.firstLoading = false;
        console.log('----err-----',err)
      })
    },
    copy() {
      var message = this.firstBlock.hash || ''
      var that = this
      if (!message) {
        return ;
      }
      this.$copyText(message).then(function (e) {
        that.$message.success('复制成功')
      }, function (e) {
        that.$message.error('复制失败，请稍后重试')
      })
    },
    lock() {
      let pwd = this.lockpwd.trim();
      if (!pwd.match(/^.{4,20}$/)) {
        this.lockPwdErr = '请输入4-20位密码';
        return false
      } else {
        this.lockPwdErr = ''
      }
      let amount = this.lockValue.trim()
      this.loading = this.$loading()
      this.$http.post('/node/man/pbslc.do',{
        pwd,amount
      }).then((res)=>{
        this.loading.close()
        if (res.retCode == '1') {
          this.$message.success('锁定成功')
          this.lockVisible = false;
          this.lockValue = ''
          this.init();
        }else {
          if (res.retMsg) {
            this.$message.error(res.retMsg + ',锁定失败，请稍后重试')
          }else {
            this.$message.error('锁定失败，请稍后重试');
          }
        }
      }).catch((err) => {
        this.loading.close()
        this.$message.error('锁定失败，请稍后重试');
        this.lockVisible = false;
        this.lockpwd = '';
      })
    },
    openLockDialog() {
      var reg = numReg();
      let amount = this.lockValue.trim()
      let balance = this.accountInfo.balance;
      if (balance && amount > balance) {
        this.$message.warning('锁定数量大于账户余额')
        return
      }
      if (!reg.test(amount)) {
        this.$message.warning('请输入正确的数字')
        return 
      }
      this.lockVisible = true
    },
    closeDialog() {
      this.lockpwd = ''
    }
  }
}
</script>

<style lang="scss">
  .node-info {
    .el-col {
      padding: 4px 0;
    }
    border-bottom: 1px solid #eee;
    line-height: 2em;
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
  .first-block {
    .el-row {
      margin: 15px 0;
    }
  }
</style>
