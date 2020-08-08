import React from 'react';
import {BookInsertState} from "./state";
import {BookInput} from "../../common/book-input";

type Props = {
  state: BookInsertState,
};

export function BookInsertPresentation(props: Props) {
  return (
    <div>
      <h1>書籍新規登録</h1>
      <BookInput
        title={props.state.title}
        authors={props.state.authors}
      />
    </div>
  );
}