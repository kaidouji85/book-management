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
