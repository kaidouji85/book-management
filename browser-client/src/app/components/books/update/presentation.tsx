import React from 'react';
import {BookUpdateState} from "./state";

/**
 * 書籍編集 プレゼンテーションコンポネント プロパティ
 */
type Props = {
  state: BookUpdateState
};

/**
 * 書籍編集 プレゼンテーションコンポネント
 * @param props
 * @constructor
 */
export function BookUpdatePresentation(props: Props) {
  return (
    <div>
      <h1>書籍編集</h1>
    </div>
  );
}