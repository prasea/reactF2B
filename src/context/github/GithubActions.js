import axios from "axios";
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const FINE_GRAINED_GITHUB_TOKEN = "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";
const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${FINE_GRAINED_GITHUB_TOKEN}` }
})
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text
  });
  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
}
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`)
  ])
  return {
    user: user.data,
    repos: repos.data
  }
}
