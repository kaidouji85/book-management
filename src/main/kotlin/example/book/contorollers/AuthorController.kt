package example.book.contorollers

import example.book.entity.Author
import example.book.repository.AuthorRepository
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import javax.inject.Inject

/**
 * 著者 API コントローラ
 */
@Controller("/authors")
class AuthorController {
    @Inject
    lateinit var authorRepository: AuthorRepository

    @Get("/")
    fun index(): Iterable<Author> {
        return authorRepository.findAll()
    }
}