<template>
  <div>
    <div>
      <h3 class="title">导出</h3>
      <el-row>
        <el-col :span="15" :xs="24">
          <div style="margin: 30px 0;" v-show="!keystore">
            <el-card>
              <el-button :class="'export-key btn-block'" type="primary" style="display: block;margin: 0 auto;" @click="()=>{this.modalVisible = true}">导出</el-button>
            </el-card>
          </div>
          <div v-show="keystore">
            <el-input
              type="textarea"
              :autosize="{ minRows: 15,maxRows: 30}"
              placeholder="keystore"
              disabled
              v-model="keystore">
            ></el-input>
            <el-button class="btn-block" style="margin: 20px 0;" type="primary" @click="copy">复制</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      :modal-append-to-body="false"
      title="导出"
      :visible.sync="modalVisible"
      @close="closeModal"
      center>
      <div>
        <el-input v-model="pwd" @keyup.enter.native="exportKey" auto-complete="new-password" type="password" placeholder="请输入您的密码"></el-input>
        <div class="input-error">{{pwdErr}}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading"  class="btn-block" type="primary" @click="exportKey">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pwd: '',
      pwdErr: '',
      modalVisible: false,
      loading: false,
      keystore: ''
    }
  },
  mounted() {

  },
  methods: {
    exportKey() {
      let pwd = this.pwd.trim()
      if (!pwd.match(/^.{6,20}$/)){
        this.pwdErr = '请输入6-20位密码';
        return
      } else {
        this.pwdErr = '';
      }
      this.loading = true;
      this.$http.post('/node/man/pbena.do', {
        pwd
      }).then((res) => {
        this.loading = false ;
        console.log('---res', res)
        if (res.retCode == '1' ) {
          this.modalVisible = false;
          this.$message.success('导出成功')
          this.keystore = res.keyStoreJsonStr
        } else if (res.retMsg ) {
          this.$message.error(res.retMsg + ',导出失败')
        }else {
          this.$message.error('导出失败')
        }
      }).catch((err) => {
        // this.modalVisible = false;
        this.loading = false;
        console.log('---err', err)
        this.$message.error('导出失败')
      })
    },
    copy() {
      var message = this.keystore ? this.keystore : ''
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
    closeModal() {
      this.pwd = '';
    }
  }
}
</script>

<style>
  .export-key {
    /* width: 60px;
    height: 60px;
    border-radius: 50%;
    text-align: center;
    padding: 0;
    box-shadow: 1px 1px 8px rgba(0,0,0,0.8) */
  }
</style>
