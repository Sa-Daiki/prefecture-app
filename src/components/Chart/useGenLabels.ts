import { useState } from "react";
import { DataType } from "@/api/population/type";

export const useGenLabels = (
  populationCompositionList: Array<DataType[] | undefined>
): number[] => {
  const [labels, setLabels] = useState<number[]>([]);
  if (!labels.length) {
    populationCompositionList.forEach((elem) => {
      elem?.forEach((_, i) => {
        setLabels((prev) => [...prev, elem?.[i].year]);
      });
    });
  }

  return labels;
};
