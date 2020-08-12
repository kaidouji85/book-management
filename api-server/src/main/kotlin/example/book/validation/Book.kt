package example.book.validation

import java.time.LocalDate

/**
 * 書籍(バリデーション用)
 * API、RDBでデータを統一する目的で利用する
 */
data class Book (
        val title: String = "",
        val publicationDate: LocalDate = LocalDate.of(2020, 8, 11),
        val isPublished: Boolean = false
)
