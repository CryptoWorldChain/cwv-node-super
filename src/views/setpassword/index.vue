<template>
  <div class="set-password-wrapper">
    <div class="set-password">
      <div class="set-password-inner">
        <el-form class="set-form" autoComplete="off" :model="setForm" :rules="setRules" ref="setForm" label-position="left">
          <h3 class="set-form-title title text-center">Set Password</h3>
          <el-form-item prop="password">
            <span class="svg-container svg-container_set">
              <svg-icon icon-class="password" />
            </span>
            <el-input class="set-input-item" name="password" type="password" v-model="setForm.password" autoComplete="off" placeholder="password" />
          </el-form-item>
          <el-form-item prop="confirmpassword">
            <span class="svg-container">
              <svg-icon icon-class="password"></svg-icon>
            </span>
            <el-input class="set-input-item" name="confirmpassword" type="password" @keyup.enter.native="handleset" v-model="setForm.confirmpassword" autoComplete="off"
              placeholder="confirm password"></el-input>
              <!-- <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleset">
              set
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { setPassword } from '@/utils/auth'
export default {
  data () {
    let passReg = /^\w{5,20}$/;
    let validatePass = (rule,value,c) => {
      console.log(passReg.test(value));
      if (!passReg.test(value)) {
        c('invalid password,');
      }else {
        c();
      }
    }
    let validateConfirmPass = (rule,value,c) => {
      let pass = this.setForm.password;
      console.log(pass,value);
      if (pass !== value) {
        c('two passwords are inconsistent');
      }else {
        c();
      }
    }
    return {
      setForm:{
        password: '',
        confirmpassword: ''
      },
      loading: false,
      setRules:{
        password: [
          {required: true, trigger: 'blur', message: 'please input your password'},
          {validator: validatePass,trigger: 'blur'}
        ],
        confirmpassword: [
          {required: true, trigger: 'blur', message: 'please input your password again'},
          { validator: validateConfirmPass, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleset () {
      this.$refs['setForm'].validate((valid) => {
        var pwd = this.setForm.password.trim();
        if (valid) {
          this.setPassword(pwd)
        } else {
          return false;
        }
      });
    },
    setPassword(pwd) {
      this.$http.post('/node/man/pbraa.do', {
        pwd
      }).then((res) => {
        console.log('---res----',res);
        if (res.retCode == 1) {
          setPassword(pwd);
          console.log(this);
          this.$message.success('密码设置成功');
          this.$router.push({
            path:'/login'
          })
        }
      }).catch((err) => [
        console.log('---err-----',err)
      ])
    }
  }
}
</script>

<style lang="scss">
  .set-password-wrapper {
    overflow: hidden;
    height: 100%;
    background-color: rgb(48, 65, 86);
  }
  .set-password {
    width: 440px;
    padding: 20px 40px;
    border: 1px solid #eee;
    border-radius: 4px;
    margin: 0 auto;
    margin-top: 200px;
    .set-input-item{
      .el-input__inner {
        padding-left: 20px;
      }
    }
    .svg-container {
      position: absolute;
      left: 4px;
      z-index: 99;
    }
    .set-form-title {
      color: #fff;
    }    
  }
</style>
