package example.book.contorollers

import example.book.api.*
import example.book.api.toAuthorEntity
import example.book.api.toAuthorData
import example.book.repository.AuthorRepository
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.*
import java.util.*
import javax.inject.Inject

/**
 * 著者 API コントローラ
 */
@Controller("/authors")
class AuthorController {
    @Inject
    lateinit var authorRepository: AuthorRepository

    @Get("/")
    fun getAll(): HttpResponse<GetAllAuthorResponse> {
        val authors = authorRepository.findAll()
                .toList()
                .map { toAuthorData(it) }
        val response = GetAllAuthorResponse(true, "get all authors success", authors)
        return HttpResponse.ok(response)
    }

    @Get("/{id}")
    fun getById(@PathVariable id: Long): HttpResponse<GetAuthorByIdResponse> {
        val result = this.authorRepository.findById(id)
        val response = result.map {
            val author = toAuthorData(it)
            return@map GetAuthorByIdResponse(true, "get author by id success", Optional.of(author))
        }.orElse(GetAuthorByIdResponse(false, "no exist id", Optional.empty()))
        return HttpResponse.ok(response)
    }

    @Post("/")
    fun insert(@Body data: InsertAuthorData): HttpResponse<InsertAuthorResponse> {
        val author = toAuthorEntity(data)
        val savedAuthor = authorRepository.save(author)
        val respAuthor = toAuthorData(savedAuthor)
        val response = InsertAuthorResponse(true, "post author success", respAuthor)
        return HttpResponse.ok(response)
    }

    @Put("/")
    fun update(@Body data: AuthorData): HttpResponse<InsertAuthorResponse> {
        val authorEntity = toAuthorEntity(data)
        val savedEntity = this.authorRepository.update(authorEntity)
        val respAuthor = toAuthorData(savedEntity)
        val response = UpdateAuthorResponse(true, "put author success", respAuthor)
        return HttpResponse.ok(response)
    }

    @Delete("/{id}")
    fun delete(@PathVariable id: Long): HttpResponse<DeleteAuthorResponse> {
        this.authorRepository.deleteById(id);
        val response = DeleteAuthorResponse(true, "delete author success", id);
        return HttpResponse.ok(response);
    }
}