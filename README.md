## Kotlin + Miconaut 勉強用リポジトリ

## 動かし方(ローカル環境)
### 前提条件
* Dockerがインストールされていること
* Java11以降がインストールされていること

### プログラム本体

```shell script
# DockerからPostgreSQLを起動させる
docker run -d --name postgres -p 5432:5432 -e POSTGRES_USER=predator -e POSTGRES_PASSWORD=predator123 -e POSTGRES_DB=predator postgres

cd <本リポジトリをインストールした場所>
./gradlew run
# ブラウザでhttp://localhost:8080/helloを開く
# ブラウザ上で「Hello World」と表示される
```

### ユニットテスト
```shell script
cd <本リポジトリをインストールした場所>
./gradlew test
```
