import { DatasetsType, PrefectureObjType } from "./type";
import { DataType } from "@/api/population/type";
import { PrefecturesType } from "@/api/prefectures";
import { getRandomColor } from "@/util/color";

export const genDatasets = (
  data: PrefecturesType,
  populationCompositionList: Array<DataType[] | undefined>,
  checkedPrefCode: number[]
): DatasetsType => {
  const datasets: DatasetsType = [];

  const genPrefectureObj = (i: number): PrefectureObjType => {
    const prefectureObj = { label: "", data: [], borderColor: "" };
    prefectureObj.label = data.result[checkedPrefCode[i] - 1].prefName;

    return prefectureObj;
  };

  populationCompositionList.forEach((compositionList, i) => {
    const arr: number[] = [];
    const obj = genPrefectureObj(i);
    compositionList?.forEach((composition) => {
      arr.push(composition.value);
    });
    obj.data = arr;
    obj.borderColor = getRandomColor();
    datasets.push(obj);
  });

  return datasets;
};
