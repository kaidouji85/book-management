import React from 'react';
import {AuthorRegisterState} from "./state";
import {AuthorRegisterPresentation} from "./presentation";
import {postAuthor, PostAuthorData} from "../../../api/authors";
import {AuthorsPath} from "../../links/links";

/**
 * 著者登録 コンポネント
 * @return 著者登録 コンポネント
 */
export class AuthorRegister extends React.Component<any, AuthorRegisterState> {
  state: AuthorRegisterState;

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      name: ''
    };
  }

  render() {
    return (
      <AuthorRegisterPresentation
        state={this.state}
        onNameChange={this.onNameChange.bind(this)}
        onSavePush={this.onSavePush.bind(this)}
      />
    );
  }

  /**
   * 著者名変更時の処理
   * @param value 変更内容
   * @private
   */
  private onNameChange(value: string): void {
    this.setState({
      name: value
    });
  }

  /**
   * 保存系ボタンが押されて時の処理
   * @return 遷移先URL
   * @private
   */
  private async onSavePush(): Promise<string | null> {
    try {
      await new Promise(resolve => {
        this.setState({
          isLoading: true
        }, resolve);
      });
      const data: PostAuthorData = {
        name: this.state.name
      };
      const resp = await postAuthor(data);
      if (!resp.isSuccess) {
        // TODO メッセージを画面に表示する
        return null;
      }

      return AuthorsPath;
    } catch(e) {
      throw e;
    }
  }
}
