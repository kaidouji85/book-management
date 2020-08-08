import React from 'react';
import {AuthorUpdateState} from "./state";
import {AuthorUpdatePresentation} from "./presentation";
import {useParams} from 'react-router-dom';
import {AuthorData, getAuthorById, insertAuthor, updateAuthor} from "../../../api/authors";
import {AuthorsPath} from "../../links/links";

/**
 * 著者更新 コンポネント
 * @constructor
 */
export function AuthorUpdate() {
  const {id} = useParams();
  return (
    <AuthorUpdateContainer id={id} />
  );
}

/**
 * 著者更新 コンテナ コンポネント プロパティ
 */
type ContainerProps = {
  id: number
};

/**
 * 著者更新 コンテナ コンポネント
 */
export class AuthorUpdateContainer extends React.Component<ContainerProps, AuthorUpdateState>{
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

      const author: AuthorData = resp.payload;
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
      <AuthorUpdatePresentation
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

  /**
   * 保存系ボタンが押された時の処理
   * @private
   */
  private async onSavePush():Promise<string | null> {
    try {
      await this.isLoadingPromise(true);

      const putData = this.createAuthorInfo();
      const putResp = await updateAuthor(putData);
      if (!putResp.isSuccess) {
        // TODO エラ〜メッセージを画面に表示する
        await this.isLoadingPromise(false);
        return null;
      }

      return AuthorsPath;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 著者更新APIに渡す情報を生成する
   * @private
   * @return  著者更新APIに渡す情報
   */
  private createAuthorInfo(): AuthorData {
    return {
      id: this.props.id,
      name: this.state.name
    };
  }

  /**
   * 通信中フラグを変更する
   * @param isLoading 設定値
   * @private
   */
  private isLoadingPromise(isLoading: boolean): Promise<void> {
    return new Promise(resolve => {
      this.setState({isLoading: isLoading}, resolve);
    });
  }
}