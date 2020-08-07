import {AuthorInfo} from "../../api/authors";

/**
 * 著者管理コンポネント ステート
 */
export type AuthorsState = {
  /**
   * 著者情報
   */
  authors: AuthorInfo[],
};