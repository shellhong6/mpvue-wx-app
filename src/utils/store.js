// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function spread (map) {
  var result = {}
  Object.keys(map).forEach(function (key) {
    result[key] = function (state) {
      return state[key]
    }
  })
  return result
}

var state = {
  searchStatus: 'normal', // normal, searchtiping, associativing, resulting
  searchHasChosing: false,
  searchInputVal: '',
  searchWord: ''
}

const store = new Vuex.Store({
  state: state,
  mutations: {
    changeSearchStatus: (state, status) => {
      state.searchStatus = status
      if (status === 'resulting') {
        store.commit('changeSearchHasChosing', true)
      }
      if (status === 'normal' || status === 'searchtiping') {
        store.commit('changeSearchHasChosing', false)
      }
    },
    changeSearchHasChosing: (state, status) => {
      state.searchHasChosing = status
    },
    changeSearchInputVal: (state, val) => {
      state.searchInputVal = val
    },
    changeSearchWord: (state, val) => {
      state.searchWord = val
    }
  },
  getters: spread(state)
  // getters: {
  //   searchStatus: (state) => {
  //     return state.searchStatus
  //   },
  //   searchHasChosing: (state) => {
  //     return state.searchStatus
  //   }
  // }
})

export default store
