import { PrefecturesType } from "@/api/prefectures";

export type ChartProps = {
  data: PrefecturesType;
  checkedPrefCode: number[];
};

export type PrefectureObjType = {
  label: string;
  data: number[];
  borderColor: string;
};

export type DatasetsType = Array<{
  label: string;
  data: number[];
  borderColor: string;
}>;
