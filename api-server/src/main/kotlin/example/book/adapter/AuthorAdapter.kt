package example.book.adapter

import example.book.api.AuthorData
import example.book.api.InsertAuthorData
import example.book.entity.AuthorEntity

/**
 * 著者新規登録API入力データを著者エンティティに変換するヘルパー関数
 * @param origin 変換元
 * @return 変換結果
 */
fun toAuthorEntity(origin: InsertAuthorData) = AuthorEntity(
        id = 0,
        name = origin.name
)

/**
 * 著者APIレスポンスを著者エンティティに変換する
 * @param origin 変換元
 * @return 変換結果
 */
fun toAuthorEntity(origin: AuthorData) = AuthorEntity(
        id = origin.id,
        name = origin.name
)

/**
 * 著者エンティティを著者APIレスポンスに変換するヘルパー関数
 * @param origin 変換元
 * @return 変換結果
 */
fun toAuthorData(origin: AuthorEntity) = AuthorData(
        id = origin.id,
        name = origin.name
)