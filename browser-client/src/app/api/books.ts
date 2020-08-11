import {AuthorData} from "./authors";
import {APIResponseEnvelope} from "./envelope";
import {getAPIHost} from "./api-host";
import {APIDate} from "./date";

/**
 * APIのIN/OUTに利用する書籍データ
 */
export type BookData = {
  id: number,
  title: string,
  publicationDate: APIDate,
  isPublished: boolean,
  author: AuthorData
};

/**
 * 書籍情報取得 API レスポンス
 */
export type GetBooksAPIResponse = APIResponseEnvelope<BookData[]>;

/**
 * 書籍情報取得 API　入力
 */
export type GetBookAPIInput = {
  authorId: number | null
};

/**
 * 書籍情報取得 API
 * @return 実行結果
 */
export async function getBooks(params: GetBookAPIInput): Promise<GetBooksAPIResponse> {
  try {
    const requestParams = new URLSearchParams();
    !!params.authorId && requestParams.append('authorId', params.authorId.toString());
    const resp = await fetch(`${getAPIHost()}/books?${requestParams}`);
    const json = await resp.json(); // TODO JSONのパース判定を正しく行う
    return json;
  } catch (e) {
    throw e;
  }
}

/**
 * 書籍情報取得(ID指定)API レスポンス
 */
export type GetBookByIdAPIResponse = APIResponseEnvelope<BookData>;

/**
 * 書籍情報取得(ID指定)API
 * @param id 書籍ID
 * @return 実行結果
 */
export async function getBookById(id: number): Promise<GetBookByIdAPIResponse> {
  try {
    const resp = await fetch(`${getAPIHost()}/books/${id}`);
    const json = await resp.json(); // TODO JSONのパース判定を正しく行う
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
  publicationDate: APIDate,
  isPublished: boolean,
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

/**
 * 書籍更新API レスポンス
 */
export type UpdateBookAPIResponse = APIResponseEnvelope<BookData>;

/**
 * 書籍更新API 入力データ
 */
export type BookUpdateData = BookInsertData & {
  id: number
};

/**
 * 書籍更新API
 * @param data 更新内容
 */
export async function updateBook(data: BookUpdateData) {
  try {
    const method = "PUT";
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