import { parseResponse } from '~/utils/api'

export const state = () => ({
  images: []
})

export const getters = {
  getImagesByItem: (state) => (id) => {
    var itemImages = state.images.filter(image => image.item_id == id);
    if (itemImages) {
      return itemImages.sort((a, b) => a.index < b.index)
    }
    return []
  }
}

export const mutations = {
  ADD_IMAGE (state, newImage) {
    var found = state.images.find(image => image.id == newImage.id)
    if (!found) {
      state.images.push(newImage)
    }
  },
  ADD_IMAGES (state, newImages) {
    newImages.forEach(newImage => {
      var found = state.images.find(image => image.id == newImage.id)
      if (!found) {
        state.images.push(newImage)
      }
    })
  }
}

export const actions = {
  loadImages({ commit }, itemId) {
    this.$axios('images?item_id=' + itemId)
      .then(({ data }) => {
        var { data: apiData } = parseResponse(data)
        commit('ADD_IMAGES', apiData.images)
      })
      .catch(err => {
        console.log('Can not load images');
      })
  }
}
