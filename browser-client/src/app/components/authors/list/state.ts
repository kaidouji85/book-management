import {AuthorInfo} from "../../../api/authors";

/**
 * 著者管理コンポネント ステート
 */
export type AuthorsState = {
  /**
   * 通信中であるか否かのフラグ、trueで通信中
   */
  isLoading: boolean
  /**
   * 著者情報
   */
  authors: AuthorInfo[],
};