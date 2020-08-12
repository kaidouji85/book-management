/**
 * API レスポンス エンベロープ
 */
export type APIResponseEnvelope<P> = {
  isSuccess: boolean,
  message: string,
  payload: P
};