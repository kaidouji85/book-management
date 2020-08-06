package example.book.contorollers

import example.book.entity.Author
import example.book.repository.AuthorRepository
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
    fun all(): List<Author> {
        return authorRepository.findAll()
                .toList();
    }

    @Post("/")
    fun insert(): String {
        val author = Author(0, "author")    //TODO リクエストパラメータからパースする
        authorRepository.save(author)
        return "success";
    }
}