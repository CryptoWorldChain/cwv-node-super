<template>
  <div class="account">
    <div class="account-inner">
      <div v-if="addressInfo.address">
        <h3 class="title">账户详情</h3>
        <el-button class="btn-block" type="primary" @click="route('/import/export')">
          导出
        </el-button>
      </div>
      <div v-else v-show="loaded">
        <h3>您目前好像还没有账户</h3>
        <el-row>
          <el-col :span="8" :xs="10">
            <el-card>
              <el-button @click="addAccount" class="new-account" size="mini" type="primary" icon="el-icon-circle-plus-outline">创建</el-button>
            </el-card>
          </el-col>
          <el-col :span="2" :xs="4">
          &nbsp;
          </el-col>
          <el-col :span="8" :xs="10">
            <el-card>
              <el-button @click="route('/import/index')" class="import-account" size="mini" type="primary" icon="el-icon-edit-outline">导入</el-button>
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
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-block" type="primary" @click="setAddress">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAddress } from '@/utils/auth'
export default {
  data() {
    return {
      addressInfo: {
        
      },
      addVisible: false,
      inputAddress: '',
      addressErr: '',
      loaded: false,
      loading: null
    }
  },
  mounted() {
    this.initAddress()
  },
  methods: {
    initAddress(value) {
      this.loading = this.$loading()
      let address = '';
      if (this.$route.query.address) {
        address = this.$route.query.address
      }else {
        console.log('---',getAddress());
        address = getAddress()
      }
      if (value) {
        address = value
      }
      console.log(address);
      this.$http.post('/node/man/pbgna.do', {
        address
      }).then((res) => {
        this.loaded = true;
        this.loading.close()
        console.log('addressinfo',res)
        if (res.retCode == '1') {
          this.addressInfo = res;
        }
      }).catch((err) => {
        this.$message.error('网络请求错误')
        this.loading.close()
        console.log('err get account',err);
      })
    },
    addAccount() {
      this.addVisible = true;
    },
    setAddress() {
      let address = this.inputAddress.trim()
      var addressErr = ''
      console.log(address, address.match(/^\w{6,20}$/))
      if (address.match(/^.{6,20}$/)) {
        addressErr = '';
      } else {
        addressErr = '请输入6～20位密码';
      }
      this.addressErr = addressErr
      if (addressErr) {
        return
      }
      this.loading = this.$loading();
      this.$http.post('/node/man/pbcna.do',{
        pwd: address
      }).then((res) => {
        this.loading.close()
        if (res.retCode == '1') {
          this.$message.success('账户创建成功')
          this.inputAddress = '';
          this.addVisible = false;
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .new-account,.import-account {
    display: block;
    margin: 0 auto;
  }
  .account-inner {
    h3 {
      margin: 10px 0 30px 0;
    }
  }
</style>
