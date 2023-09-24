import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';
const GithubContext = createContext();

export function GithubProvider({ children }) {
  const initialState = {
    users: [],
    loading: true,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);
  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`);
    const data = await response.json();
    dispatch({
      type: 'GET_USERS',
      payload: data,
    });
  };
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
}
export default GithubContext;
