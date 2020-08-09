import React from 'react';
import {AuthorsLink, BooksLink} from "./links/links";

/**
 * ページルート コンポネント
 * @param props プロパティ
 * @return ページルート コンポネント
 */
export function Root(props: any) {
  return (
    <div>
      <h1>トップページ</h1>
      <ul>
        <li><BooksLink label={"書籍"}/></li>
        <li><AuthorsLink label="著者" /></li>
      </ul>
    </div>
  );
}
