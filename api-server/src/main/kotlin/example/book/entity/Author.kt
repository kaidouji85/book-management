package example.book.entity

import example.book.api.AuthorInfo
import example.book.api.PostAuthorInput
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

/**
 * 著者 エンティティ
 */
@Entity
data class Author(
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
fun toAuthor(origin: PostAuthorInput): Author {
    return Author(0, origin.name)
}

/**
 * 著者情報に変換するヘルパー関数
 *
 * @param origin 変換元
 * @return 変換結果
 */
fun toAuthorInfo(origin: Author): AuthorInfo {
    return AuthorInfo(origin.id, origin.name)
}