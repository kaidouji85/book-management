import React from 'react';
import {AuthorData} from "../../api/authors";

/**
 * 書籍入力フォーム コンポネント プロパティ
 */
type Props = {
  title: string,
  authors: AuthorData[],
  selectedAuthorId: number | null,
  onAuthorChange: (authorId: number) => void
}

/**
 * 書籍入力フォーム コンポネント
 * @param props プロパティ
 * @constructor
 */
export function BookInput(props: Props) {
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
            <td><input value={props.title}/></td>
          </tr>
          <tr>
            <td>著者</td>
            <td>
              <select value={props.selectedAuthorId ?? 0} onChange={onAuthorChange}>
                {props.authors.map(v => (<option value={v.id}>{v.name}</option>))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}