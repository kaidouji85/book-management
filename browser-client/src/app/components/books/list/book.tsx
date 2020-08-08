import React from 'react';
import {BookData} from "../../../api/books";

/**
 * 書籍一覧 コンポネント プロパティ
 */
type Props = BookData & {
  // TODO コールバックを追加する
};

/**
 * 書籍一覧 コンポネント
 * @param props プロパティ
 * @constructor
 */
export function Book(props: BookData) {
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.author.name}</td>
    </tr>
  );
}