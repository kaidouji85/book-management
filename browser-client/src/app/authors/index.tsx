import React from 'react';
import {AuthorInfo, getAllAuthors, postAuthor} from "../api/authors";
import '../../css/authors/index.css';
import {AuthorsPresentation} from "./presentation";
import {AuthorEditorData} from "./author-editor";

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

  /**
   * 著者名
   */
  name: string,
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
        isOpen: false,
        name: ''
      }
    };
  }

  async componentDidMount() {
    const authors = await getAllAuthors();
    this.setState({
      authors: authors
    });
  }

  render() {
    return AuthorsPresentation({
      state: this.state,
      onNewAuthorPush: this.onNewAuthorPush.bind(this),
      onEditorClosePush: this.onEditorClosePush.bind(this),
      onEditorChange: this.onEditorChange.bind(this),
      onEditorSave: this.onEditorSave.bind(this),
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

  /**
   * 著者エディタ 閉じるボタンが押された時の処理
   * @private
   */
  private onEditorClosePush(): void {
    const updatedEditor = {
      ...this.state.editor,
      isOpen: false
    }
    this.setState({editor: updatedEditor});
  }

  /**
   * 著者エディタ 内容変更時の処理
   *
   * @param data 変更後の内容
   * @private
   */
  private onEditorChange(data: AuthorEditorData): void {
    const updatedEditor = {
      ...this.state.editor,
      name: data.name,
    };
    this.setState({editor: updatedEditor});
  }

  /**
   * 著者エディタ　保存系ボタンが押された際の処理
   * @private
   */
  private async onEditorSave(): Promise<void> {
    try {
      const data = this.state.editor;
      await postAuthor(data);
      const updatedAuthors = await getAllAuthors();
      this.setState({
        editor: {
          ...this.state.editor,
          isOpen: false,
        },
        authors: updatedAuthors
      });
    } catch(e) {
      throw e;
    }
  }
}
