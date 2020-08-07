import {Author} from "./author";
import React from "react";
import {AuthorRegisterLink} from "../../links/links";
import {AuthorsState} from "./state";
import {AuthorInfo} from "../../api/authors";

/**
 * 著者管理 プレゼンテーション コンポネント プロパティ
 */
type Props = {
  /**
   * 著者管理 ステート
   */
  state: AuthorsState,

  /**
   * 削除ボタンが押された時のコールバック関数
   * @param id 著者ID
   */
  onDeletePush: (id: number) => void;
};

/**
 * 著者管理 プレゼンテーション コンポネント
 *
 * @param props プロパティ
 * @return 著者管理 プレゼンテーション コンポネント
 */
export function AuthorsPresentation(props: Props) {
  const visible = (
    <div>
      <h1>著者情報</h1>
      <table>
        <tbody>
        <tr>
          <td><AuthorRegisterLink label={"著者追加"}/></td>
          <td></td>
        </tr>
        {props.state.authors
          .sort((a, b) => b.id - a.id)
          .map(v => <Author key={v.id} author={v} onDeletePush={props.onDeletePush} />)
        }
        </tbody>
      </table>
    </div>
  );
  const loading = (
    <div>通信中</div>
  );
  return props.state.isLoading ? loading : visible;
}
