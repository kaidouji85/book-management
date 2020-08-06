import React from 'react';
import {AuthorInfo, fetchAllAuthors} from "../api/authors";
import '../../css/authors/index.css';
import {AuthorsPresentation} from "./presentation";

/**
 * 著者管理コンポネント プロパティ
 */
export type AuthorsProps = {};

/**
 * 著者エディタのステート
 */
export type EditorState = {
  /**
   * エディタが開かれているかのフラグ、trueで開かれている
   */
  isOpen: boolean,
};

/**
 * 著者管理コンポネント ステート
 */
export type AuthorsState = {
  /**
   * 著者情報
   */
  authors: AuthorInfo[],

  /**
   * 著者エディタ
   */
  editor: EditorState,
};

/**
 * 著者管理 コンテナ コンポネント
 */
export class Authors extends React.Component<AuthorsProps, AuthorsState> {
  state: AuthorsState;

  constructor(props: any) {
    super(props);
    this.state = {
      authors: [],
      editor: {
        isOpen: false
      }
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
      onNewAuthorPush: this.onNewAuthorPush.bind(this),
      onEditorClosePush: this.onEditorClosePush.bind(this),
    });
  }

  /**
   * 著者追加ボタンが押された際の処理
   * @private
   */
  private onNewAuthorPush(): void {
    const updatedEditor = {
      ...this.state.editor,
      isOpen: true
    }
    this.setState({editor: updatedEditor});
  }

  private onEditorClosePush(): void {
    const updatedEditor = {
      ...this.state.editor,
      isOpen: false
    }
    this.setState({editor: updatedEditor});
  }
}
