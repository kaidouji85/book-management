package example.book.validation

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import java.time.LocalDate

class PastPublicationDateErrorTest {

    /**
     * 過去の出版日に更新するとエラーになる
     */
    @Test
    fun pastDateUpdateError() {
        val origin = Book(publicationDate = LocalDate.of(2020, 10, 11))
        val update = Book(publicationDate = LocalDate.of(2020, 10, 9))
        val actual = isPastPublicationDate(origin, update)
        val expected = ValidationError(PastPublicationDateError)
        Assertions.assertEquals(expected, actual)
    }

    /**
     * 日付変更がない時は正常
     */
    @Test
    fun noChangeOk() {
        val origin = Book(publicationDate = LocalDate.of(2020, 10, 11))
        val update = Book(publicationDate = LocalDate.of(2020, 10, 11))
        val actual = isPastPublicationDate(origin, update)
        val expected = ValidData
        Assertions.assertEquals(expected, actual)
    }

    /**
     * 未来日付への変更は正常
     */
    @Test
    fun futureDateUpdateOk() {
        val origin = Book(publicationDate = LocalDate.of(2020, 10, 11))
        val update = Book(publicationDate = LocalDate.of(2020, 12, 1))
        val actual = isPastPublicationDate(origin, update)
        val expected = ValidData
        Assertions.assertEquals(expected, actual)
    }
}