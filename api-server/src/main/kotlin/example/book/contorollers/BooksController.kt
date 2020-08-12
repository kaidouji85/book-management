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
import io.micronaut.http.annotation.*
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
    open fun get(@QueryValue authorId: Long? ): GetAllBooksAPIResponse {
        val books = when {
            authorId != null -> bookRepository.findByAuthorId(authorId)
            else -> bookRepository.findAll()
        }
        val respBooks = books.toList()
                .map { toBookData(it) }
        return GetAllBooksAPIResponse(
                isSuccess = true,
                message = "get all books success",
                payload = respBooks
        )
    }

    @Transactional
    @Get("/{id}")
    open fun getById(@PathVariable id: Long): GetBookByIdAPIResponse {
        val book: BookEntity? = this.bookRepository.findById(id)
                .orElse(null)
        book ?: return GetBookByIdAPIResponse(
                isSuccess = true,
                message = "get book by id success",
                payload = null
        )

        val respBook = toBookData(book)
        return GetBookByIdAPIResponse(
                isSuccess = true,
                message = "get book by id success",
                payload = respBook
        )
    }

    @Transactional
    @Post("/")
    open fun insert(@Body data: InsertBookData): InsertBookAPIResponse {
        val validationResult = this.insertBookValidation(data)
        if (validationResult is ValidationError) return InsertBookAPIResponse(
                isSuccess = false,
                message = validationResult.messages,
                payload = null
        )

        val savedBook = this.insertBookToRDB(data)
        savedBook ?: return InsertBookAPIResponse(
                isSuccess = false,
                message = "author not exist",
                payload = null
        )

        val respBook = toBookData(savedBook)
        return  InsertBookAPIResponse(
                isSuccess = true,
                message = "book insert success",
                payload = respBook
        )
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
    open fun update(@Body data: UpdateBookData): UpdateBookAPIResponse {
        val book: BookEntity?=  this.bookRepository.findById(data.id)
                .orElse(null)
        book ?: return UpdateBookAPIResponse(
                isSuccess = false,
                message = "no exist book",
                payload = null
        )

        val validationResult = this.updateBookValidation(book, data)
        if (validationResult is ValidationError) return UpdateBookAPIResponse(
                isSuccess = false,
                message = validationResult.messages,
                payload = null
        )

        val updatedBook = this.updateBookToRDB(data)
        updatedBook ?: return UpdateBookAPIResponse(
                isSuccess = false,
                message = "update book failed",
                payload = null
        )

        val respBook = toBookData(updatedBook)
        return UpdateBookAPIResponse(
                isSuccess = true,
                message = "update book failed",
                payload = respBook
        )
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

        val publishToUnPublish = isPublishedToUnPublishError(originBook, updateBook)
        if (publishToUnPublish is ValidationError) return publishToUnPublish

        val changeTitleAfterPublished = isTitleChangeError(originBook, updateBook)
        if (changeTitleAfterPublished is ValidationError) return changeTitleAfterPublished

        val  publicationDateChange = isPublicationDateChangeError(originBook, updateBook)
        if (publicationDateChange is ValidationError) return publicationDateChange

        val blankTitle = isBlankTitleError(updateBook)
        if (blankTitle is ValidationError) return blankTitle

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
    open fun delete(@PathVariable id: Long): DeleteBookAPIResponse {
        this.bookRepository.deleteById(id)
        return DeleteBookAPIResponse(
                isSuccess = true,
                message = "book delete success",
                payload = id
        )
    }
}