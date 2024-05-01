import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces";
import { sleep } from "../../helpers/sleep";

const getLabels = async (): Promise<Label[]> => {
  await sleep(2);
  const { data: labels } = await githubApi.get<Label[]>(
    "/labels?per_page=100",
    {
      headers: {
        Authorization: null,
      },
    }
  );
  return labels;
};

export const useLabels = () => {
  const labelsQuery = useQuery(["labels"], getLabels, {
    staleTime: 1000 * 60 * 60, // Para calcular 1 hora en milisegundos
    // initialData: setea datos reales para mostrar mientras se hace la petición
    // placeholderData: sirve para mostrar información falsa mientras carga los datos
    // placeholderData: [
    //   {
    //     id: 1205087127,
    //     node_id: "MDU6TGFiZWwxMjA1MDg3MTI3",
    //     url: "https://api.github.com/repos/facebook/react/labels/Component:%20Concurrent%20Features",
    //     name: "Component: Concurrent Features",
    //     color: "ffccd3",
    //     default: false,
    //   },
    // ],
  });
  return { labelsQuery };
};
