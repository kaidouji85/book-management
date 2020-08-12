package example.book.repository

import example.book.entity.BookEntity
import io.micronaut.data.annotation.Repository
import io.micronaut.data.repository.CrudRepository

/**
 * 書籍 リポジトリ
 */
@Repository
interface BookRepository : CrudRepository<BookEntity, Long> {
    fun findByAuthorId(authorId: Long): List<BookEntity>
}
