import React from 'react';
import {AuthorInfo} from "../api/authors";

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
    <div className="author">
      <span className="author__name">{props.author.name}</span>
    </div>
  );
}