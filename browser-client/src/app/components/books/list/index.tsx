import React from 'react';
import {BooksState} from "./state";
import {BooksPresentation} from "./presentation";
import {getAllBooks} from "../../../api/books";

export class Books extends React.Component<any , BooksState> {
  state: BooksState;

  constructor(props: any) {
    super(props);
    this.state = {
      books: []
    };
  }

  render() {
    return (<BooksPresentation state={this.state} />);
  }

  async componentDidMount() {
    const resp = await getAllBooks();
    this.setState({
      books: resp.payload
    })
  }
}