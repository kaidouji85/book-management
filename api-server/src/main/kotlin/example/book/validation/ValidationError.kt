package example.book.validation

/**
 * バリデーションエラー判定結果
 */
data class ValidationError(
        /**
         * エラーか否かのフラグ、trueでエラー
         */
        val isError: Boolean,

        /**
         * エラーメッセージ
         */
        val messages: String
)