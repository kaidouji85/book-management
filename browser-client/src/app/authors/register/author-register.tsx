import React from 'react';
import {AuthorsLink} from "../../links/authors";

/**
 * ページルート
 * @return ページルート
 */
export function AuthorRegister() {
  return (
    <div>
      <ul>
        <li><AuthorsLink label="著者"/></li>
      </ul>
    </div>
  );
}