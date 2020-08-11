package example.book.entity

import java.time.LocalDate
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
        var author: AuthorEntity,

        /**
         * 出版日
         */
        var publicationDate: LocalDate,

        /**
         * 出版フラグ、trueで出版された
         */
        var isPublished: Boolean
)