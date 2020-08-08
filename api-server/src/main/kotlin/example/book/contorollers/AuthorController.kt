package example.book.contorollers

import example.book.api.*
import example.book.entity.toAuthorEntity
import example.book.entity.toAuthor
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
    fun all(): HttpResponse<GetAllAuthorResponse> {
        val authors = authorRepository.findAll()
                .toList()
                .map { toAuthor(it) }
        val response = GetAllAuthorResponse(true, "get all authors success", authors)
        return HttpResponse.ok(response)
    }

    @Get("/{id}")
    fun getById(@PathVariable id: Long): HttpResponse<GetAuthorByIdResponse> {
        val result = this.authorRepository.findById(id)
        val response = result.map {
            val author = toAuthor(it)
            return@map GetAuthorByIdResponse(true, "get author by id success", Optional.of(author))
        }.orElse(GetAuthorByIdResponse(false, "no exist id", Optional.empty()))
        return HttpResponse.ok(response)
    }

    @Post("/")
    fun insert(@Body data: AuthorPropData): HttpResponse<PostAuthorResponse> {
        val author = toAuthorEntity(data)
        val savedAuthor = authorRepository.save(author)
        val respAuthor = toAuthor(savedAuthor)
        val response = PostAuthorResponse(true, "post author success", respAuthor)
        return HttpResponse.ok(response)
    }

    @Put("/")
    fun update(@Body data: AuthorData): HttpResponse<PostAuthorResponse> {
        val authorEntity = toAuthorEntity(data)
        val savedEntity = this.authorRepository.update(authorEntity)
        val respAuthor = toAuthor(savedEntity)
        val response = PutAuthorResponse(true, "put author success", respAuthor)
        return HttpResponse.ok(response)
    }

    @Delete("/{id}")
    fun delete(@PathVariable id: Long): HttpResponse<DeleteAuthorResponse> {
        this.authorRepository.deleteById(id);
        val response = DeleteAuthorResponse(true, "delete author success", id);
        return HttpResponse.ok(response);
    }
}