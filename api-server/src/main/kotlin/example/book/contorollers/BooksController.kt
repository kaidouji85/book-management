package example.book.contorollers

import example.book.api.*
import example.book.repository.AuthorRepository
import example.book.repository.BookRepository
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.*
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
    fun insert(@Body data: InsertBookData): HttpResponse<InsertBookAPIResponse> {
        val author = this.authorRepository.findById(data.authorId)
        val resp = author.map {
            val book = createInsertBookEntity(data, it)
            val savedBook = this.bookRepository.save(book)
            val respBook = toBookData(savedBook)
            return@map APIResponseEnvelope(true, "book insert success", Optional.of(respBook))
        }.orElse(APIResponseEnvelope(false, "author not exist", Optional.empty()))
        return HttpResponse.ok(resp)
    }

    @Put("/")
    fun update(@Body data: UpdateBookData): HttpResponse<UpdateBookAPIResponse> {
        val author = this.authorRepository.findById(data.authorId)
        val resp = author.map {
            val book = createUpdateBookEntity(data, it)
            val updatedBook = this.bookRepository.update(book)
            val respBook = toBookData(updatedBook)
            return@map APIResponseEnvelope(true, "book update success", Optional.of(respBook))
        }.orElse(APIResponseEnvelope(false, "author not exist", Optional.empty()))
        return HttpResponse.ok(resp)
    }

    @Delete("/{id}")
    fun delete(@PathVariable id: Long): HttpResponse<DeleteBookAPIResponse> {
        this.bookRepository.deleteById(id)
        val response = APIResponseEnvelope(true, "book delete success", id)
        return HttpResponse.ok(response)
    }
}