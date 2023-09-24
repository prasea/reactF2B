import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';
const GithubContext = createContext();

export function GithubProvider({ children }) {
  const initialState = {
    users: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  const setLoading = () => dispatch({ type: 'SET_LOADING' })
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })

  const searchUsers = async (searchInput) => {
    setLoading();
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/search/users?q=${searchInput}`);
    const { items } = await response.json()
    dispatch({
      type: 'SEARCH_USERS',
      payload: items
    })
  }
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers
      }}
    >
      {children}
    </GithubContext.Provider>
  );
}
export default GithubContext;
