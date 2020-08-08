import {AuthorInput} from "../../common/author-input";
import React from "react";
import {AuthorEditState} from "./state";
import {AuthorsLink} from "../../links/links";

/**
 * 著者編集 プレゼンテーション コンポネント プロパティ
 */
type Props = {
  state: AuthorEditState,
  onNameChange: (name: string) => void,
  onSavePush: () => void,
};

/**
 * 著者編集 プレゼンテーション コンポネント
 * @param props プロパティ
 * @return 著者編集 プレゼンテーション コンポネント
 */
export function AuthorEditPresentation(props: Props) {
  return (
    <div>
      <h1>著者編集</h1>
      <AuthorInput name={props.state.name} onNameChange={props.onNameChange} />
      <button onClick={props.onSavePush} onTouchStart={props.onSavePush} >更新する</button>
      <AuthorsLink label="著者一覧に戻る" />
    </div>
  );
}