package example.book.validation

/**
 * エラ〜メッセージ
 */
const val PublishedToUnPublishError = "出版済の書籍は未出版にできません"

/**
 * 出版済 -> 未出版 のエラーチェック
 *
 * @param origin 既存データ
 * @param update 更新データ
 * @return バリデーション結果
 */
fun isPublishedToUnPublishedError(origin: Book, update: Book): ValidationResult {
    if (origin.isPublished && !update.isPublished) return ValidationError(PublishedToUnPublishError)
    return ValidData
}