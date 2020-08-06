import {NewAuthor} from "./new-author";
import {Author} from "./author";
import React from "react";
import {AuthorsState} from "./index";

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
};

/**
 * 著者管理 プレゼンテーション コンポネント
 *
 * @param props プロパティ
 * @return 著者管理 プレゼンテーション コンポネント
 */
export function AuthorsPresentation(props: Props) {
  return (
    <div className="authors">
      <div className="authors__title">著者情報</div>
      <div className="authors__items">
        <NewAuthor onNewAuthorPush={props.onNewAuthorPush}/>
        {props.state.authors.map(v => <Author key={v.id} author={v}/>)}
      </div>
    </div>
  );
}