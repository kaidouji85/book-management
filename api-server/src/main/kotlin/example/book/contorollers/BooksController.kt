package example.book.contorollers

import example.book.api.APIResponseEnvelope
import example.book.api.GetAllBooksAPIResponse
import example.book.api.toBookData
import example.book.repository.BookRepository
import io.micronaut.http.HttpResponse
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
    fun index(): HttpResponse<GetAllBooksAPIResponse> {
        val books = bookRepository.findAll()
                .toList()
                .map { toBookData(it) }
        val response = APIResponseEnvelope(true, "get all books success", books)
        return HttpResponse.ok(response)
    }
}