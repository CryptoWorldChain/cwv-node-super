<template>
  <div class="home-index">
    <div class="home-index-inner">
      <div v-if="!neterr">
        <h3 v-if="settedNet">您已经设置了{{settedNet}}</h3>
        <h3 v-else>您还没有设置网络，请设置你的网络</h3>
      </div>
      <div v-if="neterr" style="padding-top: 40px;" class="input-error">
        {{neterr}}
      </div>
      <div v-else-if="!set">
        <el-select v-model="net"
          placeholder="请选择网络"
          :style='{width: "390px"}'
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
        <el-button :loading="loading" type="primary" @click="setNetwork" class="confirm-set-btn">设置</el-button>
      </div>
      <div v-else-if="set">
        <el-button class="modify-set-btn" type="primary" @click="modify">修改网络</el-button>
      </div>
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
      set: false,
      neterr: '',
      options,
      devOptions,
      net:'',
      devNet:'3',
      loading: false,
      settedNet:'',
      netloading: {}
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
      this.netloading = this.$loading()
      this.$http.post('/node/man/pbgnw.do').then((res) => {
        console.log('res',res)
        this.netloading.close()
        if (res.retCode == '1' && res.network) {
          this.settedNet = res.network;
          if (res.network && res.network.indexOf('_') > -1) {
            var arr = res.network.split('_')
            this.net = arr[0];
            this.devNet = arr[1]
            this.set = true;
          }else {
            this.net = res.network;
            this.set = true;
          }
        }
        this.neterr = ''
      }).catch((err) => {
        this.netloading.close()
        this.$message.error('获取网络设置详情失败')
        this.neterr = '获取网络设置详情失败,请稍后重试'
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
            this.$message.error('设置失败,'+res.retMsg );
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
    modify() {
      this.set = false;
    }
  }
}
</script>

<style scoped lang="scss">
  .home-index-inner {
    padding: 0 20px;
    .confirm-set-btn, .modify-set-btn {
      display: block;
      width: 390px;
      min-width: 280px;
      margin: 20px 0;
      margin-top: 50px;
      @media screen and (max-width: 780px) {
        width: 100%;
      }
    }
    .el-select {
      margin: 20px 0;
    }
  }
</style>
