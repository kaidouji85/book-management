import React from 'react';
import {AuthorInfo, fetchAllAuthors} from "../api/authors";
import {Author} from "./author";

type AuthorProps = {};

/**
 * 著者画面 ステート
 */
type AuthorsState = {
  authors: AuthorInfo[]
};

/**
 * 著者画面
 *
 * @constructor
 */
export class Authors extends React.Component<AuthorProps, AuthorsState> {
  state: AuthorsState;

  constructor(props: any) {
    super(props);
    this.state = {
      authors: []
    };
  }

  async componentDidMount() {
    const authors = await fetchAllAuthors();
    this.setState({
      authors: authors
    });
  }

  render() {
    return AuthorsPresentation(this.state);
  }
}

export function AuthorsPresentation(props: AuthorsState) {
  return (
    <div className="authors">
      <div className="authors__title">著者情報</div>
      <div className="authors__table">
        {props.authors.map(v => Author({author: v}))}
      </div>
    </div>
  );
}