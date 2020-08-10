import React from 'react';
import {useHistory} from 'react-router-dom';
import {BooksState} from "./state";
import {Book} from "./book";
import {BookInsertLink, BookUpdatePath, RootLink} from "../../links/links";
import {Loading} from "../../common/loading";

/**
 * 書籍情報 コンポネント プロパティ
 */
type Props = {
  state: BooksState,
  onDeletePush: (id: number) => void,
};

/**
 * 書籍情報 コンポネント
 * @param props プロパティ
 * @constructor
 */
export function BooksPresentation(props: Props) {
  const history = useHistory();
  const onEditPush = (id: number) => {
    history.push(BookUpdatePath(id.toString()));
  };

  if (props.state.isLoading) {
    return (<Loading/>);
  }

  return (
    <div>
      <h1>書籍一覧</h1>
      <BookInsertLink label="+書籍新規登録"/>
      <table>
        <tbody>
        {props.state.books
          .sort((a, b) => b.id - a.id)
          .map(v => {
            return (
              <Book
                {...v}
                key={v.id}
                onDeletePush={props.onDeletePush}
                onEditPush={onEditPush}
              />)
          })}
        </tbody>
      </table>
      <RootLink label="トップに戻る"/>
    </div>
  );
}