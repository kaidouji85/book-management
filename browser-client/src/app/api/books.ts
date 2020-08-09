import {AuthorData} from "./authors";
import {APIResponseEnvelope} from "./envelope";
import {getAPIHost} from "./api-host";

/**
 * APIのIN/OUTに利用する書籍データ
 */
export type BookData = {
  id: number,
  title: string,
  author: AuthorData
};

/**
 * 全書籍情報取得 API レスポンス
 */
export type GetAllBooksAPIResponse = APIResponseEnvelope<BookData[]>;

/**
 * 全書籍情報取得 API
 * @return 実行結果
 */
export async function getAllBooks(): Promise<GetAllBooksAPIResponse> {
  try {
    const resp = await fetch(`${getAPIHost()}/books`);
    const json = await resp.json();
    return json;
  } catch (e) {
    throw e;
  }
}

/**
 * 書籍新規登録 API 入力データ
 */
export type BookInsertData = {
  title: string,
  authorId: number,
};

/**
 * 書籍新規登録 API レスポンス
 */
export type InsertBookAPIResponse = APIResponseEnvelope<BookData>;

/**
 * 書籍新規登録 API
 * @param data 入力データ
 * @return 実行結果
 */
export async function insertBook(data: BookInsertData): Promise<InsertBookAPIResponse> {
  try {
    const method = "POST";
    const body = JSON.stringify(data);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const resp = await fetch(`${getAPIHost()}/books`, {method, headers, body});
    const json = await resp.json(); // TODO JSONのパース判定を正しく行う
    return json;
  } catch(e) {
    throw e;
  }
}

/**
 * 書籍削除 API レスポンス
 */
export type DeleteBookAPIResponse = APIResponseEnvelope<number>;

/**
 * 書籍削除 API
 * @param id 削除する書籍ID
 * @return 実行結果
 */
export async function deleteBook(id: number): Promise<DeleteBookAPIResponse> {
  try {
    const method = "DELETE";
    const resp = await fetch(`${getAPIHost()}/books/${id}`, {method});
    const json = await resp.json(); // TODO JSONのパース判定を正しく行う
    return json;
  } catch (e) {
    throw e;
  }
}