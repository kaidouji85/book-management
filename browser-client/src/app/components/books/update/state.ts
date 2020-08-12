import {AuthorData} from "../../../api/authors";

/**
 * 書籍編集 コンポネント ステート
 */
export type BookUpdateState = {
  /**
   * 通信中フラグ、trueで通信中
   */
  isLoading: boolean,

  /**
   * エラーメッセージ
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
   * 出版日
   */
  publicationDate: string,

  /**
   * 出版フラグ、trueで出版したとみなす
   */
  isPublished: boolean,

  /**
   * 選択されている著者ID
   */
  selectedAuthorId: number | null,
};