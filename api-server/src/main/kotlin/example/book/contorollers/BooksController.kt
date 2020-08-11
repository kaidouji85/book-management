package example.book.contorollers

import example.book.api.*
import example.book.adapter.createInsertBookEntity
import example.book.adapter.createUpdateBookEntity
import example.book.adapter.toBook
import example.book.adapter.toBookData
import example.book.entity.AuthorEntity
import example.book.entity.BookEntity
import example.book.repository.AuthorRepository
import example.book.repository.BookRepository
import example.book.validation.*
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
    open fun get(@QueryValue authorId: Long? ): HttpResponse<GetAllBooksAPIResponse> {
        println(authorId)
        val books = when {
            authorId != null -> bookRepository.findByAuthorId(authorId)
            else -> bookRepository.findAll()
        }
        val respBooks = books.toList()
                .map { toBookData(it) }
        val response = APIResponseEnvelope(true, "get all books success", respBooks)
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
        val validationResult = this.insertBookValidation(data)
        if (validationResult is ValidationError) {
            return HttpResponse.ok(APIResponseEnvelope(false, validationResult.messages, Optional.empty()))
        }

        val savedBook = this.insertBookToRDB(data)
        savedBook ?: return HttpResponse.ok(APIResponseEnvelope(false, "author not exist", Optional.empty()))

        val respBook = toBookData(savedBook)
        return  HttpResponse.ok(APIResponseEnvelope(true, "book insert success", Optional.of(respBook)))
    }

    /**
     * 書籍 新規作成 のバリデーションを行う
     * @param data API入力データ
     * @return バリデーション結果
     */
    private fun insertBookValidation(data: InsertBookData): ValidationResult {
        val target = toBook(data)

        val blankTitleError = isBlankTitleError(target)
        if (blankTitleError is ValidationError) return blankTitleError

        return ValidData
    }

    /**
     * 書籍 新規作成データをRDBにインサートする
     * 本メソッドはバリデーション後に呼ばれる想定である
     *
     * @param data API入力データ
     * @return 登録した書籍エンティティを返す、登録失敗した場合はnullを返す
     */
    private fun insertBookToRDB(data: InsertBookData): BookEntity? {
        val authorEntity: AuthorEntity? = this.authorRepository.findById(data.authorId)
                .orElse(null)
        authorEntity ?: return null
        val bookEntity = createInsertBookEntity(data, authorEntity)
        return this.bookRepository.save(bookEntity)
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