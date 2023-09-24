const githubReducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    case 'SEARCH_USER':
      return {
        ...state,
        user: action.payload,
        loading: false
      }
    case 'CLEAR_USERS':
      return {
        ...state,
        users: []
      }
    case 'SET_Loading':
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
export default githubReducer