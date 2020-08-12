## Kotlin + Miconaut 勉強用リポジトリ

マイクロサービスを勉強用のリポジトリです。
PostgreSQL + Micronaut(kotlin) + React.jsで書籍管理システムを構築しました。

## システム要件
### 必須ソフトウェア
以下ソフトがインストールされている必要があります。

* Docker 19.03.12以降
* open jdk 11.0.8以降
* kotlin 1.3.72-release-468以降
* node.js v12.18.2以降
* npm 6.14.5以降
* npx 6.14.5以降

### システムが利用するポート
本システムはローカル環境の以下ポート番号を占有します。

* 5432 (PostgreSQL)
* 8080 (APIサーバ)
* 3000 (Webクライアント)

### Docker コンテナ名
本システムでは以下のDockerコンテナ名を利用しています。

* postgres (PostgreSQL)

## プログラム機動方法
### 初回

ターミナルを開いて以下コマンドを実行する
```shell script
docker run -d --name postgres -p 5432:5432 -e POSTGRES_USER=predator -e POSTGRES_PASSWORD=predator123 -e POSTGRES_DB=predator postgres

git clone <本リポジトリ>
cd <本リポジトリをcloneした場所>/api-server
./gradlew clean run
```

新しくターミナルを起動して以下コマンドを実行する
```shell script
cd <本リポジトリをcloneした場所>/browser-client
npm install
npm start
```

Webブラウザで ```localhost:3000```を開く

### 2回目以降
ターミナルを開いて以下コマンドを実行する
```shell script
docker run postgres

cd <本リポジトリをcloneした場所>/api-server
./gradlew clean run
```

新しくターミナルを起動して以下コマンドを実行する
```shell script
cd <本リポジトリをcloneした場所>/browser-client
npm start
```

Webブラウザで ```localhost:3000```を開く

### システム停止方法
ターミナルを開き以下コマンドを実行する
```
docker stop postgres
```

```./gradlew clean run```、```npm start```を実行したターミナルで```Control + C```を入力してプログラムを終了させる

## ユニットテスト実行方法
### APIサーバ

```shell script
cd <本リポジトリをcloneした場所>/api-server
./gradlew clean test
```

## プロジェクト構成

| パス                  | 概要                                     |
|----------------------|------------------------------------------|
| api-server           | APIサーバ プロジェクト                       |
| api-server/src/main  | APIサーバ ソースコード                       |
| api-server/src/test  | APIサーバ ユニットテスト                     |
| browser-client       | ブラウザクライアント プロジェクト              |
| browser-client/src/  | ブラウザクライアント ソースコード              |

## 接続設定

### APIサーバ -> PostgreSQL 接続設定

「api-server/src/main/resources/application.yml」の```datasources```に接続設定が記載されている。
本ファイルを変更するとgit差分が生じるが、現状で回避する手段はない。
以下がデフォルト値である。

```yaml
datasources:
  default:
    url: jdbc:postgresql://localhost:5432/predator?ssl=false
    driverClassName: org.postgresql.Driver
    username: predator
    password: predator123
```

### ブラウザクライアント -> APIサーバ

「browser-client/src/app/api/api-url.ts」にAPIサーバのURLが記載されている。
本ファイルを変更するとgit差分が生じるが、現状で回避する手段はない。
以下がデフォルト値である。

```typescript
/**
 * APIサーバURLを取得する
 *
 * @return APIサーバURL
 */
export function getAPIURL(): string {
  // TODO 環境変数などでビルド時に任意の値を埋め込めるようにする
  return 'http://localhost:8080';
}
```

## 今後の課題

* micronautの設定ファイルの理解を深める
  * 接続設定のハードコーディングはないと感じている
* ブラウザClientのAPIサーバハードコーディングをやめる
  * .env + ビルドで変数埋め込みの仕組みを作りたい
  * create-react-appで用意されているツールがあるなら、それを使いたい
* APIサーバに認証機能を実装する
  * 現状では第三者がAPIを実行し放題
  * AWS API Gatewayなどの外部サービス、またはmicronautのプラグインなどの選択肢を知るところから始めたい
* 全モジュールのコンテナ対応
  * せっかくmicronaut、react.jsを使っているのだから、それぞれマイクロサービス化したい
  * さらにKubernetes、DockerComposeなどで簡単に環境構築できるようになりたい
* micronautでの動的にパラメータが増減する検索の実装方法を考える
  * micronaut-dataに動的にwhereを追加できる機能は提供されていない
  * EntityManagerを直接使うことはできるが実装負荷が高いと感じた
    * 提供されているAPIの自由度は高いが複雑
    * 大量の作り込みが必要となる、バグを埋め込む恐れがある
    * Javaモジュールなので型推論の問題でkotlinから素直に呼べないことが多かった
  * 実行速度を気にしなければ、全件取得してkotlin側でfilterをかける方法もある
  * 本当に速度が必要ならRDBではなくSolrなどの全文