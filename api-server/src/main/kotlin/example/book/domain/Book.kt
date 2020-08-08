package example.book.domain

/**
 * 書籍 ユニークID以外のプロパティ
 */
interface BookProps {
    val title: String
}

interface BookRelations {
    val author: Author
}

/**
 * 書籍
 */
interface Book : BookProps, BookRelations {
    val id: Long
}