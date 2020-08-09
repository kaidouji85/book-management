import React from 'react';
import {BookUpdateState} from "./state";
import {BookInput} from "../../common/book-input";

/**
 * 書籍編集 プレゼンテーションコンポネント プロパティ
 */
type Props = {
  state: BookUpdateState,
  onTitleChange: (title: string) => void,
  onAuthorChange: (authorId: number) => void
};

/**
 * 書籍編集 プレゼンテーションコンポネント
 * @param props
 * @constructor
 */
export function BookUpdatePresentation(props: Props) {
  return (
    <div>
      <h1>書籍編集</h1>
      <BookInput
        title={props.state.title}
        selectedAuthorId={props.state.selectedAuthorId}
        authors={props.state.authors}
        onTitleChange={props.onTitleChange}
        onAuthorChange={props.onAuthorChange}
      />
    </div>
  );
}