package example.book.repository

import example.book.entity.AuthorEntity
import io.micronaut.data.annotation.Repository
import io.micronaut.data.repository.CrudRepository

/**
 * 著者 リポジトリ
 */
@Repository
interface AuthorRepository : CrudRepository<AuthorEntity, Long> {
}
