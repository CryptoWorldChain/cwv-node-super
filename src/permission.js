import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import { Message } from 'element-ui'
import 'nprogress/nprogress.css'// Progress 进度条样式
// import { Message } from 'element-ui'
import { getToken, getPassword, setPassword } from '@/utils/auth' // 验权
import { checkPassword } from '@/api/login'
const whiteList = ['/login', '/setpassword'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  var token = getToken()
  var isFirstTime = !getPassword()
  function route() {
    token = getToken()
    isFirstTime = !getPassword()
    if (isFirstTime) {
      if (whiteList.indexOf(to.path) !== -1 && to.path.match('setpassword')) {
        NProgress.done()
        next()
      } else {
        next({ path: '/setpassword' })
        NProgress.done()
      }
    } else if (token) {
      if (to.path === '/login' || to.path === '/setpassword') {
        next({ path: '/' })
        NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
      } else {
        NProgress.done()
        store.commit('SET_AVATAR', '/static/img/user/portrait1.jpg')
        store.commit('SET_NAME', 'admin')
        next()
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1 && to.path.match('login')) {
        NProgress.done()
        next()
      } else {
        next('/login')
        NProgress.done()
      }
    }
  }
  NProgress.start()
  if (!isFirstTime) {
    route()
  } else if (to.path.match('auth')) {
    NProgress.done()
    next()
  } else if (to.path.match('404')) {
    NProgress.done()
    next()
  } else {
    checkPassword().then((res) => {
      console.log('res', res)
      if (res.retCode == '1') {
        // setPassword('true')
        NProgress.done()
        route()
      } else if (res.retCode == '-1') {
        setPassword(true)
        NProgress.done()
        route()
      }
    }).catch((err) => {
      console.log('获取是否首次登录失败', err)
      Message.error('服务请求失败，请检查网络或者稍后重试')
      next({
        path: '/auth'
      })
      NProgress.done()
      console.log(to.path)
      if (to.path.match('auth')) {
        NProgress.done()
        next()
      }
    })
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
