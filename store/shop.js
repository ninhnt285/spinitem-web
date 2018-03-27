import { parseResponse } from '~/utils/api'

export const state = () => ({
  shops: []
})

export const getters = {
  shops (state) {
    return state.shops
  }
}

export const mutations = {
  ADD_SHOP (state, newShop) {
    var found = state.shops.find(shop => shop.id == newShop.id)
    if (!found) {
      state.shops.push(newShop)
    }
  },
  ADD_SHOPS (state, newShops) {
    newShops.forEach(newShop => {
      var found = state.shops.find(shop => shop.id == newShop.id)
      if (!found) {
        state.shops.push(newShop)
      }
    })
  }
}

export const actions = {
  loadShops ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios('/shops')
        .then(({ data }) => {
          var { data: apiData } = parseResponse(data)
          commit('ADD_SHOPS', apiData.shops)
          resolve(apiData)
        })
        .catch(err => {
          var { error: apiError } = parseResponse((err.response || {}).data || {})
          reject(apiError)
        })
    })
  },
  addShop(context, { platform, key }) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/shops', JSON.stringify({ platform, key}))
        .then(({ data }) => {
          var { data: apiData } = parseResponse(data)
          resolve(apiData)
        })
        .catch(err => {
          var { error: apiError } = parseResponse((err.response || {}).data || {})
          reject(apiError)
        })
    })
  },
  verify(context, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/shops/verify/' + payload.platform, JSON.stringify(payload))
        .then(({ data}) => {
          var { data: apiData } = parseResponse(data)
          resolve(apiData)
        })
        .catch(err => {
          var { error: apiError } = parseResponse((err.response || {}).data || {})
          reject(apiError)
        })
    })
  }
}
