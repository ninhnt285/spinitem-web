import { parseResponse } from '~/utils/api'
import { setToken } from '~/utils/auth'

export const state = () => ({
  user: null,
  loginMessage: null,
  registerMessage: null
})

export const getters = {
  user (state) {
    return state.user
  },
  isAuthenticated (state) {
    return !!state.user
  },
  loginMessage (state) {
    return state.loginMessage
  },
  registerMessage (state) {
    return state.registerMessage
  }
}

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null
  },
  SET_LOGIN_MESSAGE (state, msg) {
    state.loginMessage = msg
  },
  SET_REGISTER_MESSAGE(state, msg) {
    state.registerMessage = msg
  }
}

export const actions = {
  login ({ commit }, { email, password }) {
    this.$axios.post('/login', JSON.stringify({ email, password}))
      .then(({ data }) => {
        var { data: apiData } = parseResponse(data)
        var token = apiData.token || ''
        setToken(token)
        this.$axios.setToken(token, 'Bearer')
        return this.$axios('/users/me')
      })
      // Load user
      .then(({ data }) => {
        var { data: apiData } = parseResponse(data)
        commit('SET_USER', apiData)
      })
      .catch(err => {
        var { error: apiError } = parseResponse((err.response || {}).data || {})
        commit('SET_LOGIN_MESSAGE', apiError.message)
      })
  },

  logout ({ commit }) {
    this.$axios.setToken(false)
    commit('SET_USER', null)
  },

  register ({ commit }, { username, email, password }) {
    this.$axios.post('/register', JSON.stringify({ username, email, password}))
      .then(({ data }) => {
        var { data: apiData } = parseResponse(data)
        var token = apiData.token || false
        setToken(token)
        this.$axios.setToken(token, 'Bearer')
        return this.$axios('/users/me')
      })
      // Load user
      .then(({ data }) => {
        var { data: apiData } = parseResponse(data)
        commit('SET_USER', apiData)
      })
      .catch(err => {
        var { error: apiError } = parseResponse((err.response || {}).data || {})
        commit('SET_REGISTER_MESSAGE', apiError.message)
      })
  }
}
