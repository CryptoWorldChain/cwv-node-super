webpackJsonp([8],{"5Ml3":function(o,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={data:function(){return{blockErr:"",transactons:[],blockInfo:{}}},mounted:function(){this.init()},beforeRouteUpdate:function(o,t,n){var s=this.blockInfo.height,l=o.query.height;0==s&&0==l?n(!1):n()},watch:{$route:"init"},methods:{init:function(){var o=this,t=this.$route.query.hash,n=this.$route.query.height;if(t)this.$loading(),this.$http.post("/node/blk/pbgha.do",{blockHash:t}).then(function(n){o.$loading().close(),console.dir(n.block),1==n.retCode&&n.block&&n.block.header?(o.blockErr="",o.blockInfo=n.block.header,o.transactons=n.block.body.transactions?n.block.body.transactions:[]):o.blockErr="未能加载hash为 "+t+" 的区块"}).catch(function(t){o.$loading().close(),o.blockErr="区块加载出错"});else{if(!n&&0!=n)return!1;if(0==(n=n.toString()));else{if(!n.match(/^\d+$/))return void(this.blockErr="区块高度错误");this.blockErr=""}this.$loading(),this.$http.post("/node/blk/pbghe.do",{blockHeight:n}).then(function(t){o.$loading().close(),1==t.retCode&&t.block&&t.block.header?(o.blockErr="",o.blockInfo=t.block.header,o.transactons=t.block.body.transactions?t.block.body.transactions:[]):o.blockErr="未能加载区块 #"+n}).catch(function(t){o.$loading().close(),o.blockErr="区块加载出错"})}}}},l={render:function(){var o=this,t=o.$createElement,n=o._self._c||t;return n("div",{staticClass:"block-info"},[n("div",[n("h3",{staticClass:"title"},[o._v("区块详情")]),o._v(" "),n("div",[o.blockInfo.blockHash?n("div",[o.blockErr?n("div",{staticClass:"block-error"},[o._v(o._s(o.blockErr))]):n("div",[n("el-row",[n("el-col",{attrs:{span:4,xs:6}},[o._v("Height:")]),o._v(" "),n("el-col",{staticClass:"ellipsis",attrs:{span:20,xs:18}},[n("router-link",{class:{"prev-block":!0,disabled:!(o.blockInfo.height>=1)},attrs:{to:{name:"BlockInfo",query:{height:o.blockInfo.height-1>=0?o.blockInfo.height-1:"0"}}}},[o._v("< Prev")]),o._v("\n              "+o._s(o.blockInfo.height)+"\n              "),n("router-link",{staticClass:"next-block",attrs:{to:{name:"BlockInfo",query:{height:o.blockInfo.height+1}}}},[o._v("Next >")])],1)],1),o._v(" "),n("el-row",[n("el-col",{attrs:{span:4,xs:6}},[o._v("TimeStamp:")]),o._v(" "),n("el-col",{staticClass:"ellipsis",attrs:{span:20,xs:18}},[n("timeago",{attrs:{since:o.blockInfo.timestamp}})],1)],1),o._v(" "),n("el-row",[n("el-col",{attrs:{span:4,xs:6}},[o._v("Transactions:")]),o._v(" "),n("el-col",{staticClass:"ellipsis",attrs:{span:20,xs:18}},[n("div",[o._v(o._s(o.transactons.length)+" transactons")])])],1),o._v(" "),n("el-row",[n("el-col",{attrs:{span:4,xs:6}},[o._v("Hash:")]),o._v(" "),n("el-col",{staticClass:"ellipsis",attrs:{span:20,xs:18}},[o._v(o._s(o.blockInfo.blockHash))])],1),o._v(" "),n("el-row",[n("el-col",{attrs:{span:4,xs:6}},[o._v("ParentHash:")]),o._v(" "),n("el-col",{staticClass:"ellipsis",attrs:{span:20,xs:18}},[n("router-link",{staticClass:"link",attrs:{to:{name:"BlockInfo",query:{hash:o.blockInfo.parentHash}}}},[o._v("\n                "+o._s(o.blockInfo.parentHash)+"\n              ")])],1)],1),o._v(" "),n("el-row",[n("el-col",{attrs:{span:4,xs:6}},[o._v("Reward")]),o._v(" "),n("el-col",{staticClass:"ellipsis",attrs:{span:20,xs:18}},[o._v("\n              "+o._s(parseFloat(o.blockInfo.reward)?parseFloat(o.blockInfo.reward):0)+"\n            ")])],1)],1)]):n("div",{staticClass:"input-error"},[o._v(o._s(o.blockErr))])])])])},staticRenderFns:[]};var e=n("VU/8")(s,l,!1,function(o){n("CWj7")},null,null);t.default=e.exports},CWj7:function(o,t,n){var s=n("d1on");"string"==typeof s&&(s=[[o.i,s,""]]),s.locals&&(o.exports=s.locals);n("rjj0")("057022fd",s,!0)},d1on:function(o,t,n){(o.exports=n("FZ+f")(!1)).push([o.i,"\n.block-info .el-row {\n  padding: 8px 0;\n}\n.block-info .prev-block, .block-info .next-block {\n  display: inline-block;\n  vertical-align: middle;\n  width: 48px;\n  height: 22px;\n  text-align: center;\n  line-height: 22px;\n  color: #fff;\n  font-size: 12px;\n  background: #337ab7;\n  cursor: pointer;\n  margin: 0 6px;\n}\n.block-info .prev-block.disabled, .block-info .next-block.disabled {\n    background: #6c9fcc;\n}\n.block-info .block-error {\n  font-size: 12px;\n  color: #f00;\n  padding: 40px 10px;\n}\n",""])}});