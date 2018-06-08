<template>
  <div>
    <div>
      <h3 class="title">block 信息</h3>
      <el-table :data="blocks" style="width: 100%">
        <template v-for="(item) in columns">
          <el-table-column
            v-if="item.prop == 'height'"
            :key="item.prop"
            width="150"
            :label="item.label">
            <template slot-scope="scope">
              <router-link class="link" :to="{name:'BlockInfo', query:{height: scope.row.height}}">{{ scope.row.height }}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.prop == 'blockHash'"
            :key="item.prop"
            :label="item.label">
            <template slot-scope="scope">
              <span class="link" @click="detail($event,scope.row)">{{ scope.row.blockHash }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            width="150"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label">
          </el-table-column>
        </template>
      </el-table>
      <div class="pager">
        <div class="pager-inner">
          <el-pagination
            :small="device == 'mobile' ? true : false"
            background
            layout="prev, pager, next"
            :total="totalPage"
            @current-change="pageChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
var columns = [
  {prop: 'height',label: '区块高度'},
  {prop: 'blockHash', label: '区块哈希'},
  {prop: 'age', label: '生成时间'},
  {prop: 'txCount', label: '交易'},
  {prop: 'reward', label: '挖矿奖励'},
]
export default {
  data() {
    return {
      columns,
      data: [],
      loading: null,
      totalPage: 1,
      pageNo: 1,
      pageSize: 10,
      blocks: []
    }
  },
  computed: mapState({
    device: state => {
      return state.app.device;
    }
  }),
  mounted() {
    // this.initData()
    this.initBlocks()
    // this.initLates()
  },
  methods: {
    initData() {
      this.data = [
        {height:222,hash:'0xfjslfje323jdflsfj',age: 'one hour ago', tx:'fjsljfdlsfjsldjfd',reward: 1.32}
      ]
    },
    initBlocks (pageSize,pageNo) {
      this.loading = this.$loading()
      if (!pageSize) {
          pageSize = 10;
      }
      if (!pageNo) {
          pageNo = 1;
      }
      this.$http.post('/block/blk/pbgbb.do',{pageSize,pageNo}).then((res) => {
          this.loading.close()
          if (res.retCode == 1 && res.blocks) {
              this.totalPage = res.totalCount;
              this.blocks = res.blocks.map((item,index)=>{
                  var block = item.header;
                  var now = new Date().getTime();
                  var age = Math.floor((now - block.timestamp)/1000);
                  if (age <= 10) {
                      block.age = age + 's ago';
                  }else {
                      block.age = this.timeago().format(block.timestamp);
                  }
                  block.reward = parseFloat(block.reward) ? parseFloat(block.reward) : 0;
                  return block;
              });
          } else {
            this.$message.error('没有获取到区块');
          }
      }).catch((err) => {
          this.loading.close()
          console.log('errr',err);
          this.$message.error('网络请求错误，请稍后重试');
      })
    },
    pageChange(value) {
      var pageNo = value;
      this.pageNo = pageNo;
      var pageSize = this.pageSize;
      this.initBlocks(pageSize, pageNo)
    },
    initLates() {
      this.$http({
        method:'post',
        url:'/block/blk/pbgtb.do'
      }).then((res) => {
        if (res.retCode == 1 && res.block) {
          console.log('latest --- block',res.block);
          if (res.block.header && res.block.header.height) {
            this.totalPage = res.block.header.height;
          }
        } 
      }).catch((err) => {
        console.warn('err',err);
      })
    },
    detail(e,row) {
      var hash = row.blockHash ? row.blockHash : '';
      if (hash) {
        this.$router.push({
          name:'BlockInfo',
          query: {
            hash
          }
        })
      }
    }
  }
}
</script>

<style>

</style>
