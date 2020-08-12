package example.book.adapter

import example.book.api.BookData
import example.book.api.BookProps
import example.book.api.InsertBookData
import example.book.api.UpdateBookData
import example.book.entity.AuthorEntity
import example.book.entity.BookEntity
import example.book.validation.Book

/**
 * 書籍エンティティを書籍APIレスポンスに変換する
 * @param origin 変換元
 * @return 変換結果
 */
fun toBookData(origin: BookEntity) = BookData(
        id = origin.id,
        title = origin.title,
        publicationDate = origin.publicationDate,
        isPublished = origin.isPublished,
        author = toAuthorData(origin.author)
)

/**
 * 書籍新規登録API入力から新規登録用の書籍エンティティを生成する
 * @param origin 書籍新規登録API入力
 * @param authorEntity 著者エンティティ
 * @return 生成結果
 */
fun createInsertBookEntity(origin: InsertBookData, authorEntity: AuthorEntity) = BookEntity(
        id=0,
        title = origin.title,
        publicationDate = origin.publicationDate,
        isPublished = origin.isPublished,
        author = authorEntity
)

/**
 * 書籍更新API入力から更新用の書籍エンティティを生成する
 * @param origin 書籍更新API入力
 * @param authorEntity 著者エンティティ
 * @return 生成結果
 */
fun createUpdateBookEntity(origin: UpdateBookData, authorEntity: AuthorEntity) = BookEntity(
        id = origin.id,
        title = origin.title,
        publicationDate = origin.publicationDate,
        isPublished = origin.isPublished,
        author = authorEntity
)

/**
 * API入力データを書籍(バリデーション用)に変換する
 * @param origin 変換元
 * @return 変換結果
 */
fun toBook(origin: BookProps) = Book(
        title = origin.title,
        isPublished = origin.isPublished,
        publicationDate = origin.publicationDate
)

/**
 * 書籍エンティティを書籍(バリデーション用)に変換する
 * @param origin 変換元
 * @return 変換結果
 */
fun toBook(origin: BookEntity) = Book(
        title = origin.title,
        isPublished = origin.isPublished,
        publicationDate = origin.publicationDate
)
