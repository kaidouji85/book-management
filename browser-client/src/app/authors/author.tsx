import React from 'react';
import {AuthorInfo} from "../api/authors";
import '../../css/authors/author.css';

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
      <button className="author__delete">削除</button>
      <button className="author__edit">編集</button>
      <span className="author__name">{props.author.name}</span>
    </div>
  );
}