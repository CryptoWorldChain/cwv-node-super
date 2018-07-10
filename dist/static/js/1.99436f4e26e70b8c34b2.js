webpackJsonp([1],{KR8f:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("pFYg"),a=i.n(n),s=i("TIfe"),o=[{label:"MainNet",value:"mainnet"},{label:"TestNet",value:"testnet"},{label:"DevNet",value:"devnet"}],r=function(){for(var t=[],e=0;e<32;e++)if(1==e){var i={};i.value=e+"",i.label="单节点模式",t.push(i)}return t}(),l={data:function(){return{set:!1,neterr:"",options:o,devOptions:r,net:"",devNet:"1",loading:!1,settedNet:"",netloading:{},changed:!1,height:"",block_time:"",tps:"0",nodes:0,dpos:0,block:{},header:{avgBlockTime:"",dpos:"",nodes:"",tps:""},wait:{},cpuChart:null,memChart:null,netChart:null,diskChart:null}},created:function(){this.getNetwork(),this.initNode(),this.initWait()},mounted:function(){this.initLatest(),this.getHeaderInfo(),this.interval(),this.initCharts(),this.resize()},destroyed:function(){var t=this.timer;clearInterval(t)},computed:{latest_block:function(){var t=this.block.height;return this.accounting.formatNumber(t)},last_block_time:function(){var t=this.block.timestamp,e=new Date(t),i=(new Date).getTime();if(t){var n=(i-t)/1e3;if(n<0&&(n=0),n<10)return n.toFixed(2)+"s ago"}return this.timeago().format(e)},next_block_time:function(){var t=this.header,e="",i=this.block.timestamp,n=(new Date(i),(new Date).getTime());if(i){var a=(n-i)/1e3;a<0&&(e=0),a<10&&(e=a)}var s=parseFloat(t.avgBlockTime)-parseFloat(e);return s<=0&&(s=0),s?Number(s).toFixed(2):0}},methods:{interval:function(){var t=this;this.timer=setInterval(function(){t.initLatest(),t.getHeaderInfo()},5e3)},chooseNet:function(t){},chooseDevNet:function(t){},getNetwork:function(){var t=this;this.netloading=this.$loading(),this.$http.post("/node/man/pbgnw.do").then(function(e){if(t.netloading.close(),"1"==e.retCode&&e.network)if(t.settedNet=e.network,e.network&&e.network.indexOf("_")>-1){var i=e.network.split("_");t.net=i[0],t.devNet=i[1],t.set=!0}else t.net=e.network,t.set=!0;t.neterr=""}).catch(function(e){t.netloading.close(),t.$message.error("获取网络设置详情失败"),t.neterr="获取网络设置详情失败,请稍后重试"})},setNetwork:function(){var t=this,e=this.net;e?("devnet"===e&&(e+="_"+this.devNet),this.loading=!0,this.$http.post("/node/man/pbsnw.do",{network:e}).then(function(e){t.loading=!1,"1"==e.retCode?t.$alert("网络设置成功，请登录节点服务器，执行docker命令后再重新登录。","温馨提示"):(e.retMsg&&t.$message.error("设置失败,"+e.retMsg),t.$message.error("设置失败"))}).catch(function(e){t.loading=!1,t.$message.error("设置失败")})):this.$message.warning("请选择网络")},initNode:function(){var t=this;this.$http.post("/node/man/pbgni.do").then(function(e){e.serverTime?(t.node=e,e.address&&Object(s.g)(e.address)):t.node={}}).catch(function(t){})},modify:function(){this.set=!1},initWait:function(){var t=this;this.$http.post("/node/man/pbgnt.do").then(function(e){void 0!==a()(e.waitBlock)&&(t.wait=e)}).catch(function(t){})},initLatest:function(){var t=this,e=this;this.$http({method:"post",url:"/node/blk/pbgtb.do"}).then(function(i){setTimeout(function(){e.changed=!0},5500),1==i.retCode&&i.block&&(t.block=i.block.header)}).catch(function(e){t.changed=!0})},getHeaderInfo:function(){var t=this;this.$http.post("/node/adi/pbget.do").then(function(e){e&&1==e.retCode&&(t.header=e)}).catch(function(t){})},toAddress:function(t,e){e&&this.$router.push({name:"Address",params:{address:e}})},toblock:function(){this.block.height;this.$router.push({name:"BlockInfo",query:{height:this.block.height}})},toNodeList:function(t,e){var i;i=e||"",this.$router.push({path:"/nodelist",query:{status:i}})},initCharts:function(){this.initCPU(),this.initMEM(),this.initNET(),this.initDISK()},initCPU:function(){var t={tooltip:{formatter:"{a} <br/>{b} : {c}%"},toolbox:{},series:[{name:"cpu",type:"gauge",radius:"100%",detail:{formatter:"{value}%"},data:[{value:50,name:"CPU"}]}]};this.cpuChart=echarts.init(document.getElementById("cpu-chart"),"macarons"),this.cpuChart.setOption(t);var e=this;setInterval(function(){t.series[0].data[0].value=(100*Math.random()).toFixed(2)-0,e.cpuChart.setOption(t,!0)},2e3)},initMEM:function(){var t=this,e={tooltip:{formatter:"{a} <br/>{b} : {c}%"},toolbox:{},series:[{name:"mem",type:"gauge",radius:"100%",detail:{formatter:"{value}%"},data:[{value:50,name:"内存"}]}]};this.memChart=echarts.init(document.getElementById("mem-chart"),"macarons"),this.memChart.setOption(e),setInterval(function(){e.series[0].data[0].value=(100*Math.random()).toFixed(2)-0,t.memChart.setOption(e,!0)},2e3)},initNET:function(){var t=this,e={xAxis:{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{type:"value"},tooltip:{trigger:"item"},series:[{data:[820,932,901,934,1290,1330,1320],type:"line"}]};this.netChart=echarts.init(document.getElementById("net-chart"),"macarons"),this.netChart.setOption(e),setInterval(function(){e.series[0].data=function(){for(var t=[],e=0;e<7;e++){var i=Number((200*Math.random()).toFixed(1))+800;t.push(i)}return t}(),t.netChart.setOption(e,!0)},2e3)},initDISK:function(){this.diskChart=echarts.init(document.getElementById("disk-chart"),"macarons"),this.diskChart.setOption({title:{text:"磁盘占用情况",subtext:"纯属虚构",x:"center"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"left",data:["文件","文件1","文件2","文件3","文件4"]},series:[{name:"占用",type:"pie",radius:"55%",center:["50%","60%"],data:[{value:335,name:"文件"},{value:310,name:"文件1"},{value:234,name:"文件2"},{value:135,name:"文件3"},{value:1548,name:"文件4"}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]})},resize:function(){var t=this;window.onresize=function(){t.cpuChart.resize(),t.memChart.resize(),t.netChart.resize(),t.diskChart.resize()}}}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home-index"},[i("div",{staticClass:"blocks-info"},[i("el-row",{attrs:{gutter:20}},[i("el-col",{attrs:{lg:6,sm:12,md:6,xs:24}},[i("div",{staticClass:"grid-content"},[i("div",{staticClass:"top-item"},[i("div",{staticClass:"top-item-inner"},[i("h4",[t._v("BEST BLOCK")]),t._v(" "),i("p",{staticClass:"latest-block-value link",staticStyle:{cursor:"pointer"},on:{click:t.toblock}},[t._v("#"+t._s(t.latest_block))]),t._v(" "),i("div",{staticClass:"clear"},[i("span",{staticClass:"float-left color-yellow f12"},[t._v("MINER")]),t._v(" "),i("span",{staticClass:"float-right color-red ellipsis",staticStyle:{width:"120px"}},[t._v(t._s(t.block.miner&&t.block.miner.address))])])])])])]),t._v(" "),i("el-col",{attrs:{lg:6,sm:12,md:6,xs:24}},[i("div",{staticClass:"grid-content"},[i("div",{staticClass:"col-2 top-item"},[i("div",{staticClass:"top-item-inner"},[i("h4",[t._v("LAST BLOCK")]),t._v(" "),i("p",[t._v(t._s(t.last_block_time))]),t._v(" "),i("div",{staticClass:"clear"},[i("span",{staticClass:"float-left color-yellow f12"},[t._v("NEXT BLOCK")]),t._v(" "),i("span",{staticClass:"float-right color-red"},[t._v(t._s(t.next_block_time)+" s")])])])])])]),t._v(" "),i("el-col",{attrs:{lg:6,sm:12,md:6,xs:24}},[i("div",{staticClass:"grid-content"},[i("div",{staticClass:"col-2 top-item"},[i("div",{staticClass:"top-item-inner"},[i("h4",[t._v("AVG BLOCK TIME")]),t._v(" "),i("p",[t._v(t._s(t.header.avgBlockTime?t.header.avgBlockTime:"0")+" s")]),t._v(" "),i("div",{staticClass:"clear"},[i("span",{staticClass:"float-left color-yellow f12"},[t._v("LAST BLOCK")]),t._v(" "),i("span",{staticClass:"float-right color-red"},[t._v(t._s(t.last_block_time))])])])])])]),t._v(" "),i("el-col",{attrs:{lg:6,sm:12,md:6,xs:24}},[i("div",{staticClass:"grid-content"},[i("div",{staticClass:"col-2 top-item"},[i("div",{staticClass:"top-item-inner"},[i("h4",[t._v("TPS")]),t._v(" "),i("p",[t._v(t._s(t.header.tps))]),t._v(" "),i("div",{staticClass:"clear"},[i("span",{staticClass:"float-left color-yellow f12"},[t._v("LAST TX")]),t._v(" "),i("span",{staticClass:"float-right color-red"},[t._v(t._s(t.block.txCount))])])])])])])],1)],1),t._v(" "),i("div",{staticClass:"home-index-inner"},[i("el-row",{attrs:{gutter:20}},[i("el-col",{attrs:{md:12,xs:24}},[i("el-card",[t.neterr?t._e():i("div",[t.settedNet?i("h3",[t._v("您已经设置了"+t._s(t.settedNet))]):i("h3",[t._v("您还没有设置网络，请设置你的网络")])]),t._v(" "),t.neterr?i("div",{staticClass:"input-error",staticStyle:{"padding-top":"40px"}},[t._v("\n            "+t._s(t.neterr)+"\n          ")]):t.set?t.set?i("div",[i("el-button",{staticClass:"modify-set-btn",attrs:{type:"primary"},on:{click:t.modify}},[t._v("修改网络")])],1):t._e():i("div",[i("el-select",{style:{width:"190px"},attrs:{placeholder:"请选择网络"},on:{change:t.chooseNet},model:{value:t.net,callback:function(e){t.net=e},expression:"net"}},t._l(t.options,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),"devnet"==t.net?i("el-select",{style:{width:"120px"},attrs:{placeholder:"请选择dev网络"},on:{change:t.chooseDevNet},model:{value:t.devNet,callback:function(e){t.devNet=e},expression:"devNet"}},t._l(t.devOptions,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})):t._e(),t._v(" "),i("el-button",{staticClass:"confirm-set-btn",attrs:{loading:t.loading,type:"primary"},on:{click:t.setNetwork}},[t._v("设置")])],1)])],1),t._v(" "),i("el-col",{staticClass:"wait-block",attrs:{md:12,xs:24}},[i("el-card",[void 0!==t.wait.waitSend?i("div",[i("p",[t._v("待同步："),i("span",[t._v(t._s(t.wait.waitSend))])]),t._v(" "),i("p",[t._v("待打包："),i("span",[t._v(t._s(t.wait.waitBlock))])])]):i("div",{staticClass:"input-error",staticStyle:{"padding-top":"50px"}},[t._v("\n            请求出错,请检查网络或者稍后重试\n          ")])])],1)],1)],1),t._v(" "),i("div",{staticClass:"header-info"},[i("el-row",{attrs:{gutter:20}},[i("el-col",{staticClass:"info-item",attrs:{md:12,xs:24}},[i("el-card",[i("div",{attrs:{slot:"header"},slot:"header"},[t._v("CPU")]),t._v(" "),i("div",{staticClass:"chart-item",attrs:{id:"cpu-chart"}})])],1),t._v(" "),i("el-col",{staticClass:"info-item",attrs:{md:12,xs:24}},[i("el-card",[i("div",{attrs:{slot:"header"},slot:"header"},[t._v("内存")]),t._v(" "),i("div",{staticClass:"chart-item",attrs:{id:"mem-chart"}})])],1),t._v(" "),i("el-col",{staticClass:"info-item",attrs:{md:12,xs:24}},[i("el-card",[i("div",{attrs:{slot:"header"},slot:"header"},[t._v("网络")]),t._v(" "),i("div",{staticClass:"chart-item",attrs:{id:"net-chart"}})])],1),t._v(" "),i("el-col",{staticClass:"info-item",attrs:{md:12,xs:24}},[i("el-card",[i("div",{attrs:{slot:"header"},slot:"header"},[t._v("磁盘")]),t._v(" "),i("div",{staticClass:"chart-item",attrs:{id:"disk-chart"}})])],1)],1)],1)])},staticRenderFns:[]};var d=i("VU/8")(l,c,!1,function(t){i("zKhe")},null,null);e.default=d.exports},cVUb:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,"\n.home-index-inner {\n  padding: 20px 20px;\n}\n.home-index-inner .el-col {\n    margin: 10px 0;\n}\n.home-index-inner .el-col .el-card__body {\n      height: 250px;\n}\n.home-index-inner .el-col.wait-block p {\n      margin: 40px 0;\n      padding-left: 40px;\n}\n.home-index-inner .confirm-set-btn, .home-index-inner .modify-set-btn {\n    display: block;\n    width: 190px;\n    margin: 20px 0;\n    margin-top: 30px;\n}\n@media screen and (max-width: 780px) {\n.home-index-inner .confirm-set-btn, .home-index-inner .modify-set-btn {\n        width: 100%;\n}\n}\n.home-index-inner .el-select {\n    margin: 20px 0;\n}\n.blocks-info .el-col {\n  margin: 10px 0;\n}\n.top-item * {\n  margin: 0;\n  padding: 0;\n}\n.top-item {\n  position: relative;\n  height: 100px;\n}\n.top-item .top-item-inner {\n    cursor: default;\n    padding: 5px 14px;\n    background: rgba(33, 56, 72, 0.9);\n    width: 96%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    margin: auto;\n}\n.top-item .top-item-inner.nodes {\n      cursor: pointer;\n}\n.top-item .top-item-inner h4 {\n      font-size: 16px;\n      line-height: 2em;\n      color: #EB9938;\n      font-weight: 600;\n}\n.top-item .top-item-inner p {\n      font-size: 24px;\n      color: #AEECF0;\n      margin-bottom: 10px;\n      height: 28px;\n      line-height: 28px;\n}\n.header-info .el-col {\n  margin: 20px 0 10px 0;\n}\n.header-info .chart-item {\n  width: 90%;\n  margin: 0 auto;\n  height: 300px;\n}\n",""])},zKhe:function(t,e,i){var n=i("cVUb");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("338369dc",n,!0)}});