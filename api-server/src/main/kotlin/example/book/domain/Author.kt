package example.book.domain

/**
 * 著者 ユニークID以外の属性
 */
interface AuthorProps {
    /**
     * 著者名
     */
    val name: String
}

/**
 * 著者
 */
interface Author: AuthorProps {
    val id: Long
}