type LabelAndDataType = {
  label: string;
  data: DataType[];
};

export type DataType = {
  year: number;
  value: number;
  rate?: number;
};

export type PopulationCompositionType = {
  boundaryYear: number;
  data: LabelAndDataType[];
};

const isDataType = (mayBeData: unknown): mayBeData is DataType => {
  const d = mayBeData as DataType;

  return (
    typeof d.year === "number" &&
    typeof d.value === "number" &&
    (typeof d.rate === "number" || d.rate === undefined)
  );
};

const isLabelAndDataType = (
  mayBeLabelAndData: unknown
): mayBeLabelAndData is LabelAndDataType => {
  const l = mayBeLabelAndData as LabelAndDataType;

  return (
    typeof l.label === "string" &&
    Array.isArray(l.data) &&
    l.data.every(isDataType)
  );
};

export const isPopulationCompositionType = (
  mayBePopulationComposition: unknown
): mayBePopulationComposition is PopulationCompositionType => {
  const p = mayBePopulationComposition as PopulationCompositionType;

  return (
    typeof p.boundaryYear === "number" &&
    Array.isArray(p.data) &&
    p.data.every(isLabelAndDataType)
  );
};
