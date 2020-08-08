import React from 'react';
import {BookInsertState} from "./state";
import {BookInput} from "../../common/book-input";
import {BooksLink} from "../../links/links";

/**
 * 書籍新規登録 プレゼンテーション コンポネント プロパティ
 */
type Props = {
  state: BookInsertState,
  onAuthorChange: (authorId: number) => void,
  onTitleChange: (title: string) => void,
  onSavePush: () => void,
};

/**
 * 書籍新規登録 プレゼンテーション コンポネント
 * @param props プロパティ
 * @constructor
 */
export function BookInsertPresentation(props: Props) {
  return (
    <div>
      <h1>書籍新規登録</h1>
      <BookInput
        title={props.state.title}
        authors={props.state.authors}
        selectedAuthorId={props.state.selectedAuthorId}
        onTitleChange={props.onTitleChange}
        onAuthorChange={props.onAuthorChange}
      />
      <button onClick={props.onSavePush} onTouchStart={props.onSavePush} >書籍を登録する</button>
      <BooksLink label="書籍一覧に戻る" />
    </div>
  );
}