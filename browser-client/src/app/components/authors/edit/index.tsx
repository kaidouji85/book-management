import React from 'react';
import {AuthorEditState} from "./state";
import {AuthorEditPresentation} from "./presentation";
import {useParams} from 'react-router-dom';

/**
 * 著者編集コンポネント
 * @constructor
 */
export function AuthorEdit() {
  const {id} = useParams();
  return (
    <AuthorEditContainer id={id} />
  );
}

/**
 * 著者編集 コンテナ コンポネント プロパティ
 */
type ContainerProps = {
  id: number
};

/**
 * 著者編集 コンテナ コンポネント
 */
export class AuthorEditContainer extends React.Component<ContainerProps, AuthorEditState>{
  constructor(props: ContainerProps) {

    super(props);
    this.state = {
      name: ''
    };
  }

  render() {
    return (
      <AuthorEditPresentation
        state={this.state}
        onNameChange={this.onNameChange.bind(this)}
      />);
  }

  /**
   * 著者名が変更された時の処理
   * @param name 変更内容
   * @private
   */
  private onNameChange(name: string): void {
    this.setState({name: name});
  }
}