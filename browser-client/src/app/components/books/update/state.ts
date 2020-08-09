import {AuthorData} from "../../../api/authors";

/**
 * 書籍編集 コンポネント ステート
 */
export type BookUpdateState = {
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
};