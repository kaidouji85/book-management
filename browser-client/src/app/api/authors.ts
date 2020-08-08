import {getAPIHost} from "./api-host";
import {APIResponseEnvelope} from "./envelope";

/**
 * APIから返される著者情報
 */
export type AuthorData = {
  id: number,
  name: string
};

/**
 * 全著者情報取得API レスポンス
 */
export type GetAllAuthorsResponse = APIResponseEnvelope<AuthorData[]>;

/**
 * 全著者情報取得API
 * @return 著者情報
 */
export async function getAllAuthors(): Promise<GetAllAuthorsResponse> {
  try {
    const resp = await fetch(`${getAPIHost()}/authors`);
    const json = resp.json(); //TODO JSONのパース判定を正しく行う
    return json;
  } catch(e) {
    throw e;
  }
}

/**
 * 著者情報ID指定取得API レスポンス
 */
export type GetAuthorByIdResponse = APIResponseEnvelope<AuthorData | null>;

/**
 * 著者情報ID指定取得API
 * @param id 著者ID
 * @return 実行結果
 */
export async function getAuthorById(id: number) {
  try {
    const resp = await fetch(`${getAPIHost()}/authors/${id}`);
    const json = resp.json(); //TODO JSONのパース判定を正しく行う
    return json;
  } catch(e) {
    throw e;
  }
}

/**
 * 著者 新規登録 API 入力
 */
export type InsertAuthorData = {
  name: string
};

/**
 * 著者 新規登録 API レスポンス
 */
export type InsertAuthorResponse = APIResponseEnvelope<AuthorData>;

/**
 * 著者 新規登録 API
 * @param data 新規登録するデータ
 * @return 実行結果
 */
export async function insertAuthor(data: InsertAuthorData): Promise<InsertAuthorResponse> {
  try {
    const method = "POST";
    const body = JSON.stringify(data);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const resp = await fetch(`${getAPIHost()}/authors`, {method, headers, body});
    const json = await resp.json(); // TODO JSONのパース判定を正しく行う
    return json;
  } catch(e) {
    throw e;
  }
}

/**
 * 著者 更新 API レスポンス
 */
export type PutAuthorAPIResponse = APIResponseEnvelope<AuthorData>;

/**
 * 著者 更新 API
 * @param data 更新内容
 * @return 実行結果
 */
export async function updateAuthor(data: AuthorData): Promise<PutAuthorAPIResponse> {
  try {
    const method = "PUT";
    const body = JSON.stringify(data);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const resp = await fetch(`${getAPIHost()}/authors`, {method, headers, body});
    const json = await resp.json(); // TODO JSONのパース判定を正しく行う
    return json;
  } catch (e) {
    throw e;
  }
}

/**
 * 著者削除 API レスポンス
 */
export type DeleteAuthorAPIResponse = APIResponseEnvelope<number>;

/**
 * 著者 削除 API
 * @param id 著者ID
 * @return 実行結果
 */
export async function deleteAuthor(id: number): Promise<DeleteAuthorAPIResponse> {
  try {
    const method = "DELETE";
    const resp = await fetch(`${getAPIHost()}/authors/${id}`, {method});
    const json = resp.json(); // TODO JSONのパース判定を正しく行う
    return json;
  } catch(e) {
    throw e;
  }
}