package example.book.validation

/**
 * エラーメッセージ
 */
const val BLANK_TITLE_ERROR = "書籍が空欄だと出版できません";

/**
 * 書籍タイトル空欄エラーチェックを行う
 * @param book チェック対象
 * @return チェック結果
 */
fun isBlankTitleError(book: Book): ValidationResult {
    val isError = book.isPublished && book.title.isEmpty()
    return when {
        isError -> ValidationError(BLANK_TITLE_ERROR)
        else -> ValidData
    }
}