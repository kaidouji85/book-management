import React from 'react';
import {AuthorRegisterState} from "./state";
import {AuthorRegisterPresentation} from "./presentation";
import {postAuthor, PostAuthorData} from "../../api/authors";

/**
 * 著者登録 コンポネント プロパティ
 */
type Props = {
  onSaveSuccess: () => void
};

/**
 * 著者登録 コンポネント
 * @return 著者登録 コンポネント
 */
export class AuthorRegister extends React.Component<any, AuthorRegisterState> {
  state: AuthorRegisterState;

  constructor(props: Props) {
    super(props);
    this.state = {
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

  private onNameChange(value: string): void {
    this.setState({
      name: value
    });
  }

  private async onSavePush(): Promise<void> {
    try {
      const data: PostAuthorData = {
        name: this.state.name
      };
      const resp = await postAuthor(data);
      if (!resp.isSuccess) {
        // TODO メッセージを画面に表示する
        return;
      }

      this.props.onSaveSuccess();
    } catch(e) {
      throw e;
    }
  }
}

