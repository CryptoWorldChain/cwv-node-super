<template>
  <div class="home-index">
    <div class="blocks-info">
      <el-row :gutter="20">
        <el-col :lg="6" :sm="12" :md="6" :xs="24">
          <div class="grid-content">
            <div class="top-item">
              <div class="top-item-inner">
                <h4>BEST BLOCK</h4>
                <p  @click="toblock" class="latest-block-value link" style="cursor: pointer;">#{{latest_block}}</p>
                <div class="clear">
                  <span class="float-left color-yellow f12">MINER</span>
                  <span style="width: 120px;" class="float-right color-red ellipsis">{{block.miner && block.miner.address}}</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :sm="12" :md="6" :xs="24">
          <div class="grid-content">
            <div class="col-2 top-item">
              <div class="top-item-inner">
                <h4>LAST BLOCK</h4>
                <p>{{last_block_time}}</p>
                <div class="clear">
                  <span class="float-left color-yellow f12">NEXT BLOCK</span>
                  <span class="float-right color-red">{{next_block_time}} s</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :sm="12" :md="6" :xs="24">
          <div class="grid-content">
            <div class="col-2 top-item">
              <div class="top-item-inner">
                <h4>AVG BLOCK TIME</h4>
                <p>{{header.avgBlockTime ? header.avgBlockTime : '0'}} s</p>
                <div class="clear">
                  <span class="float-left color-yellow f12">LAST BLOCK</span>
                  <span class="float-right color-red">{{last_block_time}}</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :sm="12" :md="6" :xs="24">
          <div class="grid-content">
            <div class="col-2 top-item">
              <div class="top-item-inner">
                <h4>TPS</h4>
                <p>{{header.tps}}</p>
                <div class="clear">
                  <span class="float-left color-yellow f12">LAST TX</span>
                  <span class="float-right color-red">{{block.txCount}}</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="home-index-inner">
      <el-row :gutter="20">
        <el-col :md='12' :xs='24'>
          <el-card>
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
                :style='{width: "190px"}'
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
                :style="{width: '120px'}"
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
          </el-card>
        </el-col>
        <el-col class="wait-block" :md='12' :xs='24'>
          <el-card>
            <div v-if="typeof wait.waitSend != 'undefined'">
              <p>待同步：<span>{{wait.waitSend}}</span></p>
              <p>待打包：<span>{{ wait.waitBlock }}</span></p>
            </div>
            <div v-else class="input-error" style="padding-top: 50px;">
              请求出错,请检查网络或者稍后重试
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="header-info">
      <el-row :gutter="20">
        <el-col :md="12" :xs="24" class="info-item">
          <el-card>
            <div slot="header">CPU</div>
            <div id="cpu-chart" class="chart-item">
              
            </div>
          </el-card>
        </el-col>
        <el-col :md="12" :xs="24" class="info-item">
          <el-card>
            <div slot="header">内存</div>
            <div id="mem-chart" class="chart-item">
              
            </div>
          </el-card>
        </el-col>
        <el-col :md="12" :xs="24" class="info-item">
          <el-card>
            <div slot="header">网络</div>
            <div id="net-chart" class="chart-item">
              
            </div>
          </el-card>
        </el-col>
        <el-col :md="12" :xs="24" class="info-item">
          <el-card>
            <div slot="header">磁盘</div>
            <div id="disk-chart" class="chart-item">
              
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { setAddress } from '@/utils/auth'
let options = [
  {label:'MainNet', value:'mainnet'},
  {label:'TestNet', value:'testnet'},
  {label:'DevNet', value:'devnet'},
  // {label: '单节点模式', value: ''}
]
let devnet = 'devnet';
let devOptions = (function () {
  var num = 32;
  var result = [];
  for(var i = 0;i < num; i ++) {
    if (i == 1) {
      var obj = {}
      obj.value = i + '';
      obj.label = '单节点模式';
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
      devNet:'1',
      loading: false,
      settedNet:'',
      netloading: {},
      changed: false,//区块是否发生了改变
      height:'',
      block_time: '',
      tps:'0',
      nodes:0,
      dpos:0,
      block:{

      },
      header:{
        avgBlockTime:'',
        dpos:'',
        nodes:'',
        tps:''
      },
      wait: {

      },
      cpuChart: null,
      memChart: null,
      netChart: null,
      diskChart: null
    }
  },
  created(){
    this.getNetwork()
    this.initNode()
    this.initWait()
  },
  mounted() {
    this.initLatest();
    this.getHeaderInfo();
    this.interval();
    this.initCharts();
    this.resize();
  },
  destroyed() {
    var timer = this.timer;
    clearInterval(timer);
  },
  computed: {
    latest_block () {
      var height = this.block.height;
      return this.accounting.formatNumber(height);
    },
    last_block_time () {
      var time = this.block.timestamp;
      var last = new Date(time);
      var now = new Date().getTime();
      if (time) {
        var age = ((now - time)/1000);
        if (age < 0) {
          age = 0;
        }
        if (age < 10) {
          return age.toFixed(2) + 's ago';
        }
      }
      return this.timeago().format(last);
    },
    next_block_time () {
      var header = this.header;
      var last_block_time = '';
      var time = this.block.timestamp;
      var last = new Date(time);
      var now = new Date().getTime();
      if (time) {
        var age = ((now - time)/1000);
        if (age < 0) {
          last_block_time = 0;
        }
        if (age < 10) {
          last_block_time = age;
        }
      }
      var last_time = parseFloat(header.avgBlockTime) - parseFloat(last_block_time);
      if (last_time <= 0 ) {
        last_time = 0;
      }
      return last_time ? Number(last_time).toFixed(2) : 0;
    },
  },
  methods: {
    interval(){
      this.timer = setInterval(() => {
        this.initLatest();
        this.getHeaderInfo();
      },5000);
    },
    chooseNet(value) {
    },
    chooseDevNet(value) {
    },
    getNetwork() {
      this.netloading = this.$loading()
      this.$http.post('/node/man/pbgnw.do').then((res) => {
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
      this.loading = true;
      // return;
      this.$http.post('/node/man/pbsnw.do', {
        network
      }).then((res) => {
        this.loading = false;
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
        this.$message.error('设置失败');
      })
    },
    initNode() {
      this.$http.post('/node/man/pbgni.do').then((res) => {
        if (res.serverTime) {
          this.node = res;
          if (res.address) {
            setAddress(res.address)
          }
        }else {
          this.node = {};
        }
      }).catch((err) => {
      })
    },
    modify() {
      this.set = false;
    },
    initWait() {
      this.$http.post('/node/man/pbgnt.do').then((res) => {
        if (typeof res.waitBlock !== undefined) {
          this.wait = res;
        }else {
        }
      }).catch((err) => {
        // this.$message.error('获取pending出错');
      })
    },
    initLatest () {
      let that = this;
      this.$http({
        method:'post',
        url:'/node/blk/pbgtb.do'
      }).then((res) => {
        setTimeout(() => {
          that.changed = true;
        }, 5500);
        if (res.retCode == 1 && res.block) {
          this.block = res.block.header;
        } 
      }).catch((err) => {
        this.changed = true;
        // this.block = {};
      })
    },
    getHeaderInfo () {
      var that = this;
      this.$http.post('/node/adi/pbget.do').then((res) => {
        if (res && res.retCode == 1) {
          that.header = res;
        }
      }).catch((err) => {
      })
    },
    toAddress(e,address) {
      if (!address) {
        return
      }
      this.$router.push({
        name: 'Address',
        params:{
          address
        }
      })
    },
    toblock () {
      var height = this.block.height;
      this.$router.push({
        name: 'BlockInfo',
        query:{
          height:this.block.height
        },
      })
    },
    toNodeList (e,value) {
      let status = '';
      status = value ? value : '';
      this.$router.push({
        path:'/nodelist',
        query: {
          status
        }
      })
    },
    initCharts() {
      this.initCPU();
      this.initMEM();
      this.initNET();
      this.initDISK();
    },
    initCPU() {
      var option = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
        },
        series: [
            {
                name: 'cpu',
                type: 'gauge',
                radius: '100%',
                detail: {formatter:'{value}%'},
                data: [{value: 50, name: 'CPU'}]
            }
        ]
      };
      this.cpuChart = echarts.init(document.getElementById('cpu-chart'),'macarons');
      this.cpuChart.setOption(option);
      var that = this;
      setInterval(function () {
          option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
          that.cpuChart.setOption(option, true);
      },2000);
    },
    initMEM() {
      let that = this;
      var option = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
        },
        series: [
            {
                name: 'mem',
                type: 'gauge',
                radius: '100%',
                detail: {formatter:'{value}%'},
                data: [{value: 50, name: '内存'}]
            }
        ]
      };
      this.memChart = echarts.init(document.getElementById('mem-chart'),'macarons');
      this.memChart.setOption(option);
      setInterval(function () {
          option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
          that.memChart.setOption(option, true);
      },2000);
    },
    initNET() {
      let that = this;
      var option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        tooltip:{
          trigger: 'item'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
      }
      this.netChart = echarts.init(document.getElementById('net-chart'),'macarons');
      this.netChart.setOption(option);
      setInterval(function () {
          function randomData () {
            var result = [];
            for(var i = 0;i<7;i++) {
              var num = Number((Math.random() * 200).toFixed(1)) + 800;
              result.push(num);
            }
            return result;
          }
          option.series[0].data = randomData();
          that.netChart.setOption(option, true);
      },2000);
    },
    initDISK() {
      var option = {
        title : {
            text: '磁盘占用情况',
            subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['文件','文件1','文件2','文件3','文件4']
        },
        series : [
            {
                name: '占用',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'文件'},
                    {value:310, name:'文件1'},
                    {value:234, name:'文件2'},
                    {value:135, name:'文件3'},
                    {value:1548, name:'文件4'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      };
      this.diskChart = echarts.init(document.getElementById('disk-chart'),'macarons');
      this.diskChart.setOption(option);
    },
    resize() {
      let that = this;
      window.onresize = function () {
        that.cpuChart.resize();
        that.memChart.resize();
        that.netChart.resize();
        that.diskChart.resize();
      }
    }
  }
}
</script>

<style lang="scss">
  .home-index-inner {
    .el-col {
      margin: 10px 0;
      .el-card__body {
        height: 250px;
      }
      &.wait-block {
        p {
          margin: 40px 0;
          padding-left: 40px;
        }
      }
    }
    padding: 20px 20px;
    .confirm-set-btn, .modify-set-btn {
      display: block;
      width: 190px;
      margin: 20px 0;
      margin-top: 30px;
      @media screen and (max-width: 780px) {
        width: 100%;
      }
    }
    .el-select {
      margin: 20px 0;
    }
  }
  .blocks-info {
    .el-col {
      margin: 10px 0;
      .grid-content {
        // background: #f5f5f5;
        // padding: 10px;
      }
    }
  }
  .top-item * {
    margin: 0;
    padding: 0;
  }
  .top-item{
    position: relative;
    height: 100px;
    .top-item-inner {
      cursor: default;
      padding: 5px 14px;
      background: rgba(33, 56, 72,.9);
      width: 96%;
      position: absolute;
      top: 0;
      left:0; 
      right: 0;
      bottom: 0;
      margin: auto;
      &.nodes {
        cursor: pointer;
      }
      h4 {
        font-size: 16px;
        line-height: 2em;
        color: #EB9938;
        font-weight: 600;
      }
      p {
        font-size: 24px;
        color: #AEECF0;
        margin-bottom: 10px;
        height: 28px;
        line-height: 28px;
      }
    }
  }
  .header-info {
    .el-col {
      margin: 20px 0 10px 0;
    }
    .chart-item {
      width: 90%;
      margin: 0 auto;
      height: 300px;
    }
  }
</style>
