import React from 'react';
import {BookInsertState} from "./state";
import {BookInput} from "../../common/book-input";
import {BooksLink} from "../../links/links";
import {Loading} from "../../common/loading";
import {useHistory} from 'react-router-dom';

/**
 * 書籍新規登録 プレゼンテーション コンポネント プロパティ
 */
type Props = {
  state: BookInsertState,
  onAuthorChange: (authorId: number) => void,
  onTitleChange: (title: string) => void,
  onSavePush: () => Promise<string | null>,
};

/**
 * 書籍新規登録 プレゼンテーション コンポネント
 * @param props プロパティ
 * @constructor
 */
export function BookInsertPresentation(props: Props) {
  const history = useHistory();
  const onSavePush = async () => {
    const path = await props.onSavePush();
    if (path !== null) {
      history.push(path);
    }

  }
  if (props.state.isLoading) {
    return (<Loading/>);
  }

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
      <button onClick={onSavePush} onTouchStart={onSavePush} >書籍を登録する</button>
      <BooksLink label="書籍一覧に戻る" />
    </div>
  );
}