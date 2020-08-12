package example.book.validation

import java.time.LocalDate

/**
 * 書籍(バリデーション用)
 * API、RDBでデータを統一する目的で利用する
 */
data class Book (
        /**
         * タイトル
         */
        val title: String = "",

        /**
         * 出版日
         */
        val publicationDate: LocalDate = LocalDate.of(2020, 8, 11),

        /**
         * 出版フラグ、trueで出版済とみなす
         */
        val isPublished: Boolean = false
)
