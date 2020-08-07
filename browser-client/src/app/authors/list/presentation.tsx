import {Author} from "./author";
import React from "react";
import {AuthorRegisterLink} from "../../links/links";
import {AuthorsState} from "./state";

/**
 * 著者管理 プレゼンテーション コンポネント プロパティ
 */
type Props = {
  /**
   * 著者管理 ステート
   */
  state: AuthorsState,
};

/**
 * 著者管理 プレゼンテーション コンポネント
 *
 * @param props プロパティ
 * @return 著者管理 プレゼンテーション コンポネント
 */
export function AuthorsPresentation(props: Props) {
  return (
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
            .map(v => <Author key={v.id} author={v}/>)
          }
        </tbody>
      </table>
    </div>
  );
}