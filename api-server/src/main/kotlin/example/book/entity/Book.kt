package example.book.entity

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToOne

/**
 * 書籍
 */
@Entity
data class Book(
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