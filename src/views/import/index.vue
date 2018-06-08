<template>
  <div>
    <div>
      <h3 class="title">
        导入私钥
      </h3>
      <el-row>
        <el-col :span="12" :xs="24">
          <div style="margin: 20px 0;">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入"
              v-model="privateKey">
            </el-input>
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
export default {
  data() {
    return {
      privateKey:'',
      pwd: '',
      repeatpwd: '',
      loading: null
    }
  },
  mounted() {

  },
  methods: {
    createAccount() {
      var pwd = this.pwd.trim()
      var repeatpwd = this.repeatpwd.trim()
      var keyStoreJsonStr = this.privateKey
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
      this.$http.post('/node/man/pbsnp.do', {
        pwd,
        priv:keyStoreJsonStr
      }).then((res) => {
        this.loading.close()
        console.log('set account by keystore',res)
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

<style>

</style>
