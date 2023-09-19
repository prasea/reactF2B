import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
const GithubContext = createContext()
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
export function GithubProvider({ children }) {
  const intialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }
  const [state, dispatch] = useReducer(githubReducer, intialState)
  const setLoading = () => { dispatch({ type: 'SET_LOADING' }) }
  const clearUsers = () => { dispatch({ type: 'CLEAR_USERS' }) }
  // fetchUsers was created only for testing purpose
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text
    });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      method: "GET",
      headers: {
        Authorization: `token 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`
      }
    })
    const data = await response.json();
    dispatch({
      type: 'GET_USERS',
      payload: data
    })
  }
  const getUser = async (login) => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      method: "GET",
      headers: {
        Authorization: `token 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`
      }
    })
    if (response.status === 404)
      window.location = '/notfound'
    else {
      const data = await response.json();
      dispatch({
        type: 'GET_USER',
        payload: data
      })
    }
  }
  const getRepos = async (login) => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users/${login}/repos`, {
      method: "GET",
      headers: {
        Authorization: `token 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`
      }
    })
    if (response.status === 404)
      window.location = '/notfound'
    else {
      const data = await response.json();
      dispatch({
        type: 'GET_REPOS',
        payload: data
      })
    }
  }

  return (
    <GithubContext.Provider value={{
      users: state.users,
      loading: state.loading,
      getUser,
      user: state.user,
      searchUsers,
      getRepos,
      repos: state.repos,
      clearUsers
    }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext;