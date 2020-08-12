package example.book.validation

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

class TitleChangeErrorTest {
    /**
     * 出版後 タイトル変更をするとエラー
     */
    @Test
    fun changeTitleAfterPublishedError() {
        val origin = Book(isPublished = true, title="吾輩は猫である")
        val update = Book(title="こころ")
        val actual = isTitleChangeError(origin, update)
        val expected = ValidationError(TITLE_CHANGE_ERROR)
        Assertions.assertEquals(expected, actual)
    }

    /**
     * 出版前 タイトル変更をすると正常
     */
    @Test
    fun changeTitlePrePublishOk() {
        val origin = Book(isPublished = false, title="吾輩は猫である")
        val update = Book(title="こころ")
        val actual = isTitleChangeError(origin, update)
        val expected = ValidData
        Assertions.assertEquals(expected, actual)
    }

    /**
     * 出版後 タイトル変更無しなら正常
     */
    @Test
    fun noChangeTitleAfterPublishedError() {
        val origin = Book(isPublished = true, title="吾輩は猫である")
        val update = Book(title="吾輩は猫である")
        val actual = isTitleChangeError(origin, update)
        val expected = ValidData
        Assertions.assertEquals(expected, actual)
    }

    /**
     * 出版前 タイトル変更無しなら正常
     */
    @Test
    fun noChangeTitlePrePublishedError() {
        val origin = Book(isPublished = false, title="吾輩は猫である")
        val update = Book(title="吾輩は猫である")
        val actual = isTitleChangeError(origin, update)
        val expected = ValidData
        Assertions.assertEquals(expected, actual)
    }
}