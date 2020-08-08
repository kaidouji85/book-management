package example.book.api

import example.book.domain.Author
import example.book.domain.Book
import example.book.domain.BookProps
import example.book.entity.AuthorEntity
import example.book.entity.BookEntity
import example.book.entity.toAuthor
import java.util.*

data class PostBookData(
        override val title: String,
        val authorId: Long
):BookProps

/**
 * 書籍 API インタフェース
 */
data class BookData(
        override val id: Long,
        override val title: String,
        override val author: Author
):Book

/**
 * 書籍 全情報取得 API レスポンス
 */
typealias GetAllBooksAPIResponse = APIResponseEnvelope<List<BookData>>

typealias PostBookAPIResponse = APIResponseEnvelope<Optional<BookData>>

/**
 * 書籍エンティティをBookDataに変換する
 * @param origin 変換元
 * @return 変換結果
 */
fun toBookData(origin: BookEntity): BookData {
    val author = toAuthor(origin.author)
    return BookData(origin.id, origin.title, author)
}

fun createNewBookEntity(origin: PostBookData, authorEntity: AuthorEntity): BookEntity {
    return BookEntity(0, origin.title, authorEntity)
}