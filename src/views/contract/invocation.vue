<template>
  <div class="contract-invocation">
    <div>
      <h3 class="title">创建合约</h3>
    </div>
    <div class="contract-inner">
      <div>
        <el-input
          type="textarea"
          :autosize="{minRows:4,maxRows:8}"
          placeholder="请输入密码"
          v-model="contract"></el-input>
      </div>
      <div class="input-pass">
        <el-input type="password" v-model="pwd" placeholder="请输入创建合约的密码">

        </el-input>
        <div class="input-error">{{pwdErr}}</div>
        <!-- <el-input type="password" v-model="checkpwd" placeholder="请再次输入密码">

        </el-input> -->
        <div class="btn-center">
          <el-button type="primary" @click="create">创建</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contract: '',//合约内容
      pwd: '',
      checkpwd: '',
      pwdErr: '',
      craeteDisabled: true
    }
  },
  methods: {
    compile() {
      this.craeteDisabled = false;
    },
    create() {
      let pwd = this.pwd.trim();
      if (!pwd) {
        this.pwdErr = '请输入密码';
      } else if(pwd.length > 20 || pwd.length < 6) {
        this.pwdErr = '密码应该在6～20位之间'
      } else {
        this.pwdErr = '';
      }
      if (this.pwdErr) {
        return false;
      }
      let code = this.contract.trim();
      this.$loading();
      this.$http.post('/node/man/pbcct.do',{
        pwd,
        code
      }).then((res) => {
        this.$loading().close();
        console.log('----res----',res);
        if (res.retCode == 1) {
          this.$message.success('创建成功。');
          this.$router.push({
            name: 'Contract'
          })
        } else if(res.retMsg) {
          this.$message.error(res.retMsg,'创建失败，请稍后重试');
        }else {
          this.$message.error('创建失败，请稍后重试');
        }
      }).catch((err) => {
        this.$loading().close();
        console.log('contract---failed',err);
        this.$message.error('创建失败，请稍后重试');
      })
    }
  }
}
</script>

<style lang="scss">
  .contract-inner {
    max-width: 600px;
    padding: 40px 0;
  }
  .btn-center {
    margin: 20px 0;
    padding: 10px;
    .el-button {
      width: 100%;
      display: block;
      max-width: 600px;
      margin: 0 auto;
    }
  }
  .input-pass {
    margin-top: 40px;
    .el-input {
      margin-bottom: 10px;
    }
  }
</style>
