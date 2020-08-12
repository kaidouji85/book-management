package example.book.entity

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

/**
 * 著者エンティティ
 */
@Entity
data class AuthorEntity(
        /**
         * ユニークID
         */
        @Id
        @GeneratedValue
        var id: Long,

        /**
         * 著者名
         */
        var name: String
)

