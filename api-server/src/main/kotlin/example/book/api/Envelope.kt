package example.book.api

/**
 * API レスポンス エンベロープ
 */
data class APIResponseEnvelope<P>(
        val isSuccess: Boolean,
        val message: String,
        val payload: P
)