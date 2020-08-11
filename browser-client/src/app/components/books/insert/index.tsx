import React from 'react';
import {BookInsertState} from "./state";
import {BookInsertPresentation} from "./presentation";
import {getAllAuthors} from "../../../api/authors";
import {BookInsertData, insertBook} from "../../../api/books";
import {BooksPath} from "../../links/links";
import {toAPIDate} from "../../Date";

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
      errorMessage: null,
      title: '',
      authors: [],
      publicationDate: '',
      isPublished: false,
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
      onPublicationDateChange={this.onPublicationDateChange.bind(this)}
      onIsPublishedChange={this.onIsPublishedChange.bind(this)}
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
   * @param title 変更内容
   * @private
   */
  private onTitleChange(title: string): void {
    this.setState({
      title: title
    });
  }

  /**
   * 出版日が変更された時の処理
   * @param date 変更内容
   * @private
   */
  private onPublicationDateChange(date: string): void {
    this.setState({
      publicationDate: date
    });
  }

  private onIsPublishedChange(isPublished: boolean): void {
    this.setState({
      isPublished: isPublished
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
        this.setState({
          isLoading: false,
          errorMessage: '入力に誤りがあります。出版日、著者が正しく入力されているか確認してください。'
        })
        return null;
      }

      const resp = await insertBook(data);
      if (!resp.isSuccess) {
        this.setState({
          isLoading: false,
          errorMessage: resp.message
        });
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

    const publicationDate = toAPIDate(this.state.publicationDate);
    if (!publicationDate) {
      return null;
    }

    return {
      title: this.state.title,
      authorId: this.state.selectedAuthorId,
      publicationDate: publicationDate,
      isPublished: false, // TODO 画面から入力値を取得する
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
