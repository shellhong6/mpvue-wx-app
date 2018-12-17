var app = {
  changeSearchStatus: (state, status) => {
    state.searchStatus = status
    if (status === 'normal') {
      app.changeSearchInputPlaceholder(state, Math.random())
    }
    if (status === 'resulting') {
      // app.changeSearchInputVal(state, true)
    }
    if (status === 'normal' || status === 'searchtiping') {
      app.changeSearchInputVal(state, '')
      app.changeSearchHasChosing(state, false)
    }
  },
  changeSearchHasChosing: (state, status) => {
    state.searchHasChosing = status
  },
  changeSearchInputVal: (state, val) => {
    state.searchInputVal = val
  },
  changeSearchInputPlaceholder: (state, val) => {
    state.searchInputPlaceholder = val
  },
  changeSearchWord: (state, val) => {
    state.searchWord = val
    app.changeSearchInputVal(state, val)
  }
}

export default app
