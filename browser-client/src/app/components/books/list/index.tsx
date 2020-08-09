import React from 'react';
import {BooksState} from "./state";
import {BooksPresentation} from "./presentation";
import {deleteBook, getAllBooks} from "../../../api/books";

export class Books extends React.Component<any , BooksState> {
  state: BooksState;

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      books: []
    };
  }

  render() {
    return (<BooksPresentation
      state={this.state}
      onDeletePush={this.onDeletePush.bind(this)}
    />);
  }

  async componentDidMount() {
    const resp = await getAllBooks();
    this.setState({
      isLoading: false,
      books: resp.payload
    })
  }

  /**
   * 削除ボタンを押した時の処理
   * @param id 書籍ID
   */
  private async onDeletePush(id :number): Promise<void> {
    try {
      await this.switchLoading(true);

      const deleteResp = await deleteBook(id);
      if (!deleteResp.isSuccess) {
        // TODO エラーメッセージを画面に表示する
        return;
      }

      const getResp = await getAllBooks();
      this.setState({
        isLoading: false,
        books: getResp.payload
      })
    } catch (e) {
      throw e;
    }
  }

  /**
   * 通信中フラグが切り替わるまで待機する
   * @param isLoading 変更内容
   * @private
   */
  private switchLoading(isLoading: boolean): Promise<void> {
    return new Promise(resolve => {
      this.setState({isLoading: isLoading}, resolve);
    });
  }
}