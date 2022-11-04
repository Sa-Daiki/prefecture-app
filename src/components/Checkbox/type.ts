import { Dispatch, SetStateAction } from "react";

export type CheckBoxProps = {
  prefCode: number;
  prefName: string;
  setCheckedPrefCode: Dispatch<SetStateAction<number[]>>;
};
