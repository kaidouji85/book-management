import React from 'react';
import {AuthorInfo, fetchAllAuthors} from "../api/authors";
import {Author} from "./author";
import '../../css/authors/index.css';

/**
 * 著者管理コンポネント プロパティ
 */
type AuthorProps = {};

/**
 * 著者管理コンポネント ステート
 */
type AuthorsState = {
  /**
   * 著者情報
   */
  authors: AuthorInfo[]
};

/**
 * 著者管理 コンテナ コンポネント
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

/**
 * 著者管理 プレゼンテーション コンポネント
 *
 * @param props プロパティ
 * @return 著者管理 プレゼンテーション コンポネント
 */
export function AuthorsPresentation(props: AuthorsState) {
  return (
    <div className="authors">
      <div className="authors__title">著者情報</div>
      <div className="authors__items">
        {props.authors.map(v => Author({author: v}))}
      </div>
    </div>
  );
}