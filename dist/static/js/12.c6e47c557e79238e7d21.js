webpackJsonp([12],{"6f7R":function(n,t,e){var o=e("lkMW");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e("rjj0")("dc84d15a",o,!0)},Il3I:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=[{prop:"node_name",label:"节点名称"},{prop:"uri",label:"节点URI"},{prop:"age",label:"启动时间"},{prop:"recv_cc",label:"接受量"},{prop:"send_cc",label:"发送量"},{prop:"node_idx",label:"节点ID"},{prop:"block_cc",label:"区块数量"},{prop:"status",label:"状态"}],l={data:function(){return{columns:o,data:[],loading:null}},mounted:function(){this.initData()},methods:{initData:function(){var n=this;this.loading=this.$loading(),this.$http.post("/node/adi/pbgns.do").then(function(t){if(n.loading.close(),console.log("节点信息",t),1==t.retCode){var e=n;t.nodes&&t.nodes.length&&(n.data=t.nodes.map(function(n,t){return n.age=e.timeago().format(n.startup_time),n}))}else n.$message.error("获取节点信息出错")}).catch(function(t){n.loading.close(),n.$message.error("获取节点信息出错"),console.log("errr")})}}},a={render:function(){var n=this.$createElement,t=this._self._c||n;return t("div",[t("div",[t("div",[t("h3",{staticClass:"title"},[this._v("节点信息")]),this._v(" "),t("el-table",{attrs:{data:this.data}},this._l(this.columns,function(n){return t("el-table-column",{key:n.prop,attrs:{prop:n.prop,label:n.label}})}))],1)])])},staticRenderFns:[]};var r=e("VU/8")(l,a,!1,function(n){e("6f7R")},null,null);t.default=r.exports},lkMW:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])}});