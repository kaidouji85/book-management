import React from 'react';
import {BookInsertState} from "./state";
import {BookInsertPresentation} from "./presentation";
import {getAllAuthors} from "../../../api/authors";
import {BookInsertData, insertBook} from "../../../api/books";
import {BooksPath} from "../../links/links";

/**
 * 書籍新規登録 コンポネント
 * @constructor
 */
export class BookInsert extends React.Component<any, BookInsertState> {
  state: BookInsertState;

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
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

  /**
   * 保存系ボタンを押した時の処理
   * @private
   */
  private async onSavePush(): Promise<string | null> {
    try {
      await this.switchLoading(true);

      const data = this.createBookInsertData();
      if (!data) {
        return null;
      }
      const resp = await insertBook(data);
      if (!resp.isSuccess) {
        // TODO エラーメッセージを画面に出す
        return null;
      }

      return BooksPath;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 書籍登録APIに渡すデータを生成する
   * @private
   * @return 生成結果
   */
  private createBookInsertData(): BookInsertData | null {
    if (this.state.selectedAuthorId === null) {
      return null;
    }

    return {
      title: this.state.title,
      authorId: this.state.selectedAuthorId
    };
  }

  /**
   * 通信中フラグが切り替わるまで待つ
   * @param isLoading 設定値
   * @private
   */
  private async switchLoading(isLoading: boolean): Promise<void> {
    return new Promise(resolve => {
      this.setState({isLoading}, resolve);
    });
  }
}
