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
