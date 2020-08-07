import {AuthorsLink} from "../../links/links";
import React from "react";
import {AuthorRegisterState} from "./state";

/**
 * プロパティ
 */
type Props = {
  state: AuthorRegisterState,
  onNameChange: (value: string) => void
}

/**
 * 著者登録 プレゼンテーション コンポネント
 * @return 著者登録 プレゼンテーション コンポネント
 */
export function AuthorRegisterPresentation(props: Props) {
  const onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    props.onNameChange(event.currentTarget.value);
  }
  return (
    <div>
      <h1>著者登録</h1>
      <table>
        <tbody>
        <tr>
          <td>著者名</td>
          <td><input type="text" onChange={onNameChange} value={props.state.name}/></td>
        </tr>
        </tbody>
      </table>
      <button>著者登録する</button>
      <AuthorsLink label="著書一覧に戻る"/>
    </div>
  );
}