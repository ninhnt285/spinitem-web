import { getTokenFromCookie } from '~/utils/auth'
import { parseResponse } from '~/utils/api'

export const state = () => ({
  visibleHeader: false
})

export const mutations = {
  toggle (state, key) {
    state[key] = !state[key]
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    var token = getTokenFromCookie(req);
    if (!token) return
    this.$axios.setToken(token, 'Bearer');
    // Get user
    try {
      var { data } = await this.$axios('/users/me')
      var { data: user } = parseResponse(data)
      commit('user/SET_USER', user)
    } catch (err) {}
  }
}
