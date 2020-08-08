package example.book.domain

/**
 * 書籍 ユニークID以外の固有プロパティ
 */
interface BookProps {
    val title: String
}

/**
 * 書籍 関連するオブジェクト
 */
interface BookRelations {
    val author: Author
}

/**
 * 書籍
 */
interface Book : BookProps, BookRelations {
    val id: Long
}