package example.book.domain

/**
 * 書籍 ユニークID以外のプロパティ
 */
interface BookProps {
    val name: String
    val author: Author
}

/**
 * 書籍
 */
interface Book : BookProps {
    val id: Long
}