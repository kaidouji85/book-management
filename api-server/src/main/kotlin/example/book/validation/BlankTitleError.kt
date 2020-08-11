package example.book.validation

const val BlankTitleErrorMessage = "書籍が空欄だと出版できません";

/**
 * 書籍タイトル空欄エラーチェックを行う
 * @param book チェック対象
 * @return チェック結果
 */
fun isBlankTitleError(book: Book): ValidationError {
    val isError = book.isPublished && book.title.isEmpty()
    val message = when {
        isError -> BlankTitleErrorMessage
        else -> ""
    }
    return ValidationError(isError, message)
}