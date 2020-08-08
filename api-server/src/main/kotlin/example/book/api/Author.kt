package example.book.api

import example.book.domain.Author
import example.book.domain.AuthorProps
import example.book.entity.AuthorEntity
import java.util.*

/**
 * 著者 新規登録 API 入力
 */
data class InsertAuthorData (
        override val name: String
): AuthorProps

/**
 * 著者 API レスポンス
 */
data class AuthorData(
        override val id: Long,
        override val name: String
): Author

/**
 * 著者情報取得 API レスポンス
 */
typealias GetAllAuthorResponse = APIResponseEnvelope<List<AuthorData>>

/**
 * 著者情報取得 ID指定 API レスポンス
 */
typealias GetAuthorByIdResponse = APIResponseEnvelope<Optional<AuthorData>>

/**
 * 著者新規登録 API レスポンス
 */
typealias InsertAuthorResponse = APIResponseEnvelope<AuthorData>

/**
 * 著者変種 API レスポンス
 */
typealias UpdateAuthorResponse = APIResponseEnvelope<AuthorData>

/**
 * 著者削除 API レスポンス
 */
typealias  DeleteAuthorResponse = APIResponseEnvelope<Long>

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