<template>
  <div class="start-node">
    <div>
      <h3 class="title">节点启动/停止</h3>
    </div>
    <div>
      <div class="start-and-stop">
        <el-row>
          <el-col :span="12" :xs="24">
            <el-button type="primary" @click="start">启动节点</el-button>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-button type="primary" @click="stop">停止节点</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="start-stop-content text-center animated" :class="{fadeInLeft: fadeIn}">
        {{msg}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dockerList: [],
      name: '',
      msg: '',
      fadeIn: false
    }
  },
  computed: {
    id() {
      let list = this.dockerList;
      let name = this.name;
      let id = '';
      list.every((item, index) => {
        if (item.name == name) {
          id = item.id;
        }
      })
      return id;
    }
  },
  methods: {
    init() {
      this.$http.get('http://localhost:2376/v1.37/containers/json').then((res) => {
        console.log('----获取docker列表',res)
      }).catch((error) => {
        console.log('get docker list failed',error);
      })
    },
    func(type) {
      let id = this.id;
      if (!id) {
        return false;
      }
      var uri = 'http://localhost:2376/v1.37/containers/';
      if (!type) {
        return
      }else if (type == 'start' || type=='restart' || type=='stop') {
        uri += id + '/';
        uri += type;
      }
      return uri;
    },
    start() {
      this.msg = '请登录节点服务器，执行docker命令。';
      this.fadeIn = true;
      this.timeout()
    },
    stop() {
      this.msg = '请登录节点服务器，执行docker命令。';
      this.fadeIn = true;
      this.timeout()
    },
    timeout() {
      setTimeout(() => {
        this.fadeIn = false;
      }, 1000);
    }
    // start() {
    //   let url = this.func('start');
    //   this.$http.get(url).then((res) => {

    //   }).catch((err) => {
    //     this.$message.error('节点启动失败，请稍后重试');
    //   })
    // },
    // restart() {
    //   let url = this.func('restart');
    //   this.$http.get(url).then((res) => {

    //   }).catch((err) => {
    //     this.$message.error('节点重启失败，请稍后重试');
    //   })
    // },
    // stop() {
    //   let url = this.func('stop');
    //   this.$http.get(url).then((res) => {

    //   }).catch((err) => {
    //     this.$message.error('节点停止失败，请稍后重试');
    //   })
    // }
  }
}
</script>

<style lang="scss">
  .start-and-stop {
    .el-col {
      padding: 30px;
      .el-button {
        min-width: 160px;
        display: block;
        margin: 0 auto;
      }
      @media screen and(max-width: 768px) {
        .el-button {
          width: 100%;
        }
      }
    }
  }
  .start-stop-content {
    margin-top: 20px;
    padding: 20px;
    font-size: 16px;
    color: #333;
  }
</style>
