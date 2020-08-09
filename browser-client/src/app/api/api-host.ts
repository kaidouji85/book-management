/**
 * APIサーバのホスト名を取得する
 *
 * @return authors
 */
export function getAPIHost(): string {
  // TODO 環境変数などでビルド時に任意の値を埋め込めるようにする
  return 'http://localhost:8080';
}
