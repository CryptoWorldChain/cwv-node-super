webpackJsonp([13],{"+V8b":function(e,t,s){var a=s("lYh4");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);s("rjj0")("60f85d46",a,!0)},lYh4:function(e,t,s){(e.exports=s("FZ+f")(!1)).push([e.i,"\n.upload-keystore .el-upload {\n  display: block;\n}\n",""])},p39Y:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("TIfe"),o={data:function(){return{keystore:"",pwd:"",repeatpwd:"",netAddress:"",localAddress:"",loading:null,keystoreVisible:!1,action:"/action"}},mounted:function(){this.init()},methods:{init:function(){this.localAddress=Object(a.a)(),this.getaddress()},getaddress:function(){var e=this;Object(a.a)()||(this.loading=this.$loading(),this.$http.post("/node/man/pbgna.do",{}).then(function(t){e.loading.close(),"1"==t.retCode&&(t.address?(Object(a.g)(t.address),e.netAddress=t.address):Object(a.d)())}).catch(function(t){e.$message.error("网络请求错误"),e.loading.close()}))},beforeUpload:function(e){var t=this;if(!e.name.match(/\.keystore$/i))return t.$message.error("请选择后缀名为keystore的文件"),!1;if("function"==typeof FileReader){var s=new FileReader;s.onload=function(e){e.target.result&&(t.keystore=e.target.result)},s.onerror=function(e){t.$message.error("文件读取错误，请稍后重试")},s.readAsText(e)}else this.$message.warning("请使用chrome,firefox等现代浏览器");return!1},createAccount:function(){var e=this,t=this.pwd.trim(),s=this.repeatpwd.trim(),a=this.keystore.trim();return a?t?t.match(/^.{6,20}$/)?t!==s?(this.$message.warning("两次密码输入不一致"),!1):(this.loading=this.$loading(),void this.$http.post("/node/man/pbsna.do",{pwd:t,keyStoreJsonStr:a}).then(function(t){e.loading.close(),"1"==t.retCode?e.$message.success("导入账户成功"):t.retMsg&&e.$message.error(t.retMsg+",导入失败")}).catch(function(t){e.loading.close(),e.$message.error("导入失败，请稍后重试")})):(this.$message.warning("请输入6～20位密码"),!1):(this.$message.warning("请输入您的密码"),!1):(this.$message.warning("请输入您需要导入的信息"),!1)}}},r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",[s("h3",{staticClass:"title"},[e._v("\n      导入keystore\n    ")]),e._v(" "),e.localAddress||e.netAddress?s("div",[s("h4",{staticStyle:{padding:"20px 0"}},[e._v("您已经设置过账户,"),s("router-link",{staticStyle:{color:"#409EFF"},attrs:{to:{name:"Account"}}},[e._v("查看账户")])],1)]):s("el-row",[s("el-col",{attrs:{span:12,xs:24}},[s("div",{staticStyle:{margin:"20px 0"}},[s("el-input",{attrs:{type:"textarea",autosize:{minRows:12,maxRows:20},placeholder:"手动输入或者导入keystore文件"},model:{value:e.keystore,callback:function(t){e.keystore=t},expression:"keystore"}}),e._v(" "),s("div",{staticStyle:{margin:"10px 0"}},[s("el-upload",{staticClass:"upload-keystore",attrs:{"before-upload":e.beforeUpload,action:e.action}},[s("el-card",[s("el-button",{staticClass:"import-account",attrs:{size:"mini",type:"primary",icon:"el-icon-edit-outline"}},[e._v("导入keystore")])],1)],1)],1),e._v(" "),s("el-input",{staticStyle:{margin:"20px 0"},attrs:{type:"password",placeholder:"请输入您的密码","auto-complete":"new-password"},model:{value:e.pwd,callback:function(t){e.pwd=t},expression:"pwd"}}),e._v(" "),s("el-input",{staticStyle:{"margin-bottom":"20px"},attrs:{type:"password",placeholder:"请再次输入您的密码","auto-complete":"new-password"},model:{value:e.repeatpwd,callback:function(t){e.repeatpwd=t},expression:"repeatpwd"}})],1),e._v(" "),s("el-button",{staticClass:"btn-block",staticStyle:{margin:"30px 0"},attrs:{type:"primary",size:"mini"},on:{click:e.createAccount}},[e._v("导入")])],1)],1)],1)])},staticRenderFns:[]};var n=s("VU/8")(o,r,!1,function(e){s("+V8b")},null,null);t.default=n.exports}});