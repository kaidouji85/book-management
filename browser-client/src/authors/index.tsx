import React from 'react';
import {fetchAllAuthors} from "../api/authors";

/**
 * 著者画面
 *
 * @constructor
 */
export class Authors extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    const authors = await fetchAllAuthors();
    console.log(authors);
  }

  render() {
    return AuthorsPresentation();
  }
}

export function AuthorsPresentation() {
  return (
    <div className="author">
      著者
    </div>
  );
}