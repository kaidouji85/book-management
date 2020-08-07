import React from 'react';
import {deleteAuthor, getAllAuthors} from "../../api/authors";
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
    return AuthorsPresentation({
      state: this.state,
      onDeletePush: this.onDeletePush.bind(this)
    });
  }

  private async onDeletePush(id: number): Promise<void> {
    try {
      await deleteAuthor(id);

    } catch(e) {
      throw e;
    }
  }
}
