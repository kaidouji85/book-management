package example.book.validation

/**
 * バリデーション結果をまとめるインタフェース
 */
interface ValidationResult

/**
 * バリデーションエラーなし
 */
object ValidData: ValidationResult

/**
 * バリデーションエラー判定結果
 */
data class ValidationError(
        /**
         * エラーメッセージ
         */
        val messages: String
): ValidationResult