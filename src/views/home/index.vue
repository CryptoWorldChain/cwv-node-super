<template>
  <div class="home-index">
    <div class="home-index-inner">
      <div>
        <h3 v-if="settedNet">您已经设置了{{settedNet}}</h3>
        <h3 v-else>请设置你的网络</h3>
      </div>
      <div>
        <el-select v-model="net" 
          placeholder="请选择网络"
          @change="chooseNet"
          >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-if="net == 'devnet'" v-model="devNet" 
          placeholder="请选择dev网络"
          @change="chooseDevNet"
          >
          <el-option
            v-for="item in devOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button :loading="loading" type="primary" @click="setNetwork" class="confirm-set-btn">设置</el-button>
    </div>
  </div>
</template>

<script>
import { setAddress } from '@/utils/auth'
let options = [
  {label:'MainNet', value:'mainnet'},
  {label:'TestNet', value:'testnet'},
  {label:'DevNet', value:'devnet'}
]
let devnet = 'devnet';
let devOptions = (function () {
  var num = 32;
  var result = [];
  for(var i = 0;i < num; i ++) {
    if (i % 2 == 1) {
      var obj = {}
      obj.value = i + '';
      result.push(obj)
    }
  }
  return result
})()
export default {
  data() {
    return {
      options,
      devOptions,
      net:'',
      devNet:'1',
      loading: false,
      settedNet:''
    }
  },
  created(){
    this.getNetwork()
    this.initNode()
  },
  methods: {
    chooseNet(value) {
      console.log('-----choosenet---',value);
    },
    chooseDevNet(value) {
      console.log(value);
    },
    getNetwork() {
      this.$http.post('/node/man/pbgnw.do').then((res) => {
        console.log('res',res)
        if (res.retCode == '1') {
          this.settedNet = res.network;
        }
      }).catch((err) => {
        this.$message.error('获取网络设置详情失败')
        console.log('errrr---get net',err)
      })
    },
    setNetwork() {
      let network = this.net;
      if (!network) {
        this.$message.warning('请选择网络')
        return;
      }
      if (network === devnet ) {
        network += '_' + this.devNet;
      }
      console.log(network);
      this.loading = true;
      // return;
      this.$http.post('/node/man/pbsnw.do', {
        network
      }).then((res) => {
        this.loading = false;
        console.log(res);
        if (res.retCode == '1' ) {
          // do something
          this.$router.push({
            path: '/summary'
          })
          this.$message.success('设置成功');
        }else {
          if (res.retMsg) {
            this.$message.error('设置失败'+res.retMsg );
          }
          this.$message.error('设置失败');
        }
      }).catch((err) => {
        this.loading = false;
        console.log('errr-rrr',err);
        this.$message.error('设置失败');
      })
    },
    initNode() {
      this.$http.post('/node/man/pbgni.do').then((res) => {
        console.log('----res',res)
        if (res.serverTime) {
          this.node = res;
          if (res.address) {
            setAddress(res.address)
          }
        }else {
          this.node = {};
        }
      }).catch((err) => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped lang="scss">
  .home-index-inner {
    padding: 0 20px;
    .confirm-set-btn {
      width: 40%;
      min-width: 280px;
      margin: 20px 0;
    }
    .el-select {
      margin: 20px 0;
    }
  }
</style>
