webpackJsonp([13],{EwOV:function(t,e,s){(t.exports=s("FZ+f")(!1)).push([t.i,"\n.node-info {\n  border-bottom: 1px solid #eee;\n  line-height: 2em;\n}\n.node-info .el-col {\n    padding: 4px 0;\n    max-width: 600px;\n}\n.node-info td {\n    max-width: 500px;\n}\n.node-info * {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n.node-info .node-item .node-item-left {\n    margin-right: 10px;\n}\n.node-info .node-item .node-item-right {\n    font-size: 14px;\n}\n.first-block-info {\n  padding: 10px 0 20px 0;\n}\n.node-info h3, .first-block-info h3 {\n  padding: 10px;\n  background: #f5f5f5;\n}\n.first-block .el-row {\n  margin: 15px 0;\n}\n",""])},Ts8t:function(t,e,s){var o=s("EwOV");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);s("rjj0")("253f2cbe",o,!0)},lAHJ:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("PJh5"),n=s.n(o),i=s("E4LH"),a=s("TIfe"),l={data:function(){return{firstLoading:!0,lockValue:"",lockPwdErr:"",addressMsg:"",lockpwd:"",lockVisible:!1,firstBlock:{},lockInputErr:"",node:{dpos:{},raft:{}},moment:n.a,accountInfo:{},loading:null,nameModal:!1,algorithm:"",name:"",nameErr:""}},mounted:function(){this.init(),this.changeName("how")},computed:{address:function(){return this.node.address||""},balance:function(){var t=this.accountInfo;return t.balance?t.balance:"0"},tokens:function(){var t=this.accountInfo,e=[];return e&&"function"==typeof e.join&&(e=t.tokens.filter(function(t,e){if(t.token&&"CWS"==t.token.toUpperCase())return t})),console.log("----tokens",e),e},lockedBalance:function(){var t="",e=this.accountInfo;return t=e.locked?e.locked:"0",t}},methods:{openNameModal:function(t){this.nameModal=!0,this.algorithm=t},closeNameModal:function(){this.name="",this.nameModal=!1},lockBlur:function(){var t=Object(i.c)(),e=this.lockValue.trim();this.node.cwstotal;if(t.test(e))return e<=0?(this.lockInputErr="请输入大于0的数字",!1):void(this.lockInputErr="");this.lockInputErr="请输入正确的数字"},goToAddress:function(){var t=this.address;if(!t)return!1;this.$router.push({name:"Account",query:{address:t}})},setAddress:function(){this.$router.push({name:"Account"})},initNode:function(){var t=this;this.loading=this.$loading(),this.$http.post("/node/man/pbgni.do").then(function(e){if(t.loading.close(),t.initFirst(),e.serverTime)if(t.node=e,t.node&&t.node.address){var s=t.node.address;Object(a.g)(s),t.initAccount(s)}else Object(a.d)();else t.node={}}).catch(function(e){t.initFirst(),t.loading.close(),console.log(e)})},initAccount:function(t){var e=this;this.$http.post("/node/adr/pbgad.do",{address:t}).then(function(t){1==t.retCode?t.address?(e.accountInfo=t.address,e.addressMsg="",console.log("-----account------info-------",e.accountInfo)):(e.addressMsg="节点启动中，请耐心等候。",setTimeout(function(){e.initAccount()},5e3)):e.addressMsg="未能获取到账户详情,请稍后重试"}).catch(function(t){})},init:function(){this.initNode()},initFirst:function(){var t=this,e=this;this.firstLoading=!0,this.$http({url:"/node/blk/pbggb.do",method:"post",data:{}}).then(function(s){e.firstLoading=!1,console.log("res----",s),"1"==s.retCode&&s.block&&s.block.header&&(t.firstBlock=s.block.header,t.firstBlock.age=t.timeago().format(t.firstBlock.timestamp))}).catch(function(t){e.firstLoading=!1,console.log("----err-----",t)})},copy:function(){var t=this.firstBlock.hash||"",e=this;t&&this.$copyText(t).then(function(t){e.$message.success("复制成功")},function(t){e.$message.error("复制失败，请稍后重试")})},lock:function(){var t=this,e=this.lockpwd.trim();if(!e.match(/^.{4,20}$/))return this.lockPwdErr="请输入4-20位密码",!1;this.lockPwdErr="";var s=this.lockValue.trim();this.loading=this.$loading(),this.$http.post("/node/man/pbslc.do",{pwd:e,amount:s}).then(function(e){t.loading.close(),"1"==e.retCode?(t.$message.success("锁定成功"),t.lockVisible=!1,t.lockValue="",t.init()):e.retMsg?t.$message.error(e.retMsg+",锁定失败，请稍后重试"):t.$message.error("锁定失败，请稍后重试")}).catch(function(e){t.loading.close(),t.$message.error("锁定失败，请稍后重试"),t.lockVisible=!1,t.lockpwd=""})},openLockDialog:function(){var t=this.lockValue.trim();if(this.lockInputErr=t<=0?"请输入正确的数字":"",this.lockInputErr)return!1;this.lockVisible=!0},closeDialog:function(){this.lockpwd=""},changeName:function(){var t=this,e=this.algorithm,s=this.name.trim();return("dpos"==e||"raft"==e)&&(!!s&&(s.match(/^[\w-]{6,32}$/)?(this.nameErr="",this.$loading(),void this.$http.get('/node/pzp/pbchn.do?bd={"nid":"'+e+'","newname":"'+s+'"}').then(function(e){t.$loading().close(),void 0!==e.ret_code&&"0"==e.ret_code?(t.$message.success("名称修改成功"),t.initNode(),t.nameModal=!1):t.$message.error("名称修改失败,请稍后重试")}).catch(function(e){t.$loading().close(),t.$message.error("名称修改失败,请稍后重试")})):(this.nameErr="请输入6～32位合格的字符",!1)))}}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"summary-index"},[t.node.serverTime?s("div",{staticClass:"node-info"},[s("h3",{staticStyle:{margin:"10px 0 20px 0"}},[t._v("节点摘要信息")]),t._v(" "),s("div",{staticStyle:{"min-height":"300px","padding-bottom":"20px"}},[s("el-row",[s("el-col",{attrs:{span:12,xs:24}},[s("h4",[t._v("DPOS")]),t._v(" "),s("table",{staticClass:"border-table"},t._l(t.node.dpos,function(e,o){return s("tr",{key:o},[s("td",[t._v(t._s(o))]),t._v(" "),"startUpTime"==o?s("td",[s("timeago",{attrs:{since:e}})],1):"name"==o?s("td",[t._v("\n                "+t._s(e)+"\n                "),s("el-button",{staticClass:"float-right",attrs:{type:"primary",size:"small"},on:{click:function(e){t.openNameModal("dpos")}}},[t._v("修改")])],1):s("td",[t._v(t._s(e))])])}))]),t._v(" "),s("el-col",{attrs:{span:12,xs:24}},[s("h4",[t._v("RAFT")]),t._v(" "),s("table",{staticClass:"border-table"},t._l(t.node.raft,function(e,o){return s("tr",{key:o},[s("td",[t._v(t._s(o))]),t._v(" "),"startUpTime"==o?s("td",[s("timeago",{attrs:{since:e}})],1):"name"==o?s("td",[t._v("\n                "+t._s(e)+"\n                "),s("el-button",{staticClass:"float-right",attrs:{type:"primary",size:"small"},on:{click:function(e){t.openNameModal("raft")}}},[t._v("修改")])],1):s("td",[t._v(t._s(e))])])}))])],1),t._v(" "),void 0!==t.accountInfo.balance?s("div",{staticStyle:{"margin-top":"40px"}},[s("el-row",[s("el-col",{attrs:{span:4,xs:8}},[t._v("锁定：")]),t._v(" "),s("el-col",{attrs:{span:10,xs:16}},[s("el-input",{attrs:{type:"number",placeholder:"请输入"},on:{input:t.lockBlur,blur:t.lockBlur},model:{value:t.lockValue,callback:function(e){t.lockValue=e},expression:"lockValue"}},[s("template",{slot:"append"},[s("el-button",{attrs:{type:"primary"},on:{click:t.openLockDialog}},[t._v("确定")])],1)],2),t._v(" "),s("div",{staticClass:"input-error"},[t._v(t._s(t.lockInputErr))])],1)],1),t._v(" "),s("el-row",[s("el-col",{attrs:{span:4,xs:8}},[t._v("账户余额：")]),t._v(" "),s("el-col",{attrs:{span:10,xs:16}},[t._v("\n            "+t._s(t.balance)+"\n          ")])],1),t._v(" "),s("div",[t._v("token: ")]),t._v(" "),t._l(t.tokens,function(e){return s("div",{key:e.token,staticStyle:{border:"1px solid #f1f1f1",padding:"10px"}},[s("el-row",[s("el-col",{attrs:{span:2,xs:8}},[t._v(t._s("name")+":")]),t._v(" "),s("el-col",{attrs:{span:2,xs:16}},[t._v("\n              "+t._s(e.token)+"\n            ")]),t._v(" "),s("el-col",{attrs:{span:2,xs:8}},[t._v(t._s("可用")+":")]),t._v(" "),s("el-col",{attrs:{span:6,xs:16}},[t._v("\n              "+t._s(e.balance||0)+"\n            ")]),t._v(" "),s("el-col",{attrs:{span:2,xs:8}},[t._v(t._s("锁定: "))]),t._v(" "),s("el-col",{attrs:{span:6,xs:16}},[t._v("\n              "+t._s(e.locked||0)+"\n            ")])],1)],1)})],2):t._e(),t._v(" "),t.addressMsg?s("div",[s("div",{class:{"input-error":t.addressMsg.match("详情")}},[t._v("\n          "+t._s(t.addressMsg)+"\n        ")])]):t._e(),t._v(" "),t._l(t.node,function(e,o){return"address"!=o&&"cwstotal"!=o?s("div",{key:o+0},[e.name?s("el-row"):s("el-row",[s("el-col",{attrs:{span:4,xs:8}},[s("div",[t._v("\n              "+t._s(o)+":\n            ")])]),t._v(" "),s("el-col",{attrs:{span:20,xs:16}},[s("div","serverTime"==o?[t._v("\n              "+t._s(t.moment(+e).format("YYYY-MM-DD HH:mm:ss"))+"\n            ")]:[t._v("\n              "+t._s(e)+"\n            ")])])],1)],1):t._e()}),t._v(" "),s("div",[s("el-row",[s("el-col",{attrs:{span:4,xs:8}},[t._v("\n            address:\n          ")]),t._v(" "),s("el-col",{attrs:{span:20,xs:16}},[t.address?s("div",[s("a",{staticClass:"link",attrs:{href:"javascript:;"},on:{click:t.goToAddress}},[t._v("\n                "+t._s(t.address)+"\n              ")])]):s("div",[s("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.setAddress}},[t._v("去设置")])],1)])],1)],1)],2)]):s("div",{staticClass:"node-info"},[s("h3",{staticStyle:{margin:"10px 0 20px 0"}},[t._v("节点摘要信息")]),t._v(" "),s("p",{staticClass:"input-error",staticStyle:{padding:"10% 0"}},[t._v("没有获取到节点信息")])]),t._v(" "),s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.firstLoading,expression:"firstLoading"}],staticClass:"first-block-info"},[s("h3",[t._v("创世块信息")]),t._v(" "),t.firstBlock.blockHash?s("div",{staticClass:"first-block"},[s("el-row",[s("el-col",{attrs:{span:4}},[t._v("Hash:   ")]),t._v(" "),s("el-col",{attrs:{span:20}},[s("a",{staticClass:"ellipsis block",attrs:{href:"javascript:;",title:"复制Hash"},on:{click:t.copy}},[t._v(t._s(t.firstBlock.blockHash))])])],1),t._v(" "),s("el-row",[s("el-col",{attrs:{span:4}},[t._v("Timestamp:   ")]),t._v(" "),s("el-col",{attrs:{span:20}},[s("a",{staticClass:"ellipsis block",attrs:{href:"javascript:;",title:"复制Hash"},on:{click:t.copy}},[t._v(t._s(t.firstBlock.age))])])],1)],1):s("div",{staticClass:"input-error",staticStyle:{padding:"5% 0"}},[t._v("\n      没有获取到创世块的信息\n    ")])]),t._v(" "),s("el-dialog",{attrs:{"modal-append-to-body":!1,title:"锁定",visible:t.lockVisible,center:""},on:{"update:visible":function(e){t.lockVisible=e},close:t.closeDialog}},[s("div",[s("el-input",{attrs:{clearable:"","auto-complete":"new-password",type:"password",placeholder:"请输入您的密码"},model:{value:t.lockpwd,callback:function(e){t.lockpwd=e},expression:"lockpwd"}}),t._v(" "),s("div",{staticClass:"input-error"},[t._v(t._s(t.lockPwdErr))])],1),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticClass:"btn-block",attrs:{type:"primary"},on:{click:t.lock}},[t._v("确 定")])],1)]),t._v(" "),s("el-dialog",{attrs:{"modal-append-to-body":!1,title:"修改"+t.algorithm+"名称",visible:t.nameModal,center:""},on:{"update:visible":function(e){t.nameModal=e},close:t.closeNameModal}},[s("div",[s("el-input",{attrs:{clearable:"","auto-complete":"new-password",type:"text",placeholder:"请输入新的名称，只能是英文、数字或者—"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),t._v(" "),s("div",{staticClass:"input-error"},[t._v(t._s(t.nameErr))])],1),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticClass:"btn-block",attrs:{type:"primary"},on:{click:t.changeName}},[t._v("确定")])],1)])],1)},staticRenderFns:[]};var c=s("VU/8")(l,r,!1,function(t){s("Ts8t")},null,null);e.default=c.exports}});