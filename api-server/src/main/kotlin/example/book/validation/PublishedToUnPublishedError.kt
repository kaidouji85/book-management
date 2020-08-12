package example.book.validation

/**
 * 出版済->未出版変更エラーメッセージ
 */
const val PUBLISHED_TO_UN_PUBLISH_ERROR = "出版済の書籍は未出版に戻せません"

/**
 * 出版済->未出版変更エラーを検知する
 * @param origin 既存データ
 * @param update 更新データ
 * @return バリデーション結果
 */
fun isPublishedToUnPublishError(origin: Book, update: Book): ValidationResult {
    if (origin.isPublished && !update.isPublished) return ValidationError(PUBLISHED_TO_UN_PUBLISH_ERROR)
    return ValidData
}