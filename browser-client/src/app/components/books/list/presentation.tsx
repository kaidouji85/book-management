import React from 'react';
import {BooksState} from "./state";
import {Book} from "./book";
import {BookInsertLink, RootLink} from "../../links/links";

/**
 * 書籍情報 コンポネント プロパティ
 */
type Props = {
  state: BooksState,
  onDeletePush: (id: number) => void,
  onEditPush: (id: number) => void,
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
        <tr>
          <td><BookInsertLink label="+書籍新規登録"/></td>
          <td></td>
          <td></td>
        </tr>
        {props.state.books.map(v => {
          return (
            <Book
              {...v}
              key={v.id}
              onDeletePush={props.onDeletePush}
              onEditPush={props.onEditPush}
            />)
        })}
        </tbody>
      </table>
      <RootLink label="トップに戻る"/>
    </div>
  );
}