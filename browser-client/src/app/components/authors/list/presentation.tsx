import {Author} from "./author";
import React from "react";
import {useHistory} from 'react-router-dom';
import {AuthorInsertLink, AuthorUpdatePath, RootLink} from "../../links/links";
import {AuthorsState} from "./state";
import {Loading} from "../../common/loading";

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
  onDeletePush: (id: number) => void,
};

/**
 * 著者管理 プレゼンテーション コンポネント
 *
 * @param props プロパティ
 * @return 著者管理 プレゼンテーション コンポネント
 */
export function AuthorsPresentation(props: Props) {
  if (props.state.isLoading) {
    return (<Loading/>);
  }

  return (<VisibleAuthors {...props} />)
}

/**
 * ローディングでない時の著者管理
 * @param props プロパティ
 * @constructor
 */
function VisibleAuthors(props: Props) {
  const history = useHistory();
  const onEditPush = (id : number) => {
    const path = AuthorUpdatePath(id.toString());
    history.push(path);
  };
  return (
    <div>
      <h1>著者情報</h1>
      <table>
        <tbody>
        <tr>
          <td><AuthorInsertLink label={"+著者新規登録"}/></td>
          <td></td>
        </tr>
        {props.state.authors
          .sort((a, b) => b.id - a.id)
          .map(v => <Author key={v.id} author={v} onDeletePush={props.onDeletePush}onEditPush={onEditPush} />)
        }
        </tbody>
      </table>
      <RootLink label="トップに戻る"/>
    </div>
  );
}