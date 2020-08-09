package example.book.contorollers

import example.book.api.*
import example.book.repository.AuthorRepository
import example.book.repository.BookRepository
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.*
import java.util.*
import javax.inject.Inject
import javax.transaction.Transactional

/**
 * 書籍 API コントローラ
 */
@Controller("/books")
open class BooksController {
    @Inject
    lateinit var bookRepository: BookRepository

    @Inject
    lateinit var authorRepository: AuthorRepository

    @Transactional
    @Get("/")
    open fun getAll(): HttpResponse<GetAllBooksAPIResponse> {
        val books = bookRepository.findAll()
                .toList()
                .map { toBookData(it) }
        val response = APIResponseEnvelope(true, "get all books success", books)
        return HttpResponse.ok(response)
    }

    @Transactional
    @Get("/{id}")
    open fun getById(@PathVariable id: Long): HttpResponse<GetBookByIdAPIResponse> {
        val book = this.bookRepository.findById(id)
        val resp = book.map {
            val respBook = toBookData(it)
            return@map APIResponseEnvelope(true, "get book by id success", Optional.of(respBook))
        }.orElse(APIResponseEnvelope(true, "get book by id success", Optional.empty()))
        return HttpResponse.ok(resp)
    }

    @Transactional
    @Post("/")
    open fun insert(@Body data: InsertBookData): HttpResponse<InsertBookAPIResponse> {
        val author = this.authorRepository.findById(data.authorId)
        val resp = author.map {
            val book = createInsertBookEntity(data, it)
            val savedBook = this.bookRepository.save(book)
            val respBook = toBookData(savedBook)
            return@map APIResponseEnvelope(true, "book insert success", Optional.of(respBook))
        }.orElse(APIResponseEnvelope(false, "author not exist", Optional.empty()))
        return HttpResponse.ok(resp)
    }

    @Transactional
    @Put("/")
    open fun update(@Body data: UpdateBookData): HttpResponse<UpdateBookAPIResponse> {
        val author = this.authorRepository.findById(data.authorId)
        val resp = author.map {
            val book = createUpdateBookEntity(data, it)
            val updatedBook = this.bookRepository.update(book)
            val respBook = toBookData(updatedBook)
            return@map APIResponseEnvelope(true, "book update success", Optional.of(respBook))
        }.orElse(APIResponseEnvelope(false, "no exist book", Optional.empty()))
        return HttpResponse.ok(resp)
    }

    @Transactional
    @Delete("/{id}")
    open fun delete(@PathVariable id: Long): HttpResponse<DeleteBookAPIResponse> {
        this.bookRepository.deleteById(id)
        val response = APIResponseEnvelope(true, "book delete success", id)
        return HttpResponse.ok(response)
    }
}