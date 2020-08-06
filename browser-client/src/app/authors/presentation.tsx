import {NewAuthor} from "./new-author";
import {Author} from "./author";
import React from "react";
import {AuthorsState} from "./index";
import {AuthorEditor, AuthorEditorData} from "./author-editor";

/**
 * 著者管理 プレゼンテーション コンポネント プロパティ
 */
type Props = {
  /**
   * 著者管理 ステート
   */
  state: AuthorsState,

  /**
   * 著者追加ボタンが押された際のコールバック関数
   */
  onNewAuthorPush: () => void,

  /**
   * 著者エディタ 閉じるボタンが押された際のコールバック関数
   */
  onEditorClosePush: () => void,

  /**
   * 著者エディタ 内容変更時のコールバック関数
   *
   * @param data 変更された内容
   */
  onEditorChange: (data: AuthorEditorData) => void,
};

/**
 * 著者管理 プレゼンテーション コンポネント
 *
 * @param props プロパティ
 * @return 著者管理 プレゼンテーション コンポネント
 */
export function AuthorsPresentation(props: Props) {
  const test = (data: AuthorEditorData) => {
    console.log(data);
  }
  return (
    <div className="authors">
      <div className="authors__title">著者情報</div>
      <div className="authors__items">
        <NewAuthor onNewAuthorPush={props.onNewAuthorPush}/>
        {props.state.authors.map(v => <Author key={v.id} author={v}/>)}
      </div>
      <AuthorEditor
        isOpen={props.state.editor.isOpen}
        name={props.state.editor.name}
        onClosePush={props.onEditorClosePush}
        onChange={props.onEditorChange}
      />
    </div>
  );
}