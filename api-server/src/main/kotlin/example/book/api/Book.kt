package example.book.api

import example.book.domain.Author
import example.book.domain.Book
import example.book.domain.BookProps
import example.book.entity.BookEntity
import example.book.entity.toAuthor

/**
 * 書籍 API インタフェース
 * 新規登録などユニークIDが不要な場合には本クラスを利用する
 */
data class BookPropsData(
        override val name: String,
        override val author: Author
): BookProps

/**
 * 書籍 API インタフェース
 */
data class BookData(
        override val id: Long,
        override val name: String,
        override val author: Author
):Book

typealias GetAllBooksAPIResponse = APIResponseEnvelope<List<BookData>>

fun toBookData(origin: BookEntity): BookData {
    val author = toAuthor(origin.author)
    return BookData(origin.id, origin.title, author)
}