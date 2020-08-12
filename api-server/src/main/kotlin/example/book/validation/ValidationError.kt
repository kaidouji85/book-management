package example.book.validation

/**
 * バリデーション結果
 */
interface ValidationResult

/**
 * 正常データ
 */
object ValidData: ValidationResult

/**
 * バリデーションエラー
 */
data class ValidationError(
        /**
         * エラーメッセージ
         */
        val messages: String
): ValidationResult