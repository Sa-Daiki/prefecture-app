import { CheckBoxProps } from "./type";

export const Checkbox = ({
  prefCode,
  prefName,
  setCheckedPrefCode,
}: CheckBoxProps): JSX.Element => {
  const onChange = () => {
    setCheckedPrefCode((code) => {
      if (!code.length) return [prefCode];
      if (code.includes(prefCode))
        return code.filter((num) => num !== prefCode);

      return [...code, prefCode];
    });
  };

  return (
    <label htmlFor={String(prefCode)}>
      {prefName}
      <input type="checkbox" id={String(prefCode)} onChange={onChange} />
    </label>
  );
};
