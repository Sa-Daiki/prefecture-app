export type PrefectureType = {
  prefCode: number;
  prefName: string;
};

export type PrefecturesType = {
  message: null;
  result: PrefectureType[];
};

export const isPrefectureType = (
  prefecture: unknown
): prefecture is PrefectureType => {
  const _prefecture = prefecture as PrefectureType;

  return (
    typeof _prefecture.prefCode === "number" &&
    typeof _prefecture.prefName === "string"
  );
};

export const isPrefecturesType = (
  prefectures: unknown
): prefectures is PrefecturesType => {
  const _prefectures = prefectures as PrefecturesType;

  return (
    _prefectures.message === null &&
    Array.isArray(_prefectures.result) &&
    _prefectures.result.every(isPrefectureType)
  );
};
