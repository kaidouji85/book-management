package example.book.validation

import io.micronaut.test.annotation.MicronautTest
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

@MicronautTest
class BlankTitleErrorTest {
    @Test
    fun normal() {
        val data = Book(title = "", isPublished = true)
        val actual = isBlankTitleError(data)
        val expected = ValidationError(true, BlankTitleErrorMessage)
        Assertions.assertEquals(expected, actual)
    }
}