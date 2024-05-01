import { FC } from "react";
import { Loading } from "../../shared/components/Loading";
import { useLabels } from "../hooks/useLabels";

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker: FC<Props> = ({ selectedLabels, onChange }) => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return <Loading />;
  }

  return (
    <>
      {labelsQuery.data?.map((label) => (
        <span
          className={`badge rounded-pill m-1 label-picker ${
            selectedLabels.includes(label.name) ? "opacity-100" : "opacity-25"
          }`}
          style={{
            backgroundColor: `#${label.color}`,
            color: "black",
          }}
          key={label.id}
          onClick={() => onChange(label.name)}
        >
          {label.name}
        </span>
      ))}
    </>
  );
};
