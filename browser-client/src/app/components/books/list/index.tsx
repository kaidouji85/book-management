import React from 'react';
import {BooksState} from "./state";
import {BooksPresentation} from "./presentation";
import {getAllBooks} from "../../../api/books";

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
      onEditPush={this.onEditPush.bind(this)}
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
  private onDeletePush(id :number): void {
    console.log(`delete ${id}`);
  }

  /**
   * 編集ボタンを押した時の処理
   * @param id 書籍ID
   */
  private onEditPush(id :number): void {
    console.log(`update ${id}`);
  }

  private isLoadingPromise(isLoading: boolean): Promise<void> {
    return new Promise(resolve => {
      this.setState({isLoading: isLoading}, resolve);
    });
  }
}