import { useState } from "react";
import { DataType } from "@/api/population/type";

export const useGenLabels = (
  populationCompositionList: Array<DataType[] | undefined>
): number[] => {
  const [labels, setLabels] = useState<number[]>([]);
  if (!labels.length) {
    populationCompositionList.forEach((composition) => {
      composition?.forEach((_, i) => {
        setLabels((prev) => [...prev, composition?.[i].year]);
      });
    });
  }

  return labels;
};
