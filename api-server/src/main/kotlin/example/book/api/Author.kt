package example.book.api

import example.book.domain.Author
import example.book.domain.AuthorProps
import java.util.*

/**
 * ユニークID以外の著者情報
 */
data class AuthorPropData (
        override val name: String
): AuthorProps

/**
 * 著者情報 情報取得、編集などに利用する想定
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
typealias PostAuthorResponse = APIResponseEnvelope<AuthorData>;

/**
 * 著者変種 API レスポンス
 */
typealias PutAuthorResponse = APIResponseEnvelope<AuthorData>;

/**
 * 著者削除 API レスポンス
 */
typealias  DeleteAuthorResponse = APIResponseEnvelope<Long>;
