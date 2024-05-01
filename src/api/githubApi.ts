import axios from "axios";

const access_token =
  "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";

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});
