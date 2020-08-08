import React from 'react';
import {BooksState} from "./state";
import {Book} from "./book";

type Props = {
  state: BooksState
};

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