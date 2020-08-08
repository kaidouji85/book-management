import {AuthorData} from "../../../api/authors";

/**
 * 書籍新規登録 コンポネント ステート
 */
export type BookInsertState = {
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
}