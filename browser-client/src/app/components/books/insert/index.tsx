import React from 'react';
import {BookInsertState} from "./state";
import {BookInsertPresentation} from "./presentation";
import {getAllAuthors} from "../../../api/authors";
import {BookInsertData, insertBook} from "../../../api/books";

/**
 * 書籍新規登録 コンポネント
 * @constructor
 */
export class BookInsert extends React.Component<any, BookInsertState> {
  state: BookInsertState;

  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      authors: [],
      selectedAuthorId: null,
    };
  }

  async componentDidMount() {
    try {
      const resp = await getAllAuthors();
      if (!resp.isSuccess) {
        return;
      }

      const authors = resp.payload;
      const selectedAuthorId = (0 < authors.length)
        ? authors[0].id
        : null;
      this.setState({
        authors: resp.payload,
        selectedAuthorId
      })
    } catch (e) {
      throw e;
    }
  }

  render() {
    return (<BookInsertPresentation
      state={this.state}
      onAuthorChange={this.onAuthorChange.bind(this)}
      onTitleChange={this.onTitleChange.bind(this)}
      onSavePush={this.onSavePush.bind(this)}
    />);
  }

  /**
   * 著者が変更された時の処理
   * @param authorId 変更した著者ID
   * @private
   */
  private onAuthorChange(authorId: number): void {
    this.setState({
      selectedAuthorId: authorId
    });
  }

  /**
   * タイトルが変更された時の処理
   * @param title 変更ない等
   * @private
   */
  private onTitleChange(title: string): void {
    this.setState({
      title: title
    });
  }

  private async onSavePush(): Promise<void> {
    try {
      //console.log('save');
      const data = this.createBookInsertData();
      if (!data) {
        return;
      }

      const resp = await insertBook(data);
    } catch (e) {
      throw e;
    }
  }

  private createBookInsertData(): BookInsertData | null {
    if (this.state.selectedAuthorId === null) {
      return null;
    }

    return {
      title: this.state.title,
      authorId: this.state.selectedAuthorId
    };
  }
}
