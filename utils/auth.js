import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

export const setToken = (token) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('token', token)
  Cookie.set('jwt', token)
}

export const removeToken = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('token')
  Cookie.remove('jwt')
}

export const getTokenFromCookie = (req) => {
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) return
  const jwt = jwtCookie.split('=')[1]
  return jwt
}

export const getUserFromToken = (jwt) => {
  return jwtDecode(jwt)
}
