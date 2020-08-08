import {AuthorsLink} from "../../links/links";
import React from "react";
import {useHistory} from 'react-router-dom';
import {AuthorInsertState} from "./state";
import {AuthorInput} from "../../common/author-input";

/**
 * プロパティ
 */
type Props = {
  /**
   * ステート
   */
  state: AuthorInsertState,

  /**
   * 著者名が変更された時のコールバック関数
   * @param value 変更内容
   */
  onNameChange: (value: string) => void,

  /**
   * 保存系ボタンが押された時のコールバック関数
   * 戻り値に書かれているURLに遷移する
   * nullが返された場合は遷移しない
   *
   * @return 遷移先URL、nullなら遷移しない
   */
  onSavePush: () => Promise<string | null>,
}

/**
 * 著者新規登録 プレゼンテーション コンポネント
 * @return 著者登録 プレゼンテーション コンポネント
 */
export function AuthorInsertPresentation(props: Props) {
  const history = useHistory();
  const onSavePush = async () => {
    const path = await props.onSavePush();
    if (path !== null) {
      history.push(path);
    }
  };
  const visible = (
    <div>
      <h1>著者新規登録</h1>
      <AuthorInput name={props.state.name} onNameChange={props.onNameChange}/>
      <button onClick={onSavePush} onTouchStart={onSavePush}>著者登録する</button>
      <AuthorsLink label="著書一覧に戻る"/>
    </div>
  );
  const loading = (
    <div>通信中</div>
  );
  return props.state.isLoading ? loading : visible;
}