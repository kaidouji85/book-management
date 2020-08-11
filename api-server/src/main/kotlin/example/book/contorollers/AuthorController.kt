package example.book.contorollers

import example.book.api.*
import example.book.adapter.toAuthorEntity
import example.book.adapter.toAuthorData
import example.book.repository.AuthorRepository
import example.book.repository.BookRepository
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.*
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
        val author = this.authorRepository.findById(id)
        val response = author.map {toAuthorData(it)}
                .map { GetAuthorByIdResponse(true, "get author by id success", it) }
                .orElse(GetAuthorByIdResponse(false, "no exist id", null))
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
        val authorsBooks = this.bookRepository.findByAuthorId(id)
        authorsBooks.forEach { this.bookRepository.deleteById(it.id) }
        this.authorRepository.deleteById(id)
        val response = DeleteAuthorResponse(true, "delete author success", id)
        return HttpResponse.ok(response)
    }
}