package example.book.contorollers

import example.book.adapter.toAuthorData
import example.book.adapter.toAuthorEntity
import example.book.api.*
import example.book.entity.AuthorEntity
import example.book.repository.AuthorRepository
import example.book.repository.BookRepository
import io.micronaut.http.annotation.*
import javax.inject.Inject
import javax.transaction.Transactional

/**
 * 著者 API コントローラ
 */
@Controller("/authors")
open class AuthorController {
    /**
     * 著者リポジトリ
     */
    @Inject
    lateinit var authorRepository: AuthorRepository

    /**
     * 書籍リポジトリ
     */
    @Inject
    lateinit var bookRepository: BookRepository

    /**
     * 全著者情報取得API
     * @return APIのレスポンス
     */
    @Transactional
    @Get("/")
    open fun getAll(): GetAllAuthorResponse {
        val authors = authorRepository.findAll()
                .toList()
                .map { toAuthorData(it) }
        return GetAllAuthorResponse(
                isSuccess = true,
                message = "get all authors success",
                payload = authors
        )
    }

    /**
     * 著者情報取得(ID指定)API
     * @param id 著者ID
     * @return APIのレスポンス
     */
    @Transactional
    @Get("/{id}")
    open fun getById(@PathVariable id: Long): GetAuthorByIdResponse {
        val author: AuthorEntity? = this.authorRepository.findById(id)
                .orElse(null)
        author ?: return GetAuthorByIdResponse(
                isSuccess = false,
                message = "no exist author",
                payload = null
        )

        val respAuthor = toAuthorData(author)
        return GetAuthorByIdResponse(
                isSuccess = true,
                message = "get author by id success",
                payload = respAuthor
        )
    }

    /**
     * 著者新規登録API
     * @param data 新規登録する内容
     * @return APIのレスポンス
     */
    @Transactional
    @Post("/")
    open fun insert(@Body data: InsertAuthorData): InsertAuthorResponse {
        val author = toAuthorEntity(data)
        val savedAuthor = authorRepository.save(author)
        val respAuthor = toAuthorData(savedAuthor)
        return InsertAuthorResponse(
                isSuccess = true,
                message = "insert author success",
                payload = respAuthor
        )
    }

    /**
     * 著者更新API
     * @param data 更新する内容
     * @return APIのレスポンス
     */
    @Transactional
    @Put("/")
    open fun update(@Body data: AuthorData): UpdateAuthorResponse {
        val authorEntity = toAuthorEntity(data)
        val savedEntity = this.authorRepository.update(authorEntity)
        val respAuthor = toAuthorData(savedEntity)
        return UpdateAuthorResponse(
                isSuccess = true,
                message = "update author success",
                payload = respAuthor
        )
    }

    /**
     * 著者削除API
     * @param id 削除する著者のID
     * @return APIのレスポンス
     */
    @Transactional
    @Delete("/{id}")
    open fun delete(@PathVariable id: Long): DeleteAuthorResponse {
        val authorsBooks = this.bookRepository.findByAuthorId(id)
        authorsBooks.forEach { this.bookRepository.deleteById(it.id) }
        this.authorRepository.deleteById(id)
        return DeleteAuthorResponse(
                isSuccess = true,
                message = "delete author success",
                payload = id
        )
    }
}