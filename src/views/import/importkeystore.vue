<template>
  <div>
    <div>
      <h3 class="title">
        导入keystore
      </h3>
      <div v-if="localAddress || netAddress">
        <h4 style="padding: 20px 0">您已经设置过账户,<router-link :to="{name: 'Account'}" style="color: #409EFF;">查看账户</router-link></h4>
      </div>
      <el-row v-else>
        <el-col :span="12" :xs="24">
          <div style="margin: 20px 0;">
            <el-input
              type="textarea"
              :autosize="{ minRows: 12, maxRows: 20}"
              placeholder="手动输入或者导入keystore文件"
              v-model="keystore">
            </el-input>
            <div style="margin: 10px 0;">
              <el-upload
              class="upload-keystore"
              :before-upload="beforeUpload"
              :action="action"
              >
              <el-card>
                <el-button class="import-account" size="mini" type="primary" icon="el-icon-edit-outline">导入keystore</el-button>
              </el-card>
            </el-upload>
            </div>
            <el-input
              style="margin: 20px 0;"
              type="password"
              placeholder="请输入您的密码"
              v-model="pwd"
              auto-complete="new-password"
            ></el-input>
            <el-input
              style="margin-bottom: 20px;"
              type="password"
              placeholder="请再次输入您的密码"
              v-model="repeatpwd"
              auto-complete="new-password"
            ></el-input>
          </div>
          <el-button style="margin: 30px 0;" type="primary" size="mini" class="btn-block"
            @click="createAccount"
          >导入</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getAddress, setAddress, removeAddress } from '@/utils/auth'
export default {
  data() {
    return {
      keystore:'',
      pwd: '',
      repeatpwd: '',
      netAddress: '',
      localAddress: '',
      loading: null,
      keystoreVisible: false,
      action: '/action'   //上传地址
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.localAddress = getAddress()
      this.getaddress()
    },
    getaddress() {
      if (getAddress()) {
        return
      }
      this.loading = this.$loading()
      this.$http.post('/node/man/pbgna.do', {
        
      }).then((res) => {
        this.loading.close()
        if (res.retCode == '1') {
          if (res.address) {
            setAddress(res.address)
            this.netAddress = res.address
          } else {
            removeAddress()
          }
        }
      }).catch((err) => {
        this.$message.error('网络请求错误')
        this.loading.close()
      })
    },
    beforeUpload(file) {
      var that = this;
      var filename = file.name;
      if (!filename.match(/\.keystore$/i)) {
        that.$message.error('请选择后缀名为keystore的文件');
        return false;
      }
      if (typeof FileReader == 'function') {
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
          // console.log('---file---reader',e.target.result);
          if (e.target.result) {
            that.keystore = e.target.result;
          } else {

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
    createAccount() {
      var pwd = this.pwd.trim()
      var repeatpwd = this.repeatpwd.trim()
      var keyStoreJsonStr = this.keystore.trim()
      if (!keyStoreJsonStr) {
        this.$message.warning('请输入您需要导入的信息')
        return false
      }
      if (!pwd) {
        this.$message.warning('请输入您的密码')
        return false
      }else if (!pwd.match(/^.{6,20}$/)) {
        this.$message.warning('请输入6～20位密码')
        return false
      }
      if (pwd !== repeatpwd ) {
        this.$message.warning('两次密码输入不一致');
        return false
      }
      this.loading = this.$loading()
      this.$http.post('/node/man/pbsna.do', {
        pwd,
        keyStoreJsonStr
      }).then((res) => {
        this.loading.close()
        if (res.retCode == '1') {
          this.$message.success('导入账户成功')
        } else if (res.retMsg) {
          this.$message.error(res.retMsg + ',导入失败')
        }
      }).catch((err) => {
        this.loading.close()
        this.$message.error('导入失败，请稍后重试')
      })
    }
  }
}
</script>

<style lang="scss">
  .upload-keystore {
    .el-upload {
      display: block;
    }
  }
</style>
