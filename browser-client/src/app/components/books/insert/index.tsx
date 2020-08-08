import React from 'react';
import {BookInsertState} from "./state";
import {BookInsertPresentation} from "./presentation";
import {getAllAuthors} from "../../../api/authors";

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
      authors: []
    };
  }

  async componentDidMount() {
    try {
      const authors = await getAllAuthors();
      this.setState({
        authors: authors.payload
      })
    } catch (e) {
      throw e;
    }
  }

  render() {
    return (<BookInsertPresentation state={this.state}/>);
  }
}
