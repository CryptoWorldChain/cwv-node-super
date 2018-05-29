<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      @open="openSideMenu"
      @select="openSideMenu"
      ref="sideMenu"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    openSideMenu (value) {
      let routes = this.routes;
      let that = this;
      routes.forEach((item) => {
        let key = item.name;
        if (key && key !== value ) {
          that.$refs['sideMenu'].close(key)
        }
      })
    }
  },
  mounted () {
  }
}
</script>
