package example.book.api

import io.micronaut.core.convert.format.Format
import java.time.LocalDate

/**
 * 書籍ユニークID以外の固有プロパティ
 */
interface BookProps {
    /**
     * タイトル
     */
    val title: String

    /**
     * 出版日
     */
    val publicationDate: LocalDate

    /**
     * 出版フラグ、trueで出版されたとみなす
     */
    val isPublished: Boolean
}

/**
 * 書籍新規登録API入力
 */
data class InsertBookData(
        /**
         * 著者ID
         */
        val authorId: Long,

        override val title: String,
        @Format(DATE_FORMAT)
        override val publicationDate: LocalDate,
        override val isPublished: Boolean
): BookProps

/**
 * 書籍更新API入力
 */
data class UpdateBookData(
        /**
         * 書籍ID
         */
        val id: Long,

        /**
         * 著者ID
         */
        val authorId: Long,

        override val title: String,
        @Format(DATE_FORMAT)
        override val publicationDate: LocalDate,
        override val isPublished: Boolean
): BookProps

/**
 * 書籍APIレスポンス
 */
data class BookData(
        /**
         * 書籍ID
         */
        val id: Long,

        /**
         * 著者ID
         */
        val author: AuthorData,

        override val title: String,
        @Format(DATE_FORMAT)
        override val publicationDate: LocalDate,
        override val isPublished: Boolean
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

