export default ({ store, app: { $axios }}) => {
  if (process.server) return
  let token = window.localStorage.getItem('token')
  if (token) {
    store.$axios.setToken(token, 'Bearer')
  }
}
