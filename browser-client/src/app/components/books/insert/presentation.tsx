import React from 'react';
import {BookInsertState} from "./state";
import {BookInput} from "../../common/book-input";

/**
 * 書籍新規登録 プレゼンテーション コンポネント プロパティ
 */
type Props = {
  state: BookInsertState,
  onAuthorChange: (authorId: number) => void
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
        onAuthorChange={props.onAuthorChange}
      />
    </div>
  );
}