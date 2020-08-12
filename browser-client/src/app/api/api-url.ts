/**
 * APIサーバURLを取得する
 *
 * @return APIサーバURL
 */
export function getAPIURL(): string {
  // TODO 環境変数などでビルド時に任意の値を埋め込めるようにする
  return 'http://localhost:8080';
}
