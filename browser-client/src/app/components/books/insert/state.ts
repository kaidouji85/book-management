import {AuthorData} from "../../../api/authors";

/**
 * 書籍新規登録 コンポネント ステート
 */
export type BookInsertState = {
  /**
   * 通信中フラグ、trueで通信中
   */
  isLoading: boolean,

  /**
   * 画面に表示するエラーメッセージ
   */
  errorMessage: string | null,

  /**
   * 書籍名
   */
  title: string,

  /**
   * 著者
   */
  authors: AuthorData[],

  /**
   * 選択されている著者ID
   */
  selectedAuthorId: number | null,

  /**
   * 出版日
   * <input type="date">の値をそのままセットする想定
   */
  publicationDate: string,

  /**
   * 出版フラグ、trueで出版したとみなす
   */
  isPublished: boolean
}