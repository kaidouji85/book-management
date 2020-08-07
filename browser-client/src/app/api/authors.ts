import {getAPIHost} from "./api-host";

/**
 * APIから返される著者情報
 */
export type AuthorInfo = {
  id: number,
  name: string
};

/**
 * 全ての著者情報を取得する
 *
 * @return 著者情報
 */
export async function getAllAuthors(): Promise<AuthorInfo[]> {
  try {
    const resp = await fetch(`http://${getAPIHost()}/authors`);
    const json = resp.json(); //TODO JSONのパース判定を正しく行う
    return json;
  } catch(e) {
    throw e;
  }
}

/**
 * 追加する著者の内容
 */
export type NewAuthorData = {
  name: string
};

/**
 * 著者を追加する
 *
 * @param data 追加するデータ
 */
export async function postAuthor(data: NewAuthorData): Promise<void> {
  try {
    const method = "POST";
    const body = JSON.stringify(data);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    await fetch(`http://${getAPIHost()}/authors`, {method, headers, body});

  } catch(e) {
    throw e;
  }
}