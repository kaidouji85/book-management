import React from 'react';
import {getAllAuthors} from "../../api/authors";
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
      authors: []
    };
  }

  async componentDidMount() {
    const resp = await getAllAuthors();
    this.setState({
      authors: resp.payload
    });
  }

  render() {
    return AuthorsPresentation({state: this.state});
  }
}
