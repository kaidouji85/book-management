import {getAPIHost} from "./api-host";

/**
 * APIから返される著者情報
 */
export type Author = {
  id: number,
  name: string
};

/**
 * 全ての著者情報を取得する
 *
 * @return 著者情報
 */
export async function fetchAllAuthors(): Promise<Author[]> {
  try {
    const resp = await fetch(`http://${getAPIHost()}/authors`);
    const json = resp.json(); //TODO JSONのパース判定を正しく行う
    return json;
  } catch(e) {
    throw e;
  }
}