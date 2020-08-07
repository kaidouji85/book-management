package example.book.contorollers

import example.book.api.GetAllAuthorResponse
import example.book.api.PostAuthorInput
import example.book.api.PostAuthorResponse
import example.book.entity.Author
import example.book.entity.toAuthor
import example.book.entity.toAuthorInfo
import example.book.repository.AuthorRepository
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post
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
                .map { toAuthorInfo(it) }
        val response = GetAllAuthorResponse(true, "get all authors success", authors)
        return HttpResponse.ok(response)
    }

    @Post("/")
    fun insert(@Body data: PostAuthorInput): HttpResponse<PostAuthorResponse> {
        val author = toAuthor(data)
        val savedAuthor = authorRepository.save(author)
        val respAuthor = toAuthorInfo(savedAuthor)
        val response = PostAuthorResponse(true, "post author success", respAuthor)
        return HttpResponse.ok(response)
    }
}