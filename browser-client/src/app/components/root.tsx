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
      <BooksLink label={"書籍"}/>
      <AuthorsLink label="著者" />
    </div>
  );
}
