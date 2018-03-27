import { parseResponse } from '~/utils/api'

export const state = () => ({
  items: []
})

export const getters = {
  items (state, getters, rootState, rootGetters) {
    let user = rootGetters['user/user']
    if (user.id) {
      return state.items.filter(item => item.user_id == user.id)
    }
    return []
  },

  getItemById: (state) => (id) => {
    return state.items.find(item => item.id == id) || {}
  }
}

export const mutations = {
  ADD_ITEM (state, newItem) {
    var found = state.items.find(item => item.id == newItem.id)
    if (!found) {
      state.items.push(newItem)
    }
  },
  ADD_ITEMS (state, newItems) {
    newItems.forEach(newItem => {
      var found = state.items.find(item => item.id == newItem.id)
      if (!found) {
        state.items.push(newItem)
      }
    })
  }
}

export const actions = {
  loadItems ({ commit }) {
    this.$axios('/items')
      .then(({ data }) => {
        var { data: apiData } = data
        commit('ADD_ITEMS', apiData.items)
      })
      .catch(err => {
        console.log('Can not load items.');
      })
  },

  loadItem({ commit }, id) {
    this.$axios('/items/' + id)
      .then(({ data }) => {
        var { data: apiData } = data
        commit('ADD_ITEM', apiData)
      })
      .catch(err => {
        console.log('Can not load item with ID: ' + id);
      })
  }
}
