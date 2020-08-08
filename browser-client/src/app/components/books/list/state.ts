import {BookData} from "../../../api/books";

/**
 * 書籍一覧 ステート
 */
export type BooksState = {
  isLoading: boolean,

  /**
   * 書籍情報
   */
  books: BookData[]
}