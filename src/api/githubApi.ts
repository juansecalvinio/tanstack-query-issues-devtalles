import axios from "axios";

const access_token = process.env.GITHUB_ACCESS_TOKEN;

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});
