package example.book.validation

import io.micronaut.test.annotation.MicronautTest
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

@MicronautTest
class PublishedToUnPublishedErrorTest {
    /**
     * 出版済 -> 未出版 に変更しようとするとエラーになる
     */
    @Test
    fun publishedToUnPublishedError() {
        val origin = Book(isPublished = true)
        val update = Book(isPublished = false)
        val actual = isPublishedToUnPublishedError(origin, update)
        val expected = ValidationError(PUBLISHED_TO_UN_PUBLISHED_ERROR)
        Assertions.assertEquals(expected, actual)
    }

    /**
     * 未出版 -> 出版済 は正常
     */
    @Test
    fun unPublishedToPublishedOK() {
        val origin = Book(isPublished = false)
        val update = Book(isPublished = true)
        val actual = isPublishedToUnPublishedError(origin, update)
        val expected = ValidData
        Assertions.assertEquals(expected, actual)
    }

    /**
     * 出版済 -> 出版済 は正常
     */
    @Test
    fun publishedToPublishedOk() {
        val origin = Book(isPublished = true)
        val update = Book(isPublished = true)
        val actual = isPublishedToUnPublishedError(origin, update)
        val expected = ValidData
        Assertions.assertEquals(expected, actual)
    }

    /**
     * 未出版 -> 未出版 は正常
     */
    @Test
    fun unPublishedToUnPublishedOK() {
        val origin = Book(isPublished = false)
        val update = Book(isPublished = false)
        val actual = isPublishedToUnPublishedError(origin, update)
        val expected = ValidData
        Assertions.assertEquals(expected, actual)
    }
}