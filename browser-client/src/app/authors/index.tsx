import React from 'react';
import {AuthorInfo, fetchAllAuthors} from "../api/authors";
import '../../css/authors/index.css';
import {AuthorsPresentation} from "./presentation";

/**
 * 著者管理コンポネント プロパティ
 */
export type AuthorsProps = {};

/**
 * 著者管理コンポネント ステート
 */
export type AuthorsState = {
  /**
   * 著者情報
   */
  authors: AuthorInfo[]
};

/**
 * 著者管理 コンテナ コンポネント
 */
export class Authors extends React.Component<AuthorsProps, AuthorsState> {
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
    return AuthorsPresentation({
      state: this.state,
      onNewAuthorPush: this.onNewAuthorPush.bind(this)
    });
  }

  /**
   * 著者追加ボタンが押された際の処理
   * @private
   */
  private onNewAuthorPush(): void {
    console.log('ユーザ追加が呼ばれました');
  }
}

