<template>
  <div class="account">
    <div class="account-inner">
      <div v-if="address && typeof addressInfo.balance != 'undefined'">
        <h3 class="title">账户详情</h3>
        <el-button class="btn-block"  style="width: 20%;min-width: 100px;" type="primary" @click="route('/import/export')">
          导出
        </el-button>
        <div style="margin: 20px 0">
          <el-row>
            <el-col :span="4" :xs="8">
              账户余额：
            </el-col>
            <el-col :span="12">
              {{addressInfo.balance}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" :xs="8">
              交易数量：
            </el-col>
            <el-col :span="12">
              {{transaction_amount}}
            </el-col>
          </el-row>
          <div>
            <div style="margin: 20px 0;padding: 10px 0;border-bottom: 1px solid #eee;">交易：</div>
            <Transactions :address="address"/>
          </div>
        </div>
      </div>
      <div v-else-if="address">
        <div class="input-error" style="padding: 50px 0;">
          获取账户详情失败,请重试
        </div>
      </div>
      <div v-else v-show="loaded">
        <h3>您目前好像还没有账户</h3>
        <el-row :gutter="30">
          <el-col :span="8" :xs="24">
            <el-card>
              <el-button @click="addAccount" class="new-account" size="mini" type="primary" icon="el-icon-circle-plus-outline">创建</el-button>
            </el-card>
          </el-col>
          <el-col :span="8" :xs="24">
            <el-upload
              class="upload-keystore"
              :before-upload="beforeUpload"
              :action="action"
              >
              <el-card>
                <el-button class="import-account" size="mini" type="primary" icon="el-icon-edit-outline">导入keystore</el-button>
              </el-card>
            </el-upload>
          </el-col>
          <el-col :span="8" :xs="24">
            <el-card>
              <el-button @click="route('/import/index')" class="import-account" size="mini" type="primary" icon="el-icon-edit-outline">导入私钥</el-button>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog
      :modal-append-to-body="false"
      title="创建账户"
      :visible.sync="addVisible"
      center>
      <div>
        <el-input v-model="inputAddress"  auto-complete="new-password" type="password" placeholder="请输入您的密码"></el-input>
        <div class="input-error">{{addressErr}}</div>
      </div>
      <div>
        <el-input v-model="repeatpwd"  auto-complete="new-password" type="password" placeholder="请再次输入您的密码"></el-input>
        <div class="input-error">{{repeatErr}}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-block" type="primary" @click="setAddress">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :modal-append-to-body="false"
      title="导入keystore"
      :visible.sync="keystoreVisible"
      center>
      <div>
        <el-input v-model="keystorePass"  auto-complete="new-password" type="password" placeholder="请输入您的密码"></el-input>
        <div class="input-error">{{keystorePassErr}}</div>
      </div>
      <div>
        <el-input v-model="repeatKeystorePass"  auto-complete="new-password" type="password" placeholder="请再次输入您的密码"></el-input>
        <div class="input-error">{{repeatKeystorePassErr}}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-block" type="primary" @click="importKeystore">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Transactions from './transactions'
import { getAddress, setAddress } from '@/utils/auth'
var pwdReg = /^.{6,20}$/;
var columns = [
  {prop: 'txHash',label: '交易哈希'},
  {prop: 'blockHeight', label: '区块高度'},
  {prop: 'age', label: '生成时间'},
  {prop: 'from', label: '转出地址'},
  {prop: 'to', label: '转入地址'},
  {prop: 'status', label: '状态'}
]
export default {
  data() {
    return {
      address: '', //账户地址
      getAddressErr: '', //账户获取错误信息
      addressInfo: {},
      addVisible: false,
      inputAddress: '',
      addressErr: '',
      repeatpwd: '',
      repeatErr: '',
      loaded: false,
      loading: null,
      columns: columns,
      data: [],
      action: '/action',
      keystoreVisible: false,
      keystorePass: '',
      repeatKeystorePass: '',
      keystorePassErr: '',
      repeatKeystorePassErr: '',
      keyStoreJsonStr: ''
    }
  },
  components: {
    Transactions
  },
  mounted() {
    this.initAddress()
    this.initAddressInfo()
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
            if (obj.address) {
              return obj.address
            }
          });
          var tos = item.tos.map((obj,i) => {
            if (obj.address) {
              return obj.address
            }
          });
          item.from = froms.join(',')
          item.to = tos.join(',')
          item.age = that.timeago().format(item.timeStamp)
          return item
        })
      }
      return result
    },
    transaction_amount(){
      var addressInfo = this.addressInfo;
      if (addressInfo.transactions && addressInfo.transactions.length) {
        return addressInfo.transactions.length
      } else {
        return 0;
      }
    }
  },
  methods: {
    initAddress(value) {
      this.loading = this.$loading()
      let address = getAddress();
      if (value) {
        address = value
      }
      if (address) {
        this.address = address;
        return false;
      }
      this.$http.post('/node/man/pbgna.do', {
        address
      }).then((res) => {
        this.loaded = true;
        this.getAddressErr = ''
        this.loading.close()
        console.log('addressinfo',res)
        if (res.retCode == '1' && res.address) {
          setAddress(res.address)
          this.initAddressInfo(res.address)
        }
      }).catch((err) => {
        this.$message.error('网络请求错误')
        this.getAddressErr = '获取账户详情出错';
        this.loading.close()
        console.log('err get account',err);
      })
    },
    addAccount() {
      this.addVisible = true;
    },
    setAddress() {
      let pwd = this.inputAddress.trim()
      let repeatpwd = this.repeatpwd.trim()
      var addressErr = ''
      if (pwd.match(pwdReg)) {
        addressErr = '';
      } else {
        addressErr = '请输入6～20位密码';
      }
      this.addressErr = addressErr
      if (addressErr) {
        return
      }
      if (pwd !== repeatpwd) {
        this.repeatErr = '两次密码输入不一致';
        return false;
      }else {
        this.repeatErr = '';
      }
      this.loading = this.$loading();
      this.$http.post('/node/man/pbcna.do',{
        pwd
      }).then((res) => {
        this.loading.close()
        if (res.retCode == '1') {
          this.$message.success('账户创建成功')
          this.inputAddress = '';
          this.addVisible = false;
          this.initAddress()
        } else if (res.retMsg) {
          this.$message.error(res.retMsg + ',账户创建失败')
        }
      }).catch((err) => {
        this.loading.close()
        this.$message.error('账户创建失败')
      })
    },
    route(value) {
      if (!value) {
        return
      }
      this.$router.push({
        path:value
      })
    },
    initAddressInfo(value) {
      this.loading = this.$loading()
      let address = '';
      if (this.$route.query.address) {
        address = this.$route.query.address
      }else {
        address = getAddress()
      }
      if (value) {
        address = value
      }
      this.address = address
      if (!address) {
        return
      }
      this.$http.post('/block/adr/pbgad.do', {
        address
      }).then((res) => {
        this.loading.close()
        if (res.retCode == 1 && typeof res.address ) {
          console.log(res,'-----------')
          this.addressInfo = res.address
        } else {
          this.$message.error('获取账户详情错误')
        }
      }).catch((err) => {
        this.loading.close()
      })
    },
    beforeUpload(file) {
      var that = this;
      console.log('-----upload---file----',file);
      if (typeof FileReader == 'function') {
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
          // console.log('---file---reader',e.target.result);
          if (e.target.result) {
            that.keyStoreJsonStr = e.target.result;
            that.keystoreVisible = true;
          }
        }
        fileReader.onerror = function (e) {
          that.$message.error('文件读取错误，请稍后重试');
        }
        fileReader.readAsText(file);
      } else {
        this.$message.warning('请使用chrome,firefox等现代浏览器');
      }
      return false
    },
    importKeystore() {
      var keyStoreJsonStr = this.keyStoreJsonStr.trim()
      var pwd = this.keystorePass.trim()
      var repeatpwd = this.repeatKeystorePass.trim()
      var pwdErr = '';
      if (pwd.match(pwdReg)) {
        pwdErr = '';
      } else {
        pwdErr = '请输入6～20位密码';
      }
      this.keystorePassErr = pwdErr;
      if (pwdErr) {
        return
      }
      if (pwd !== repeatpwd) {
        this.repeatKeystorePassErr = '两次密码输入不一致';
        return false;
      }else {
        this.repeatKeystorePassErr = '';
      }
      this.loading = this.$loading();
      this.$http.post('/node/man/pbsna.do',{
        pwd,
        keyStoreJsonStr
      }).then((res) => {
        this.loading.close()
        if (res.retCode == '1') {
          this.$message.success('账户创建成功')
          this.keystorePass = '';
          this.repeatKeystorePass = '';
          this.keystoreVisible = false;
          this.initAddress()
        } else if (res.retMsg) {
          this.$message.error(res.retMsg + ',账户创建失败')
        }
      }).catch((err) => {
        this.loading.close()
        this.$message.error('账户创建失败')
      })
    }
  }
}
</script>

<style lang="scss">
  .new-account,.import-account {
    display: block;
    margin: 0 auto;
  }
  .account-inner {
    h3 {
      margin: 10px 0 30px 0;
    }
    .el-row {
      // padding: 10px 0;
      .el-col {
        margin: 20px 0;
      }
    }
  }
  .upload-keystore {
    width: 100%;
    .el-upload {
      display: block;
    }
  }
</style>
