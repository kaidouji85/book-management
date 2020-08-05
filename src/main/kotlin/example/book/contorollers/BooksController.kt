package example.book.contorollers

import example.book.entity.Book
import example.book.repository.BookRepository
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import javax.inject.Inject

/**
 * 書籍 API コントローラ
 */
@Controller("/books")
class BooksController {
    @Inject
    lateinit var bookRepository: BookRepository

    @Get("/")
    fun index(): Iterable<Book> {
        return bookRepository.findAll()
    }
}