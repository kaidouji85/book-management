package example.book.validation

const val PUBLISHED_TO_UN_PUBLISHED_ERROR = "出版済の書籍は未出版にできません"

fun isPublishedToUnPublishedError(origin: Book, update: Book): ValidationResult {
    if (origin.isPublished && !update.isPublished) return ValidationError(PUBLISHED_TO_UN_PUBLISHED_ERROR)
    return ValidData
}