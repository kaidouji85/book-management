import React from 'react';
import {AuthorRegisterState} from "./state";
import {AuthorRegisterPresentation} from "./presentation";

/**
 * 著者登録 コンポネント
 * @return 著者登録 コンポネント
 */
export class AuthorRegister extends React.Component<any, AuthorRegisterState> {
  state: AuthorRegisterState;

  constructor(props: any) {
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
      />
    );
  }

  private onNameChange(value: string): void {
    this.setState({
      name: value
    });
  }
}

