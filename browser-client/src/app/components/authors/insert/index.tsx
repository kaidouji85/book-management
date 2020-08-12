import React from 'react';
import {AuthorInsertState} from "./state";
import {AuthorInsertPresentation} from "./presentation";
import {insertAuthor, InsertAuthorData} from "../../../api/authors";
import {AuthorsPath} from "../../links/links";

/**
 * 著者新規登録 コンポネント
 * @return 著者登録 コンポネント
 */
export class AuthorInsert extends React.Component<any, AuthorInsertState> {
  state: AuthorInsertState;

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      name: ''
    };
  }

  render() {
    return (
      <AuthorInsertPresentation
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
      await this.switchLoading(true);
      const data: InsertAuthorData = {
        name: this.state.name
      };
      const resp = await insertAuthor(data);
      if (!resp.isSuccess) {
        // TODO メッセージを画面に表示する
        return null;
      }

      return AuthorsPath;
    } catch(e) {
      throw e;
    }
  }

  /**
   * 通信中フラグが切り替わるまで待機する
   * @param isLoading フラグ変更内容
   * @private
   */
  private async switchLoading(isLoading: boolean): Promise<void> {
    return new Promise(resolve => {
      this.setState({isLoading}, resolve);
    })
  }
}
