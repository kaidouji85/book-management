import React from 'react';
import {AuthorData} from "../../../api/authors";

/**
 * 著者セレクタ コンポネント プロパティ
 */
type Props = {
  /**
   * 著者一覧
   */
  authors: AuthorData[],

  authorId: number | null,

  /**
   * 選択内容が変更された時のコールバック関数
   * authorIdがnullの場合は指定なし
   * @param authorId
   */
  onAuthorChange: (authorId: number | null) => void
};

/**
 * 著者セレクタ コンポネント
 * @param props
 * @constructor
 */
export function AuthorSelector(props: Props) {
  const noSelectItemValue="no-select-item";
  const onAuthorChange = (e: React.FormEvent<HTMLSelectElement>) =>  {
    const authorId = e.currentTarget.value === noSelectItemValue
      ? null
      : Number(e.currentTarget.value);
    props.onAuthorChange(authorId);
  };
  const value = props.authorId !== null
    ? Number(props.authorId)
    : noSelectItemValue
  return (
    <select onChange={onAuthorChange}>
      <option key="no-select-item" value={noSelectItemValue}>指定なし</option>
      {props.authors.map(v => (<option key={v.id} value={v.id}>{v.name}</option>))}
    </select>
  );
}