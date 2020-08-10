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
   * 選択されている著者ID
   */
  selectedAuthorId: number | null,
};