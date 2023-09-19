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



  return (
    <GithubContext.Provider value={{
      ...state,
      dispatch
    }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext;