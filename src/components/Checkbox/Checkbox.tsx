import { CSSProperties, FC, useCallback } from "react";
import { CheckBoxProps } from "./type";

export const Checkbox: FC<CheckBoxProps> = ({
  prefCode,
  prefName,
  setCheckedPrefCode,
}) => {
  const onChange = useCallback(() => {
    setCheckedPrefCode((code) => {
      if (!code.length) return [prefCode];
      if (code.includes(prefCode))
        return code.filter((num) => num !== prefCode);

      return [...code, prefCode];
    });
  }, [prefCode, setCheckedPrefCode]);

  return (
    <div style={prefectureWrapper}>
      <label htmlFor={String(prefCode)} style={prefectureLabel}>
        <input type="checkbox" id={String(prefCode)} onChange={onChange} />
        {prefName}
      </label>
    </div>
  );
};

const prefectureWrapper: CSSProperties = {
  padding: "10px",
} as const;

const prefectureLabel: CSSProperties = {
  backgroundColor: "gray",
  padding: "8px",
  borderRadius: "25px",
  cursor: "pointer",
} as const;
