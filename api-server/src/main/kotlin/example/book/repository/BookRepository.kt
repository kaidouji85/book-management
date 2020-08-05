package example.book.repository

import example.book.entity.Book
import io.micronaut.data.annotation.*
import io.micronaut.data.repository.CrudRepository

/**
 * 書籍 リポジトリ
 */
@Repository
interface BookRepository : CrudRepository<Book, Long> {
}
