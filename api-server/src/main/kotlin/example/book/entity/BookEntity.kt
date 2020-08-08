package example.book.entity

import example.book.api.BookData
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToOne

/**
 * 書籍
 */
@Entity
data class BookEntity(
        /**
         * ユニークID
         */
        @Id
        @GeneratedValue
        var id: Long,

        /**
         * タイトル
         */
        var title: String,

        /**
         * 著者
         */
        @ManyToOne
        var author: AuthorEntity
)