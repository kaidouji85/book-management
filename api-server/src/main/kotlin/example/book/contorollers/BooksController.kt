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
        val books = when {
            authorId != null -> bookRepository.findByAuthorId(authorId)
            else -> bookRepository.findAll()
        }
        val respBooks = books.toList()
                .map { toBookData(it) }
        return HttpResponse.ok(APIResponseEnvelope(
                isSuccess = true,
                message = "get all books success", payload = respBooks
        ))
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
        if (validationResult is ValidationError) return HttpResponse.ok(APIResponseEnvelope(
                isSuccess = false,
                message = validationResult.messages,
                payload = Optional.empty()
        ))

        val savedBook = this.insertBookToRDB(data)
        savedBook ?: return HttpResponse.ok(APIResponseEnvelope(
                isSuccess = false,
                message = "author not exist",
                payload = Optional.empty()
        ))

        val respBook = toBookData(savedBook)
        return  HttpResponse.ok(APIResponseEnvelope(
                isSuccess = true,
                message = "book insert success",
                payload = Optional.of(respBook)
        ))
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
     * RDBに書籍データを新規作成する
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
        val book: BookEntity?=  this.bookRepository.findById(data.id)
                .orElse(null)
        book ?: return HttpResponse.ok(APIResponseEnvelope(
                isSuccess = false,
                message = "no exist book",
                payload = Optional.empty()
        ))

        val validationResult = this.updateBookValidation(book, data)
        if (validationResult is ValidationError) return HttpResponse.ok(APIResponseEnvelope(
                isSuccess = false,
                message = validationResult.messages,
                payload = Optional.empty()
        ))

        val updatedBook = this.updateBookToRDB(data)
        updatedBook ?: return HttpResponse.ok(APIResponseEnvelope(
                isSuccess = false,
                message = "update book failed",
                payload = Optional.empty()
        ))

        val respBook = toBookData(updatedBook)
        return HttpResponse.ok(APIResponseEnvelope(
                isSuccess = true,
                message = "update book failed",
                payload = Optional.of(respBook)
        ))
    }

    /**
     * 書籍 更新 バリデーション
     * @param origin RDBから取得した既存データ
     * @param update API入力データ
     * @return バリデーション結果
     */
    private fun updateBookValidation(origin: BookEntity, update: UpdateBookData): ValidationResult {
        val originBook = toBook(origin)
        val updateBook = toBook(update)

        val blankTitle = isBlankTitleError(updateBook)
        if (blankTitle is ValidationError) return blankTitle

        val publishToUnPublish = isPublishedToUnPublishedError(originBook, updateBook)
        if (publishToUnPublish is ValidationError) return publishToUnPublish

        val pastPublicationDate = isPastPublicationDate(originBook, updateBook)
        if (pastPublicationDate is ValidationError) return pastPublicationDate

        return ValidData
    }

    /**
     * RDBの書籍データを更新する
     * 本メソッドはバリデーション後に呼ばれる想定である
     * @param data API入力データ
     */
    private fun updateBookToRDB(data: UpdateBookData): BookEntity? {
        val author: AuthorEntity? = this.authorRepository.findById(data.authorId)
                .orElse(null)
        author ?: return null

        val book = createUpdateBookEntity(data, author)
        return this.bookRepository.update(book)
    }

    @Transactional
    @Delete("/{id}")
    open fun delete(@PathVariable id: Long): HttpResponse<DeleteBookAPIResponse> {
        this.bookRepository.deleteById(id)
        val response = APIResponseEnvelope(true, "book delete success", id)
        return HttpResponse.ok(response)
    }
}