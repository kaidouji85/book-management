import React from 'react';
import {BooksState} from "./state";
import {Book} from "./book";

/**
 * 書籍情報 コンポネント プロパティ
 */
type Props = {
  state: BooksState
};

/**
 * 書籍情報 コンポネント
 * @param props プロパティ
 * @constructor
 */
export function BooksPresentation(props: Props) {
  return (
    <div>
      <h1>書籍一覧</h1>
      <table>
        <tbody>
          {props.state.books.map(v => (<Book key={v.id} {...v} />))}
        </tbody>
      </table>
    </div>
  );
}