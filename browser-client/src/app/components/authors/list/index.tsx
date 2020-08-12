import React from 'react';
import {deleteAuthor, getAllAuthors} from "../../../api/authors";
import {AuthorsPresentation} from "./presentation";
import {AuthorsState} from "./state";

/**
 * 著者管理 コンテナ コンポネント
 */
export class Authors extends React.Component<any, AuthorsState> {
  state: AuthorsState;

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      authors: []
    };
  }

  async componentDidMount() {
    const resp = await getAllAuthors();
    this.setState({
      isLoading: false,
      authors: resp.payload
    });
  }

  render() {
    return (
      <AuthorsPresentation state={this.state} onDeletePush={this.onDeletePush.bind(this)}/>
    );
  }

  /**
   * 削除ボタンが押された時の処理
   * @param id 著者ID
   * @private
   */
  private async onDeletePush(id: number): Promise<void> {
    try {
      await this.switchLoading(true);
      await deleteAuthor(id);
      const authorsResp = await getAllAuthors();
      this.setState({
        isLoading: false,
        authors: authorsResp.payload
      });
    } catch(e) {
      throw e;
    }
  }

  /**
   * ローディング表示を切り替える
   * @param isLoading ローディングフラグ
   * @private
   */
  private async switchLoading(isLoading: boolean): Promise<void> {
    return new Promise(resolve => {
      this.setState({isLoading}, resolve);
    });
  }
}
