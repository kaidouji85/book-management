import {BookData} from "../../../api/books";
import {AuthorData} from "../../../api/authors";

/**
 * 書籍一覧 ステート
 */
export type BooksState = {
  /**
   * 通信中フラグ、trueで通信中
   */
  isLoading: boolean,

  authors: AuthorData[],

  /**
   * 書籍情報
   */
  books: BookData[],
}