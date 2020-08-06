import React from 'react';
import {AuthorInfo} from "../api/authors";

type Props = {
  author: AuthorInfo
};

export function Author(props: Props) {
  return (
    <div className="author">
      <span className="author__name">{props.author.name}</span>
    </div>
  );
}