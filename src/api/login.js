import request from '@/utils/request'

export function checkPassword() {
  return request({
    url: '/node/man/pbcia.do',
    method: 'post',
    data: {}
  })
}

export function login(pwd) {
  return request({
    url: '/node/man/pblgi.do',
    method: 'post',
    data: {
      pwd
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/node/man/pbgna.do',
    method: 'post',
    params: { }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
