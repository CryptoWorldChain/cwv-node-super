<template>
  <div class="change-password-container">
    <div class="change-password">
      <div>
        <h3 class="text-center" style="color: #fff; font-size: 20px;">修改密码</h3>
        <div>
          <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <el-form-item label="" prop="oldpass">
              <el-input type="password" placeholder="请输入旧密码" v-model="loginForm.oldpass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="" prop="newpass">
              <el-input type="password" placeholder="请输入新密码" v-model="loginForm.newpass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="" prop="checkpass">
              <el-input type="password" placeholder="请重复输入密码" v-model="loginForm.checkpass" auto-complete="off"></el-input>
            </el-form-item>
            <div>
              <el-button class="btn-block" type="primary" @click="submit">确 定</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { removeToken, removePassword, removeAddress } from '@/utils/auth'
var loginForm = {
  oldpass: '',
  newpass: '',
  checkpass: ''
}
export default {
  data () {
    var that = this;
    var validateOldPass = function (rule,value,c) {
      if (!value) {
        c('请输入密码')
      } else if (value.length > 20 || value.length < 6) {
        c('请输入6~20位密码')
      } else {
        c()
      }
    }
    var validateNewPass = function (rule,value,c) {
      if (!value) {
        c('请输入新密码')
      } else if (value.length > 20 || value.length < 6) {
        c('请输入6~20位新密码')
      } else {
        c()
      }
    }
    var validateCheckPass = function (rule,value,c) {
      var newpass = that.loginForm['newpass'];
      if (!value) {
        c('请再次输入密码')
      } else if (newpass != value) {
        c('两次密码输入不一致')
      } else {
        c()
      }
    }
    return {
      loginForm,
      loginRules: {
        oldpass: [
          { validator: validateOldPass, trigger: 'blur' }
        ],
        newpass: [
          { validator: validateNewPass, trigger: 'blur' }
        ],
        checkpass: [
          { validator: validateCheckPass, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.loginForm = {
      oldpass: '',
      newpass: '',
      checkpass: ''
    };
  },
  methods: {
    submit() {
      var that = this;
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.changePassword();
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    removeCookies() {
      removeToken();
      removePassword();
      removeAddress();
    },
    doSubmit () {
      //修改密码
    },
    changePassword() {
      this.$loading();
      let oldpass = this.loginForm.oldpass;
      let newpass = this.loginForm.newpass;
      this.$http.post('man/pbcpw.do',{old: oldpass, new: newpass}).then((res) => {
        this.$loading().close();
        if (res && res.retCode == '1') {
          this.removeCookies();
          this.$message.success('密码修改成功');
          this.$router.push({
            name: 'Login'
          })
        }else if (res.retMsg) {
          this.$message.error(res.retMsg + ',修改失败，请稍后重试');
        } else {
          this.$message.error('密码修改失败，请稍后重试');
        }
      }).catch((err) => {
        this.$loading().close();
        this.$message.error('密码修改失败，请稍后重试');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .change-password-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #2d3a4b;
  }
  .change-password {
    max-width: 500px;
    padding: 150px 20px 20px 20px;
    margin: 0 auto;
  }
  .btn-block {
    width: 100%;
    display: block;
    margin: 0 auto;
  }
</style>
