package example.book.api

/**
 * 著者 ユニークID以外の属性
 */
interface AuthorProps {
    /**
     * 著者名
     */
    val name: String
}

/**
 * 著者 新規登録 API 入力
 */
data class InsertAuthorData (
        override val name: String
): AuthorProps

/**
 * 著者API レスポンス
 */
data class AuthorData(
        val id: Long,
        override val name: String
): AuthorProps

/**
 * 全著者情報取得API レスポンス
 */
typealias GetAllAuthorResponse = APIResponseEnvelope<List<AuthorData>>

/**
 * 著者情報取得(ID指定)API レスポンス
 */
typealias GetAuthorByIdResponse = APIResponseEnvelope<AuthorData?>

/**
 * 著者新規登録API レスポンス
 */
typealias InsertAuthorResponse = APIResponseEnvelope<AuthorData>

/**
 * 著者更新API レスポンス
 */
typealias UpdateAuthorResponse = APIResponseEnvelope<AuthorData>

/**
 * 著者削除API レスポンス
 */
typealias  DeleteAuthorResponse = APIResponseEnvelope<Long>

