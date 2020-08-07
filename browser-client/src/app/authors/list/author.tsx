import React from 'react';
import {AuthorInfo} from "../../api/authors";

/**
 * 著者情報コンポネント プロパティ
 */

type Props = {
  author: AuthorInfo
  onDeletePush: (id: number) => void
};

/**
 * 著者情報コンポネント
 *
 * @param props プロパティ
 * @return 著者情報コンポネント
 */
export function Author(props: Props) {
  const onDeletePush = () => {
    props.onDeletePush(props.author.id);
  };
  return (
    <tr>
      <td>
        <button onClick={onDeletePush} onTouchStart={onDeletePush}>削除</button>
        <button>編集</button>
      </td>
      <td>{props.author.name}</td>

    </tr>
  );
}