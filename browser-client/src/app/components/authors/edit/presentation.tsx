import {AuthorInput} from "../../common/author-input";
import React from "react";
import {AuthorEditState} from "./state";
import {AuthorsLink} from "../../links/links";
import {Loading} from "../../common/loading";
import {useHistory} from "react-router-dom";

/**
 * 著者編集 プレゼンテーション コンポネント プロパティ
 */
type Props = {
  state: AuthorEditState,
  onNameChange: (name: string) => void,
  onSavePush: () => Promise<string | null>,
};

/**
 * 著者編集 プレゼンテーション コンポネント
 * @param props プロパティ
 * @return 著者編集 プレゼンテーション コンポネント
 */
export function AuthorEditPresentation(props: Props) {
  const history = useHistory();
  if (props.state.isLoading) {
    return (<Loading/>);
  }

  const onSaveClick = async () => {
    const path = await props.onSavePush();
    if (path !== null) {
      history.push(path);
    }
  };
  return (
    <div>
      <h1>著者編集</h1>
      <AuthorInput name={props.state.name} onNameChange={props.onNameChange} />
      <button onClick={onSaveClick} onTouchStart={onSaveClick} >更新する</button>
      <AuthorsLink label="著者一覧に戻る" />
    </div>
  );
}