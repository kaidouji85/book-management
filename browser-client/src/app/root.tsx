import React from 'react';
import {AuthorsLink} from "./links/links";

/**
 * ページルート コンポネント
 * @param props プロパティ
 * @return ページルート コンポネント
 */
export function Root(props: any) {
  return (
    <div>
      <AuthorsLink label="著者" />
    </div>
  );
}
