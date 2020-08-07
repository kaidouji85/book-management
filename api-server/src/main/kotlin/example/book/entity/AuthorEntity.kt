package example.book.entity

import example.book.api.Author
import example.book.api.PostAuthorInput
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

/**
 * 著者 エンティティ
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

/**
 * 著者エンティティに変換するヘルパー関数
 *
 * @param origin 変換元
 * @return 変換結果
 */
fun toAuthorEntity(origin: PostAuthorInput): AuthorEntity {
    return AuthorEntity(0, origin.name)
}

fun toAuthorEntity(origin: Author): AuthorEntity {
    return AuthorEntity(origin.id, origin.name)
}

/**
 * 著者情報に変換するヘルパー関数
 *
 * @param origin 変換元
 * @return 変換結果
 */
fun toAuthor(origin: AuthorEntity): Author {
    return Author(origin.id, origin.name)
}