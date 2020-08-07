/**
 * 著者登録 コンポネント ステート
 */
export type AuthorRegisterState = {
  /**
   * 通信中フラグ、trueで通信中
   */
  isLoading: boolean,

  /**
   * 著者名
   */
  name: string
}