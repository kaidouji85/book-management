package example.book.validation

/**
 * 書籍タイトル空欄エラーチェックを行う
 * @param book チェック対象
 * @return チェック結果
 */
fun isBlankTitleError(book: Book): ValidationError {
    val isError = book.isPublished && book.title.isEmpty()
    val message = when {
        isError -> "エラーですよ"
        else -> ""
    }
    return ValidationError(isError, message)
}