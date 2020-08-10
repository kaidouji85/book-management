import {APIDate} from "../api/date";

/**
 * フォームで入力した日付をAPI用日付に変換する
 * 変換できない場合はnullを返す
 * @param origin 変換元
 * @return 変換結果
 */
export function toAPIDate(origin: string): APIDate | null {
  const date = origin.split('-')
    .map(v => Number(v))
    .filter(v => !isNaN(v));
  if (date.length !== 3) {
    return null;
  }

  return date;
}

export function toInputDate(origin: APIDate): string | null {
  if (origin.length !== 3) {
    return null;
  }

  const year = origin[0].toString();
  const month = origin[1].toString().padStart(2, '0');
  const day = origin[2].toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}