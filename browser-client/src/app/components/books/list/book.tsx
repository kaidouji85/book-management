import React from 'react';
import {BookData} from "../../../api/books";

/**
 * 書籍一覧 コンポネント プロパティ
 */
type Props = BookData & {
  onDeletePush: (id: number) => void,
  onEditPush: (id: number) => void,
};

/**
 * 書籍一覧 コンポネント
 * @param props プロパティ
 * @constructor
 */
export function Book(props: Props) {
  const onDeletePush = () => {
    props.onDeletePush(props.id);
  }
  const onEditPush = () => {
    props.onEditPush(props.id);
  }
  return (
    <tr>
      <td>
        <button onClick={onDeletePush} onTouchStart={onDeletePush}>削除</button>
        <button onClick={onEditPush} onTouchStart={onEditPush}>編集</button>
      </td>
      <td>{props.title}</td>
      <td>{props.author.name}</td>
      <td>{`${props.publicationDate[0]}年 ${props.publicationDate[1]}月 ${props.publicationDate[2]}日`}</td>
      <td>{props.isPublished ? '出版済' : ''}</td>
    </tr>
  );
}