package example.book.validation

/**
 * 出版後タイトル変更エラーメッセージ
 */
const val TITLE_CHANGE_ERROR = "出版後にタイトルの変更はできません";

/**
 * 出版後タイトル変更エラーを検知する
 * @param origin 既存データ
 * @param update 更新データ
 * @return バリデーション結果
 */
fun isTitleChangeError(origin: Book, update: Book): ValidationResult {
    if (origin.isPublished && (origin.title != update.title)) return ValidationError(TITLE_CHANGE_ERROR)
    return ValidData
}