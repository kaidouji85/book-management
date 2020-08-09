import React from 'react';
import {useParams} from 'react-router-dom';
import {BookUpdateState} from "./state";
import {BookUpdatePresentation} from "./presentation";

/**
 * 書籍編集 コンポネント
 * @constructor
 */
export function BookUpdate() {
  const {id} = useParams();
  return (
    <BookUpdateContainer id={Number(id)} />
  );
}

/**
 * 書籍編集 コンテナコンポネント プロパティ
 */
type ContainerProps = {
  id: number
}

/**
 * 書籍編集 コンテナコンポネント
 */
class BookUpdateContainer extends React.Component<ContainerProps, BookUpdateState> {
  state: BookUpdateState;

  constructor(props: ContainerProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (<BookUpdatePresentation state={this.state} />);
  }
}