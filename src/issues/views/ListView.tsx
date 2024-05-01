import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { Loading } from "../../shared/components/Loading";
import { useIssues } from "../hooks";
import { State } from "../interfaces";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesQuery, page, nextPage, prevPage } = useIssues({
    labels: selectedLabels,
    state,
  });

  const onLabelChange = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-3">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <Loading />
        ) : (
          <IssueList
            issues={issuesQuery.data || []}
            state={state}
            onStateChange={(newState) => setState(newState)}
          />
        )}

        <nav className="d-flex mt-3 justify-content-between align-items-center">
          <ul className="pagination w-100 d-flex justify-content-center">
            <li className="page-item">
              <button className="page-link" onClick={prevPage}>
                Prev
              </button>
            </li>
            <li className="page-item">
              <span className="page-link">{page}</span>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={nextPage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="col-4 rounded-2 p-2">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName: string) => onLabelChange(labelName)}
        />
      </div>
    </div>
  );
};
