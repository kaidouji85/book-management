import React from 'react';
import {AuthorData} from "../../api/authors";

type Props = {
  title: string,
  authors: AuthorData[]
}

export function BookInput(props: Props) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>書籍名</td>
            <td><input/></td>
          </tr>
          <tr>
            <td>著者</td>
            <td><input/></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}