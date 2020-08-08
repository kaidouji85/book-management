package example.book.api

import java.util.*

/**
 * 著者が持っている属性
 */
interface AuthorProps {
    /**
     * 著者名
     */
    val name: String
}

/**
 * 著者新規登録 API クライアントからの入力
 */
data class PostAuthorInput (
        override val name: String
): AuthorProps

/**
 * 著者情報 情報取得、編集などに利用する想定
 */
data class Author(
        val id: Long,
        override val name: String
): AuthorProps

/**
 * 著者情報取得 API レスポンス
 */
typealias GetAllAuthorResponse = APIResponseEnvelope<List<Author>>

/**
 * 著者情報取得 ID指定 API レスポンス
 */
typealias GetAuthorByIdResponse = APIResponseEnvelope<Optional<Author>>

/**
 * 著者新規登録 API レスポンス
 */
typealias PostAuthorResponse = APIResponseEnvelope<Author>;

/**
 * 著者変種 API レスポンス
 */
typealias PutAuthorResponse = APIResponseEnvelope<Author>;

/**
 * 著者削除 API レスポンス
 */
typealias  DeleteAuthorResponse = APIResponseEnvelope<Long>;
