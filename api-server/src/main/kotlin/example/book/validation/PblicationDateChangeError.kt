package example.book.validation

/**
 * 出版日変更エラーメッセージ
 */
const val PUBLICATION_DATE_CHANGE_ERROR = "出版後に出版日の変更はできません"

/**
 * 出版日変更エラーを検知する
 * @param origin 既存データ
 * @param update 更新データ
 * @return バリデーション結果
 */
fun isPublicationDateChangeError(origin: Book, update: Book):  ValidationResult {
    if (origin.isPublished && (!origin.publicationDate.isEqual(update.publicationDate))) return ValidationError(PUBLICATION_DATE_CHANGE_ERROR)
    return ValidData
}