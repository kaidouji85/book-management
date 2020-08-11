import React from 'react';
import {useHistory} from "react-router-dom";
import {BookUpdateState} from "./state";
import {BookInput} from "../../common/book-input";
import {BooksLink} from "../../links/links";
import {Loading} from "../../common/loading";
import {ErrorMessage} from "../../common/error-message";

/**
 * 書籍編集 プレゼンテーションコンポネント プロパティ
 */
type Props = {
  state: BookUpdateState,
  onTitleChange: (title: string) => void,
  onAuthorChange: (authorId: number) => void,
  onPublicationDateChange: (data: string) => void,
  onSavePush: () => Promise<string | null>,
};

/**
 * 書籍編集 プレゼンテーションコンポネント
 * @param props プロパティ
 * @constructor
 */
export function BookUpdatePresentation(props: Props) {
  const history = useHistory();
  const onSavePush = async () => {
    const path = await props.onSavePush();
    if (path) {
      history.push(path);
    }
  };

  if (props.state.isLoading) {
    return (<Loading/>);
  }

  return (
    <div>
      <h1>書籍編集</h1>
      <ErrorMessage message={props.state.errorMessage}/>
      <BookInput
        title={props.state.title}
        selectedAuthorId={props.state.selectedAuthorId}
        publicationDate={props.state.publicationDate}
        authors={props.state.authors}
        isPublished={false /* TODO 親から渡す  */}
        onTitleChange={props.onTitleChange}
        onAuthorChange={props.onAuthorChange}
        onPublicationDateChange={props.onPublicationDateChange}
      />
      <button onClick={onSavePush} onTouchStart={onSavePush} >書籍を更新する</button>
      <BooksLink label="書籍一覧に戻る"/>
    </div>
  );
}