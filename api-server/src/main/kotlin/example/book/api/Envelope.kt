package example.book.api

/**
 * APIレスポンス エンベロープ
 */
data class APIResponseEnvelope<P>(
        val isSuccess: Boolean,
        val message: String,
        val payload: P
)