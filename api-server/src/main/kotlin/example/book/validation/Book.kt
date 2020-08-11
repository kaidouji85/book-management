package example.book.validation

import java.time.LocalDate

interface Book {
    val title: String
    val publicationDate: LocalDate
    val isPublished: Boolean
}
