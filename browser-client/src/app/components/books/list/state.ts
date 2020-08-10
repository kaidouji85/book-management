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

  /**
   * 著者情報
   */
  authors: AuthorData[],

  selectedAuthorId: number | null,

  /**
   * 書籍情報
   */
  books: BookData[],
}