package example.book.repository

import example.book.entity.AuthorEntity
import example.book.entity.BookEntity
import io.micronaut.data.annotation.*
import io.micronaut.data.repository.CrudRepository

/**
 * 書籍 リポジトリ
 */
@Repository
interface BookRepository : CrudRepository<BookEntity, Long> {
    fun findByAuthor(author: AuthorEntity): List<BookEntity>
    fun findByAuthorId(authorId: Long): List<BookEntity>
}
