package example.book.validation

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import java.time.LocalDate

class PublicationDateChangeErrorTest {
    /**
     * 出版後 出版日変更 ならエラー
     */
    @Test
    fun changePublicationDateAfterPublishedError() {
        val origin = Book(isPublished = true, publicationDate = LocalDate.of(2020, 8, 10))
        val update = Book(publicationDate = LocalDate.of(2020, 8, 30))
        val actual = isPublicationDateChangeError(origin, update)
        val expected = ValidationError(PUBLICATION_DATE_CHANGE_ERROR)
        Assertions.assertEquals(expected, actual)
    }

    /**
     * 出版後 出版日変更無し なら正常
     */
    @Test
    fun noChangePublicationDateAfterPublishedOk() {
        val origin = Book(isPublished = true, publicationDate = LocalDate.of(2020, 8, 10))
        val update = Book(publicationDate = LocalDate.of(2020, 8, 10))
        val actual = isPublicationDateChangeError(origin, update)
        val expected = ValidData
        Assertions.assertEquals(expected, actual)
    }

    /**
     * 出版前 出版日変更 なら正常
     */
    @Test
    fun changePublicationDatePrePublishOk() {
        val origin = Book(isPublished = false, publicationDate = LocalDate.of(2020, 8, 10))
        val update = Book(publicationDate = LocalDate.of(2020, 8, 30))
        val actual = isPublicationDateChangeError(origin, update)
        val expected = ValidData
        Assertions.assertEquals(expected, actual)
    }

    /**
     * 出版前 出版日変更 なら正常
     */
    @Test
    fun noChangePublicationDatePrePublishOk() {
        val origin = Book(isPublished = false, publicationDate = LocalDate.of(2020, 8, 10))
        val update = Book(publicationDate = LocalDate.of(2020, 8, 10))
        val actual = isPublicationDateChangeError(origin, update)
        val expected = ValidData
        Assertions.assertEquals(expected, actual)
    }
}