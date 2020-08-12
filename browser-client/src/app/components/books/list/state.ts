import {BookData} from "../../../api/books";
import {AuthorData} from "../../../api/authors";

export type BookSearchCondition = {
  authorId: number | null
};

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


  /**
   * 書籍検索条件
   */
  searchCondition: BookSearchCondition,

  /**
   * 書籍情報
   */
  books: BookData[],
}