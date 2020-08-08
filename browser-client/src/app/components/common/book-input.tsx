import React from 'react';
import {AuthorData} from "../../api/authors";

/**
 * 書籍入力フォーム コンポネント プロパティ
 */
type Props = {
  title: string,
  authors: AuthorData[]
}

/**
 * 書籍入力フォーム コンポネント
 * @param props プロパティ
 * @constructor
 */
export function BookInput(props: Props) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>書籍名</td>
            <td><input value={props.title}/></td>
          </tr>
          <tr>
            <td>著者</td>
            <td>
              <select name="author">
                {props.authors.map(v => (<option value={v.id}>{v.name}</option>))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}