import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '/setpassword',
    component: () => import('@/views/setpassword/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/auth', component: () => import('@/views/auth/index') },
  {
    path: '/',
    component: Layout,
    redirect: '/home/index',
    name: 'Redirect',
    hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/views/home/index')
    }]
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    name: 'Home',
    meta: { title: '主页', icon: ['fas', 'home'] },
    children: [
      {
        path: 'index',
        name: 'HomeIndex',
        component: () => import('@/views/home/index'),
        meta: { title: '主页', icon: ['fas', 'home'] }
      }
    ]
  },

  {
    path: '/summary',
    component: Layout,
    redirect: '/summary/index',
    name: 'Summary',
    meta: { title: '摘要', icon: ['far', 'hourglass'] },
    children: [
      {
        path: 'index',
        name: 'SummaryIndex',
        component: () => import('@/views/summary/index'),
        meta: { title: '摘要信息' }
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/summary/account/index'),
        meta: { title: '账户信息' }
      },
      {
        path: 'network',
        name: 'Network',
        component: () => import('@/views/home/index'),
        meta: { title: 'Net' }
      },
      {
        path: 'start',
        name: 'Start',
        component: () => import('@/views/form/index'),
        meta: { title: '启动' }
      }
    ]
  },
  // {
  //   path: '/dpos',
  //   component: Layout,
  //   name: 'Dpos',
  //   redirect: '/dpos/index',
  //   meta: { title: 'Dpos & Raft', icon: ['far', 'folder'] },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'DposIndex',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Dpos'}
  //     },
  //     {
  //       path: 'nodeaddress',
  //       name: 'NodeAddress',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: '节点地址设置' }
  //     }
  //   ]
  // },
  {
    path: '/mainchain',
    component: Layout,
    name: 'MainChain',
    redirect: '/mainchain/block',
    meta: { title: '主链', icon: ['fas', 'link'] },
    children: [
      // {
      //   path: 'index',
      //   name: 'MainChainIndex',
      //   component: () => import('@/views/form/index'),
      //   meta: { title: '节点最新block信息' }
      // },
      {
        path: 'block',
        name: 'Chain',
        component: () => import('@/views/mainchain/block'),
        meta: { title: 'block信息' }
      },
      {
        path: 'blockinfo',
        name: 'BlockInfo',
        hidden: true,
        component: () => import('@/views/mainchain/blockInfo'),
        meta: { title: '区块详情' }
      },
      {
        path: 'node',
        name: 'Node',
        component: () => import('@/views/mainchain/node'),
        meta: { title: '节点信息' }
      },
      {
        path: 'transaction',
        name: 'Transaction',
        component: () => import('@/views/mainchain/transaction'),
        meta: { title: '交易记录' }
      },
      {
        path: 'transactioninfo',
        name: 'TransactionInfo',
        hidden: true,
        component: () => import('@/views/mainchain/transactioninfo'),
        meta: { title: '交易详情' }
      }
    ]
  },
  {
    path: '/contract',
    component: Layout,
    redirect: '/contract/index',
    name: 'Contract',
    meta: { title: '合约', icon: ['fas', 'book'] },
    children: [
      {
        path: 'index',
        name: 'Erc721',
        component: () => import('@/views/form/index'),
        meta: { title: '发布ERC-721' }
      },
      {
        path: 'erc20',
        name: 'Erc20',
        component: () => import('@/views/form/index'),
        meta: { title: '发布ERC-20' }
      },
      {
        path: 'transfer',
        name: 'Transfer',
        component: () => import('@/views/form/index'),
        meta: { title: '调用合约' }
      }
    ]
  },
  {
    path: '/import',
    component: Layout,
    hidden: true,
    redirect: '/import/index',
    name: 'Import',
    meta: { title: '导入/导出', icon: ['fas', 'sign-in-alt'] },
    children: [
      {
        path: 'index',
        name: 'ImportIndex',
        component: () => import('@/views/import/index'),
        meta: { title: '导入' }
        // meta: { title: 'Import', icon: ['fas', 'sign-in-alt'] }
      },
      {
        path: 'export',
        name: 'Export',
        component: () => import('@/views/export/index'),
        meta: { title: '导出' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

