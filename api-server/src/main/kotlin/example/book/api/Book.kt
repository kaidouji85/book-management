package example.book.api

import example.book.domain.Author
import example.book.domain.Book
import example.book.domain.BookProps
import example.book.entity.AuthorEntity
import example.book.entity.BookEntity
import java.util.*

/**
 * 書籍 新規登録 API 入力
 */
data class InsertBookData(
        override val title: String,
        val authorId: Long
):BookProps

/**
 * 書籍 更新 API 入力
 */
data class UpdateBookData(
        val id: Long,
        override val title: String,
        val authorId: Long
):BookProps

/**
 * 書籍 API レスポンス
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

/**
 * 書籍エンティティをBookDataに変換する
 * @param origin 変換元
 * @return 変換結果
 */
fun toBookData(origin: BookEntity): BookData {
    val author = toAuthorData(origin.author)
    return BookData(origin.id, origin.title, author)
}

/**
 * API入力データから新規登録用の書籍エンティティを生成する
 * @param origin API入力データ
 * @param authorEntity 著者エンティティ
 * @return 生成結果
 */
fun createInsertBookEntity(origin: InsertBookData, authorEntity: AuthorEntity): BookEntity {
    return BookEntity(0, origin.title, authorEntity)
}

/**
 * API入力データから更新用の書籍エンティティを生成する
 * @param origin API入力データ
 * @param authorEntity 著者エンティティ
 * @return 生成結果
 */
fun createUpdateBookEntity(origin: UpdateBookData, authorEntity: AuthorEntity): BookEntity {
    return BookEntity(origin.id, origin.title, authorEntity)
}