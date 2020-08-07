package example.book.api

/**
 * 著者新規登録API クライアントからの入力
 */
data class PostAuthorInput(
        val name: String
)

/**
 * 著者情報
 */
data class AuthorInfo(
        val id: Long,
        val name: String
)

/**
 * 著者情報取得 API レスポンス
 */
typealias GetAllAuthorResponse = APIResponseEnvelope<List<AuthorInfo>>

/**
 * 著者新規登録 API レスポンス
 */
typealias PostAuthorResponse = APIResponseEnvelope<AuthorInfo>;

/**
 * 著者削除 API レスポンス
 */
typealias  DeleteAuthorResponse = APIResponseEnvelope<Long>;
