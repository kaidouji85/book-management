package example.book.api

import java.util.*

/**
 * 書籍 ユニークID以外の固有プロパティ
 */
interface BookProps {
    val title: String
}

/**
 * 書籍 新規登録 API 入力
 */
data class InsertBookData(
        override val title: String,
        val authorId: Long
): BookProps

/**
 * 書籍 更新 API 入力
 */
data class UpdateBookData(
        val id: Long,
        override val title: String,
        val authorId: Long
): BookProps

/**
 * 書籍 API レスポンス
 */
data class BookData(
        val id: Long,
        override val title: String,
        val author: AuthorData
): BookProps

/**
 * 書籍 全情報取得 API レスポンス
 */
typealias GetAllBooksAPIResponse = APIResponseEnvelope<List<BookData>>

/**
 * 書籍 ID指定取得 API レスポンス
 */
typealias GetBookByIdAPIResponse = APIResponseEnvelope<Optional<BookData>>

/**
 * 書籍 新規登録 API レスポンス
 */
typealias InsertBookAPIResponse = APIResponseEnvelope<Optional<BookData>>

/**
 * 書籍 更新 API レスポンス
 */
typealias UpdateBookAPIResponse = APIResponseEnvelope<Optional<BookData>>

/**
 * 書籍 削除 API レスポンス
 */
typealias DeleteBookAPIResponse = APIResponseEnvelope<Long>

