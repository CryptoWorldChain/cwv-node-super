webpackJsonp([19],{Rrcu:function(o,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var t=e("TIfe"),n={oldpass:"",newpass:"",checkpass:""},a={data:function(){var o=this;return{loginForm:n,loginRules:{oldpass:[{validator:function(o,s,e){s?s.length>20||s.length<6?e("请输入6~20位密码"):e():e("请输入密码")},trigger:"blur"}],newpass:[{validator:function(o,s,e){s?s.length>20||s.length<6?e("请输入6~20位新密码"):e():e("请输入新密码")},trigger:"blur"}],checkpass:[{validator:function(s,e,t){var n=o.loginForm.newpass;e?n!=e?t("两次密码输入不一致"):t():t("请再次输入密码")},trigger:"blur"}]}}},mounted:function(){this.loginForm={oldpass:"",newpass:"",checkpass:""}},methods:{submit:function(){var o=this;this.$refs.loginForm.validate(function(s){if(!s)return console.log("error submit!!"),!1;o.changePassword()})},removeCookies:function(){Object(t.f)(),Object(t.e)(),Object(t.d)()},doSubmit:function(){},changePassword:function(){var o=this;this.$loading();var s=this.loginForm.oldpass,e=this.loginForm.newpass;this.$http.post("/node/man/pbcpw.do",{old:s,new:e}).then(function(s){o.$loading().close(),s&&"1"==s.retCode?(o.removeCookies(),o.$message.success("密码修改成功"),o.$router.push({name:"Login"})):s.retMsg?o.$message.error(s.retMsg+",修改失败，请稍后重试"):o.$message.error("密码修改失败，请稍后重试")}).catch(function(s){o.$loading().close(),o.$message.error("密码修改失败，请稍后重试")})}}},r={render:function(){var o=this,s=o.$createElement,e=o._self._c||s;return e("div",{staticClass:"change-password-container"},[e("div",{staticClass:"change-password"},[e("div",[e("h3",{staticClass:"text-center",staticStyle:{color:"#fff","font-size":"20px"}},[o._v("修改密码")]),o._v(" "),e("div",[e("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:o.loginForm,rules:o.loginRules,"label-position":"left"}},[e("el-form-item",{attrs:{label:"",prop:"oldpass"}},[e("el-input",{attrs:{type:"password",placeholder:"请输入旧密码","auto-complete":"off"},model:{value:o.loginForm.oldpass,callback:function(s){o.$set(o.loginForm,"oldpass",s)},expression:"loginForm.oldpass"}})],1),o._v(" "),e("el-form-item",{attrs:{label:"",prop:"newpass"}},[e("el-input",{attrs:{type:"password",placeholder:"请输入新密码","auto-complete":"off"},model:{value:o.loginForm.newpass,callback:function(s){o.$set(o.loginForm,"newpass",s)},expression:"loginForm.newpass"}})],1),o._v(" "),e("el-form-item",{attrs:{label:"",prop:"checkpass"}},[e("el-input",{attrs:{type:"password",placeholder:"请重复输入密码","auto-complete":"off"},model:{value:o.loginForm.checkpass,callback:function(s){o.$set(o.loginForm,"checkpass",s)},expression:"loginForm.checkpass"}})],1),o._v(" "),e("div",[e("el-button",{staticClass:"btn-block",attrs:{type:"primary"},on:{click:o.submit}},[o._v("确 定")])],1)],1)],1)])])])},staticRenderFns:[]};var l=e("VU/8")(a,r,!1,function(o){e("hQE0")},"data-v-3c8f2492",null);s.default=l.exports},Ys7I:function(o,s,e){(o.exports=e("FZ+f")(!1)).push([o.i,"\n.change-password-container[data-v-3c8f2492] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #2d3a4b;\n}\n.change-password[data-v-3c8f2492] {\n  max-width: 500px;\n  padding: 150px 20px 20px 20px;\n  margin: 0 auto;\n}\n.btn-block[data-v-3c8f2492] {\n  width: 100%;\n  display: block;\n  margin: 0 auto;\n}\n",""])},hQE0:function(o,s,e){var t=e("Ys7I");"string"==typeof t&&(t=[[o.i,t,""]]),t.locals&&(o.exports=t.locals);e("rjj0")("a82f20b8",t,!0)}});