import React from 'react';
import {AuthorEditState} from "./state";
import {AuthorEditPresentation} from "./presentation";
import {useParams} from 'react-router-dom';
import {AuthorInfo, getAuthorById, postAuthor, putAuthor} from "../../../api/authors";

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
      isLoading: true,
      name: ''
    };
  }

  async componentDidMount() {
    try {
      const resp = await getAuthorById(this.props.id);
      if (!resp.isSuccess || !resp.payload) {
        // TODO エラ〜メッセージを画面に出す
        return;
      }

      const author: AuthorInfo = resp.payload;
      this.setState({
        isLoading: false,
        name: author.name
      })
    } catch(e) {
      throw e;
    }
  }

  render() {
    return (
      <AuthorEditPresentation
        state={this.state}
        onNameChange={this.onNameChange.bind(this)}
        onSavePush={this.onSavePush.bind(this)}
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

  private async onSavePush():Promise<void> {
    try {
      const putData = this.createAuthorInfo();
      const putResp = await putAuthor(putData);
      if (!putResp.isSuccess) {
        // TODO エラ〜メッセージを画面に表示する
        return;
      }
    } catch (e) {
      throw e;
    }
  }

  private createAuthorInfo(): AuthorInfo {
    return {
      id: this.props.id,
      name: this.state.name
    };
  }
}