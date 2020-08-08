import React from 'react';
import {BookInsertState} from "./state";
import {BookInsertPresentation} from "./presentation";

/**
 * 書籍新規登録 コンポネント
 * @constructor
 */
export class BookInsert extends React.Component<any, BookInsertState> {
  state: BookInsertState;

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (<BookInsertPresentation/>);
  }
}
