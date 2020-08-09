package example.book.convert

import example.book.api.BookData
import example.book.api.InsertBookData
import example.book.api.UpdateBookData
import example.book.entity.AuthorEntity
import example.book.entity.BookEntity

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