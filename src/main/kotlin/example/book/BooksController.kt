package example.book

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import javax.inject.Inject

@Controller("/books")
class BooksController {
    @Inject
    lateinit var bookRepository: BookRepository

    @Get("/")
    fun index(): Iterable<Book> {
        return bookRepository.findAll()
    }
}