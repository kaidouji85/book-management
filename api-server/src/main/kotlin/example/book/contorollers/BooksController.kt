package example.book.contorollers

import example.book.api.*
import example.book.repository.AuthorRepository
import example.book.repository.BookRepository
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post
import java.util.*
import javax.inject.Inject

/**
 * 書籍 API コントローラ
 */
@Controller("/books")
class BooksController {
    @Inject
    lateinit var bookRepository: BookRepository

    @Inject
    lateinit var authorRepository: AuthorRepository

    @Get("/")
    fun index(): HttpResponse<GetAllBooksAPIResponse> {
        val books = bookRepository.findAll()
                .toList()
                .map { toBookData(it) }
        val response = APIResponseEnvelope(true, "get all books success", books)
        return HttpResponse.ok(response)
    }

    @Post("/")
    fun post(@Body data: PostBookData): HttpResponse<PostBookAPIResponse> {
        val author = this.authorRepository.findById(data.authorId)
        val resp = author.map {
            val book = createNewBookEntity(data, it)
            val savedBook = this.bookRepository.save(book)
            val respBook = toBookData(savedBook)
            return@map APIResponseEnvelope(true, "book register success", Optional.of(respBook))
        }.orElse(APIResponseEnvelope(false, "author not exist", Optional.empty()))
        return HttpResponse.ok(resp)
    }
}