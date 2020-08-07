import React from 'react';
import {AuthorsLink} from "../../links/links";

/**
 * 著者登録 コンポネント
 * @return 著者登録 コンポネント
 */
export function AuthorRegister() {
  return (
    <div>
      <h1>著者登録</h1>
      <table>
        <tbody>
          <tr>
            <td>著者名</td>
            <td><input type="text" /></td>
          </tr>
        </tbody>
      </table>
      <button>著者登録する</button>
      <AuthorsLink label="著書一覧に戻る" />
    </div>
  );
}