package example.book.api

import io.micronaut.core.convert.format.Format
import java.time.LocalDate

const val DATE_FORMAT = "yyyy-MM-dd";

/**
 * 書籍 ユニークID以外の固有プロパティ
 */
interface BookProps {
    val title: String
    val publicationDate: LocalDate
    val isPublished: Boolean
}

/**
 * 書籍 新規登録 API 入力
 */
data class InsertBookData(
        override val title: String,
        @Format(DATE_FORMAT)
        override val publicationDate: LocalDate,
        override val isPublished: Boolean,
        val authorId: Long
): BookProps

/**
 * 書籍 更新 API 入力
 */
data class UpdateBookData(
        val id: Long,
        override val title: String,
        @Format(DATE_FORMAT)
        override val publicationDate: LocalDate,
        override val isPublished: Boolean,
        val authorId: Long
): BookProps

/**
 * 書籍APIレスポンス
 */
data class BookData(
        val id: Long,
        override val title: String,
        @Format(DATE_FORMAT)
        override val publicationDate: LocalDate,
        override val isPublished: Boolean,
        val author: AuthorData
): BookProps

/**
 * 書籍検索API レスポンス
 */
typealias GetAllBooksAPIResponse = APIResponseEnvelope<List<BookData>>

/**
 * 書籍取得(ID指定)API レスポンス
 */
typealias GetBookByIdAPIResponse = APIResponseEnvelope<BookData?>

/**
 * 書籍新規登録API レスポンス
 */
typealias InsertBookAPIResponse = APIResponseEnvelope<BookData?>

/**
 * 書籍更新API レスポンス
 */
typealias UpdateBookAPIResponse = APIResponseEnvelope<BookData?>

/**
 * 書籍 削除 API レスポンス
 */
typealias DeleteBookAPIResponse = APIResponseEnvelope<Long>

