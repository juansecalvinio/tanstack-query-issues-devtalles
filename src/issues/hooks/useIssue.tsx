import { useQuery } from "@tanstack/react-query";
import { Issue } from "../interfaces";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";

export const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  await sleep(2);
  const { data } = await githubApi.get(`/issues/${issueNumber}`);
  return data;
};

export const getIssueComments = async (issueNumber: number) => {
  await sleep(2);
  const { data } = await githubApi.get(`/issues/${issueNumber}/comments`);
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(["issue", issueNumber], () =>
    getIssueInfo(issueNumber)
  );

  const issueCommentsQuery = useQuery(
    ["issue", issueNumber, "comments"],
    () => getIssueComments(issueQuery.data!.number),
    // con la prop "enabled" puedo decir que la petición se haga o no
    // y ahi podemos hacer una peticion condicional, dependiendo del resultado
    // de la peticion anterior
    {
      enabled: issueQuery.data !== undefined,
    }
  );

  return {
    issueQuery,
    issueCommentsQuery,
  };
};
