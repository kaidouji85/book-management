import React from 'react';
import {AuthorInfo} from "../../api/authors";

/**
 * 著者情報コンポネント プロパティ
 */

type Props = {
  author: AuthorInfo
};

/**
 * 著者情報コンポネント
 *
 * @param props プロパティ
 * @return 著者情報コンポネント
 */
export function Author(props: Props) {
  return (
    <tr>
      <td>
        <button>削除</button>
        <button>編集</button>
      </td>
      <td>{props.author.name}</td>

    </tr>
  );
}