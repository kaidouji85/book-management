package example.book.validation

const val PastPublicationDateError = "現在設定されている出版日よりも、過去日付には更新できません";

/**
 * 出版日を現在値よりも過去に変更したエラーを検知する
 * @param origin 既存データ
 * @param update 更新内容
 * @return バリデーション結果
 */
fun isPastPublicationDate(origin: Book, update: Book): ValidationResult {
    if (update.publicationDate.isBefore(origin.publicationDate)) return ValidationError(PastPublicationDateError)
    return ValidData
}