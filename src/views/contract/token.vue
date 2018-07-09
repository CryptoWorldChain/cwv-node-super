<template>
  <div class="token">
    <div>
      <div>
        <h3 class="title">发布token</h3>
      </div>
      <div class="input-error">{{tokenErr}}</div>
      <div class="create-wrapper">
        <el-button type="primary" class="btn-block" @click="open">新建</el-button>
      </div>
      <div class="token-con">
        <el-table :data="data">
          <el-table-column
            prop="token"
            label="token"
          ></el-table-column>
          <el-table-column
            prop="total"
            label="total"
          ></el-table-column>
          <el-table-column
            prop="time"
            label="time"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
    title="提示"
    :visible.sync="createModal"
    width="30%"
    :modal-append-to-body="false"
    @close="handleClose">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="token">
          <el-input @input="inputToken" placeholder="请输入token名称，只能包含大写英文字母" v-model="form.token"></el-input>
        </el-form-item>
        <el-form-item prop="total">
          <el-input placeholder="请输入token总量" v-model="form.total"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input placeholder="请输入密码" type="password" v-model="form.pwd"></el-input>
        </el-form-item>
        <div>
          <el-button class="btn-block" type="primary" @click="create">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getAddress } from '@/utils/auth';
import { numReg } from '@/utils/validate';
export default {
  data () {
    var reg = numReg('15','0');
    var tokenValidator = function (rules,value,c) {
      if (!value) {
        c('请输入token名称');
      } else if (value.match(/^CW/)) {
        c('token名称不能以CWV开头')
      }else if (value.length > 8 || value.length < 3) {
        c('token名称长度不能超过8位且不小于3位');
      }else if (!value.match(/^[A-Z]{3,8}$/)) {
        c('token名称只能包含英文,且需要大写');
      }else {
        c();
      }
    }
    var totalValidator = function (rules,value,c) {
      if (value == 0) {
        c('请输入大于0的数字');
      }
      if (!reg.test(value)) {
        c('请输入正整数，且值不应该大于1000亿');
      }else {
        if (value > 1e11) {
          c('总量不应超过1000亿');
        }
        c();
      }
    }
    var pwdValidator = function (rules,value,c) {
      if (!value) {
        c('请输入密码')
      } else if (value.length > 20 || value.length < 6) {
        c('密码不应小于6位，且不应该大于20位')
      } else {
        c()
      }
    }
    return {
      tokenErr: '',
      data: [],
      createModal: false,
      form: {
        token: '',
        total: '',
        pwd: ''
      },
      rules:{
        token: [
          {validator: tokenValidator, trigger: 'blur'}
        ],
        total: [
          {validator: totalValidator, trigger: 'blur'}
        ],
        pwd: [
          { validator: pwdValidator, trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let address = getAddress();
      if (!address) {
        return
      }
      this.$loading();
      this.$http.post('/node/man/pbgtt.do',{
        address
      }).then((res) => {
        this.$loading().close()
        if (res && res.retCode == '1') {
          if (res.tokens && typeof res.tokens.join == 'function') {
            this.data = res.tokens.map((item,index) => {
              item.time = this.timeago().format(item.timestamp)
              return item;
            })
            this.tokenErr = '';
          } else {
            // this.tokenErr = '没有获取到token';
          }
        } else {
          // this.$message.error('没有获取到token')
          this.tokenErr = '没有获取到token';
        }
      }).catch((error) => {
        this.$loading().close()
        // this.$message.error('没有获取到token')
        this.tokenErr = '没有获取到token';
      })
    },
    open() {
      this.createModal = true;
    },
    inputToken(value) {
      this.form.token = value.toUpperCase();
    },
    handleClose() {
      this.createModal = false;
      this.$refs['form'].resetFields();
      console.log('close')
    },
    create() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.doCreate();
        }
      })
    },
    doCreate() {
      this.$loading();
      let { token, total, pwd } = this.form;
      token = token.trim();
      total = total.trim();
      pwd = pwd.trim();
      this.$http.post('/node/man/pbctt.do',{
        token,
        total,
        pwd
      }).then((res) => {
        this.$loading().close();
        if (res.retCode == 1) {
          this.$message.success('发布成功。')
          this.createModal = false;
          this.init();
        } else {
          var err = '';
          if (res.retMsg) {
            err = res.retMsg;
          }
          this.$message.error((err?(err+',') : '') + '发布失败，请稍后重试。');
        }
      }).catch((err) => {
        this.$loading().close();
        this.$message.error('发布失败，请稍后重试。');
      })
    }
  }
}
</script>

<style lang="scss">
  .token-con {
    max-width: 1100px;
    margin: 0 auto;
  }
  .create-wrapper {
    max-width: 1100px;
    margin: 0 auto;
    padding: 30px 0;
    .btn-block {
      width: 100px;
    }
  }
</style>
