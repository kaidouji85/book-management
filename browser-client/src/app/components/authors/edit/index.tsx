import React from 'react';
import {useParams} from 'react-router-dom';

type Props = {};

export function AuthorEdit(props: Props) {
  const {id} = useParams();
  return (
    <div>
      <h1>著者編集</h1>
      <div>著者ID={id}</div>
    </div>
  );
}