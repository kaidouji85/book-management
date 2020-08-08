import React from 'react';
import {BookData} from "../../../api/books";

type Props = {
  title: string
};

export function Book(props: BookData) {
  return (
    <tr>
      <td>{props.title}</td>
    </tr>
  );
}