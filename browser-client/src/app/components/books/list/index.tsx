import React from 'react';
import {BooksState} from "./state";
import {BooksPresentation} from "./presentation";
import {deleteBook, getBooks, GetBooksAPIResponse} from "../../../api/books";
import {getAllAuthors} from "../../../api/authors";

export class Books extends React.Component<any , BooksState> {
  state: BooksState;

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      selectedAuthorId: null,
      authors: [],
      books: []
    };
  }

  render() {
    return (<BooksPresentation
      state={this.state}
      onDeletePush={this.onDeletePush.bind(this)}
      onAuthorChange={this.onAuthorChange.bind(this)}
    />);
  }

  async componentDidMount() {
    const [booksResp, authorsResp] = await Promise.all([
      this.searchBooksByState(),
      getAllAuthors()
    ]);
    this.setState({
      isLoading: false,
      authors: authorsResp.payload,
      books: booksResp.payload,
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

      const getResp = await this.searchBooksByState();
      this.setState({
        isLoading: false,
        books: getResp.payload
      })
    } catch (e) {
      throw e;
    }
  }

  /**
   * 検索条件 著者セレクトボックスが変更された時の処置
   * @param authorId 変更内容
   * @private
   */
  private async onAuthorChange(authorId: number | null): Promise<void> {
    try {
      console.log(authorId);
      await this.switchLoading(true);
      const booksResp = await getBooks({authorId: authorId});
      if (!booksResp.isSuccess) {
        // TODO エラーメッセージを画面に表示する
        return;
      }

      this.setState({
        isLoading: false,
        books: booksResp.payload,
        selectedAuthorId: authorId
      });
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

  private searchBooksByState(): Promise<GetBooksAPIResponse> {
    return getBooks({authorId: this.state.selectedAuthorId});
  }
}