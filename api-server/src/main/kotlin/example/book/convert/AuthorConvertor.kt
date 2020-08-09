package example.book.convert

import example.book.api.AuthorData
import example.book.api.InsertAuthorData
import example.book.entity.AuthorEntity

/**
 * 著者エンティティに変換するヘルパー関数
 * @param origin 変換元
 * @return 変換結果
 */
fun toAuthorEntity(origin: InsertAuthorData): AuthorEntity {
    return AuthorEntity(0, origin.name)
}

/**
 * APIインタフェースを著者エンティティに変換する
 * @param origin 変換元
 * @return 変換結果
 */
fun toAuthorEntity(origin: AuthorData): AuthorEntity {
    return AuthorEntity(origin.id, origin.name)
}

/**
 * 著者情報に変換するヘルパー関数
 * @param origin 変換元
 * @return 変換結果
 */
fun toAuthorData(origin: AuthorEntity): AuthorData {
    return AuthorData(origin.id, origin.name)
}