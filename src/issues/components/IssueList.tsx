import { FC } from "react";
import { Issue, State } from "../interfaces";
import { IssueItem } from "./IssueItem";

interface Props {
  issues: Issue[];
  state?: State;
  onStateChange: (state?: State) => void;
}

export const IssueList: FC<Props> = ({ issues, state, onStateChange }) => {
  return (
    <div className="card border-white">
      <div className="card-header border-bottom-0">
        <ul className="nav nav-pills card-header-pills mb-3">
          <li className="nav-item">
            <a
              className={`nav-link ${!state ? "active" : ""}`}
              onClick={() => onStateChange()}
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${state === State.Open ? "active" : ""}`}
              onClick={() => onStateChange(State.Open)}
            >
              Open
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${state === State.Closed ? "active" : ""}`}
              onClick={() => onStateChange(State.Closed)}
            >
              Closed
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body text-dark shadow-sm rounded-3 border-2 border-dark">
        {issues.map((issue) => (
          <IssueItem issue={issue} key={issue.id} />
        ))}
      </div>
    </div>
  );
};
