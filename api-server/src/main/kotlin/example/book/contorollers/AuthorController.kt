package example.book.contorollers

import example.book.api.*
import example.book.api.toAuthorEntity
import example.book.api.toAuthorData
import example.book.repository.AuthorRepository
import example.book.repository.BookRepository
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.*
import java.util.*
import javax.inject.Inject
import javax.transaction.Transactional

/**
 * 著者 API コントローラ
 */
@Controller("/authors")
open class AuthorController {
    @Inject
    lateinit var authorRepository: AuthorRepository

    @Inject
    lateinit var bookRepository: BookRepository

    @Transactional
    @Get("/")
    open fun getAll(): HttpResponse<GetAllAuthorResponse> {
        val authors = authorRepository.findAll()
                .toList()
                .map { toAuthorData(it) }
        val response = GetAllAuthorResponse(true, "get all authors success", authors)
        return HttpResponse.ok(response)
    }

    @Transactional
    @Get("/{id}")
    open fun getById(@PathVariable id: Long): HttpResponse<GetAuthorByIdResponse> {
        val result = this.authorRepository.findById(id)
        val response = result.map {
            val author = toAuthorData(it)
            return@map GetAuthorByIdResponse(true, "get author by id success", Optional.of(author))
        }.orElse(GetAuthorByIdResponse(false, "no exist id", Optional.empty()))
        return HttpResponse.ok(response)
    }

    @Transactional
    @Post("/")
    open fun insert(@Body data: InsertAuthorData): HttpResponse<InsertAuthorResponse> {
        val author = toAuthorEntity(data)
        val savedAuthor = authorRepository.save(author)
        val respAuthor = toAuthorData(savedAuthor)
        val response = InsertAuthorResponse(true, "post author success", respAuthor)
        return HttpResponse.ok(response)
    }

    @Transactional
    @Put("/")
    open fun update(@Body data: AuthorData): HttpResponse<InsertAuthorResponse> {
        val authorEntity = toAuthorEntity(data)
        val savedEntity = this.authorRepository.update(authorEntity)
        val respAuthor = toAuthorData(savedEntity)
        val response = UpdateAuthorResponse(true, "put author success", respAuthor)
        return HttpResponse.ok(response)
    }

    @Transactional
    @Delete("/{id}")
    open fun delete(@PathVariable id: Long): HttpResponse<DeleteAuthorResponse> {
        val deleteAuthor = this.authorRepository.findById(id)
        val response = deleteAuthor.map {author ->
            val authorsBooks = this.bookRepository.findByAuthor(author)
            authorsBooks.forEach { book ->
                this.bookRepository.deleteById(book.id)
            }
            this.authorRepository.deleteById(author.id)
            return@map DeleteAuthorResponse(true, "delete author success", author.id)
        }.orElse(DeleteAuthorResponse(false, "author no exist", id))
        return HttpResponse.ok(response);
    }
}