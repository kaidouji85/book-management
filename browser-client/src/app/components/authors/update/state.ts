/**
 * 著者編集 コンポネント ステート
 */
export type AuthorUpdateState = {
  /**
   * 通信中フラグ、trueで通信中
   */
  isLoading: boolean,
  /**
   * 著者名
   */
  name: string,
};