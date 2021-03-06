import Cookies from 'js-cookie'

const TokenKey = 'token'
const PasswordKey = 'auth'
const addressKey = 'address'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getPassword() {
  return Cookies.get(PasswordKey)
}

export function setPassword(password) {
  return Cookies.set(PasswordKey, password, {
    expires: 1 / 24
  })
}

export function removePassword() {
  return Cookies.remove(PasswordKey)
}

export function setAddress(address) {
  return Cookies.set(addressKey, address, {
    expires: 1 / 24
  })
}
export function getAddress(address) {
  return Cookies.get(addressKey)
}
export function removeAddress() {
  return Cookies.remove(addressKey)
}
