import React from 'react';
import {useParams} from 'react-router-dom';

export function BookUpdate() {
  const {id} = useParams();
  return (
    <div>
      <h1>書籍編集</h1>
      <div>{id}</div>
    </div>
  );
}