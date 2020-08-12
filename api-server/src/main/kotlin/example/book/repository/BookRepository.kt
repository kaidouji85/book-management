package example.book.repository

import example.book.entity.BookEntity
import io.micronaut.data.annotation.Repository
import io.micronaut.data.repository.CrudRepository

/**
 * 書籍リポジトリ
 */
@Repository
interface BookRepository : CrudRepository<BookEntity, Long> {
    /**
     * 著者ID指定で書籍を検索する
     * @param authorId 著者ID
     * @return 検索結果
     */
    fun findByAuthorId(authorId: Long): List<BookEntity>
}
