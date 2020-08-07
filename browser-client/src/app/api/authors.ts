import {getAPIHost} from "./api-host";
import {APIResponseEnvelope} from "./envelope";

/**
 * APIから返される著者情報
 */
export type AuthorInfo = {
  id: number,
  name: string
};

/**
 * 全著者情報取得API レスポンス
 */
export type GetAllAuthorsResponse = APIResponseEnvelope<AuthorInfo[]>;

/**
 * 全著者情報取得API
 *
 * @return 著者情報
 */
export async function getAllAuthors(): Promise<GetAllAuthorsResponse> {
  try {
    const resp = await fetch(`http://${getAPIHost()}/authors`);
    const json = resp.json(); //TODO JSONのパース判定を正しく行う
    return json;
  } catch(e) {
    throw e;
  }
}

/**
 * 著者追加API 入力
 */
export type PostAuthorData = {
  name: string
};

/**
 * 著者追加API レスポンス
 */
export type PostAuthorResponse = APIResponseEnvelope<AuthorInfo>;

/**
 * 著者追加API
 *
 * @param data 追加するデータ
 */
export async function postAuthor(data: PostAuthorData): Promise<PostAuthorResponse> {
  try {
    const method = "POST";
    const body = JSON.stringify(data);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const resp = await fetch(`http://${getAPIHost()}/authors`, {method, headers, body});
    const json = await resp.json(); // TODO JSONのパース判定を正しく行う
    return json;
  } catch(e) {
    throw e;
  }
}

export type DeleteAuthorAPIResponse = APIResponseEnvelope<number>;

export async function deleteAuthor(id: number): Promise<DeleteAuthorAPIResponse> {
  try {
    const method = "DELETE";
    const resp = await fetch(`http://${getAPIHost()}/authors/${id}`, {method});
    const json = resp.json(); // TODO JSONのパース判定を正しく行う
    return json;
  } catch(e) {
    throw e;
  }
}