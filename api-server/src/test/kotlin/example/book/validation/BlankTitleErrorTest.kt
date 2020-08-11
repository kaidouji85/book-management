package example.book.validation

import io.micronaut.test.annotation.MicronautTest
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

/**
 * テストデータ タイトル 空欄
 */
const val BLANK_TITLE = "";

/**
 * テストデータ タイトル 空欄でない
 */
const val NOT_BLANK_TITLE = "空欄でないタイトル";

@MicronautTest
class BlankTitleErrorTest {
    /**
     * 出版済みの書籍はタイトル空欄だとエラーになる
     */
    @Test
    fun testPublishedBookNoBlankTitle() {
        val data = Book(title = BLANK_TITLE, isPublished = true)
        val actual = isBlankTitleError(data)
        val expected = ValidationError(true, BlankTitleErrorMessage)
        Assertions.assertEquals(expected, actual)
    }

    @Test
    fun testPublishedBookNoBlankTitleOk() {
        val data = Book(title = NOT_BLANK_TITLE, isPublished = true)
        val actual = isBlankTitleError(data)
        val expected = ValidationError(false, "")
        Assertions.assertEquals(expected, actual)
    }

    /**
     * 未出版の書籍ならタイトルが空欄でも問題ない
     */
    @Test
    fun testNoPublishedBookBlankTitleOk() {
        val data = Book(title = BLANK_TITLE, isPublished = false)
        val actual = isBlankTitleError(data)
        val expected = ValidationError(false, "")
        Assertions.assertEquals(expected, actual)
    }

    @Test
    fun testNoPublishedBookNotBlankTitleOk () {
        val data = Book(title = NOT_BLANK_TITLE, isPublished = false)
        val actual = isBlankTitleError(data)
        val expected = ValidationError(false, "")
        Assertions.assertEquals(expected, actual)
    }
}