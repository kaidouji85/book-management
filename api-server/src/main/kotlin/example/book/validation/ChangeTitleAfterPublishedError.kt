package example.book.validation

const val ChangeTitleAfterPublishedError = "出版後にタイトルの変更はできません";

/**
 * 出版後にタイトル変更をするとエラーになる
 * @param origin 既存データ
 * @param update 更新データ
 * @return バリデーション結果
 */
fun isChangeTitleAfterPublishedError(origin: Book, update: Book): ValidationResult {
    if (origin.isPublished && (origin.title != update.title)) return ValidationError(ChangeTitleAfterPublishedError)
    return ValidData
}