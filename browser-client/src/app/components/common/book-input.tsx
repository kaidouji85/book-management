import React from 'react';
import {AuthorData} from "../../api/authors";

/**
 * 書籍入力フォーム コンポネント プロパティ
 */
type Props = {
  title: string,
  authors: AuthorData[],
  selectedAuthorId: number | null,
  onTitleChange: (title: string) => void,
  onAuthorChange: (authorId: number) => void
}

/**
 * 書籍入力フォーム コンポネント
 * @param props プロパティ
 * @constructor
 */
export function BookInput(props: Props) {
  const onTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;
    props.onTitleChange(title);
  }
  const onAuthorChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const id = Number(e.currentTarget.value);
    props.onAuthorChange(id);
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>書籍名</td>
            <td><input value={props.title} onChange={onTitleChange} /></td>
          </tr>
          <tr>
            <td>著者</td>
            <td>
              <select value={props.selectedAuthorId ?? 0} onChange={onAuthorChange}>
                {props.authors.map(v => (<option key={v.id} value={v.id}>{v.name}</option>))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}