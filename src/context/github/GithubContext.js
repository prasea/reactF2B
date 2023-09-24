import { createContext, useState } from "react";
const GithubContext = createContext();

export function GithubProvider({ children }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: 'token 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'
      }
    });
    const data = await response.json();
    setUsers(data)
    setLoading(false)
  }
  return <GithubContext.Provider value={{ users, loading, fetchUsers }}>
    {children}
  </GithubContext.Provider>
}
export default GithubContext