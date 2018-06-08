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
        <div style="margin-top: 40px;" class="">
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
                <el-button size="mini" type="primary" @click="goToAddress">去设置</el-button>
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
      lockValue: '',
      lockPwdErr: '',// 密码错误信息
      lockpwd: '',
      lockVisible: false,
      firstBlock: {},
      node:{
        dpos: {},
        raft: {}
      },
      moment
    }
  },
  mounted() {
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
        console.log('----res',res.address)
        if (res.serverTime) {
          this.node = res;
          if (this.node && this.node.address) {
            let address = this.node.address;
            setAddress(address)
          } else {
            removeAddress()
          }
        }else {
          this.node = {};
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    init() {
      this.initNode()      
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
    },
    lock() {
      let pwd = this.lockpwd.trim();
      if (!pwd.match(/^.{6,20}$/)) {
        this.lockPwdErr = '请输入6-20位密码';
        return false
      } else {
        this.lockPwdErr = ''
      }
      let amount = this.lockValue.trim();
      this.$http.post('/node/man/pbslc.do',{
        pwd,amount
      }).then((res)=>{
        if (res.retCode == '1') {
          this.$message.success('锁定成功');
          this.lockVisible = false;
          this.init();
        }else {
          if (res.retMsg) {
            this.$message.error(res.retMsg + ',锁定失败，请稍后重试');
          }else {
            this.$message.error('锁定失败，请稍后重试');
          }
        }
      }).catch((err) => {
        this.$message.error('锁定失败，请稍后重试');
        this.lockVisible = false;
        this.lockpwd = '';
      })
    },
    openLockDialog() {
      var reg = numReg();
      let amount = this.lockValue.trim()
      if (amount > 1e16) {
        this.$message.warning('您输入的值过大')
        return;
      }
      if (!reg.test(amount)) {
        this.$message.warning('请输入正确的数字')
        return ;
      }
      this.lockVisible = true;
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
</style>
