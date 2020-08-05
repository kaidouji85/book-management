package example.book.repository

import example.book.entity.Author
import io.micronaut.data.annotation.*
import io.micronaut.data.repository.CrudRepository

/**
 * 著者 リポジトリ
 */
@Repository
interface AuthorRepository : CrudRepository<Author, Long> {
}
