import React from 'react';
import {useParams} from 'react-router-dom';
import {BookUpdateState} from "./state";
import {BookUpdatePresentation} from "./presentation";
import {getBookById} from "../../../api/books";
import {getAllAuthors} from "../../../api/authors";

/**
 * 書籍編集 コンポネント
 * @constructor
 */
export function BookUpdate() {
  const {id} = useParams();
  return (
    <BookUpdateContainer id={Number(id)} />
  );
}

/**
 * 書籍編集 コンテナコンポネント プロパティ
 */
type ContainerProps = {
  id: number
}

/**
 * 書籍編集 コンテナコンポネント
 */
class BookUpdateContainer extends React.Component<ContainerProps, BookUpdateState> {
  state: BookUpdateState;

  constructor(props: ContainerProps) {
    super(props);
    this.state = {
      title: '',
      authors: [],
      selectedAuthorId: null,
    };
  }

  async componentDidMount(): Promise<void> {
    try {
      const bookResp = await getBookById(this.props.id);
      const authorsResp = await getAllAuthors();
      if (!bookResp.isSuccess || !authorsResp.isSuccess) {
        // TODO エラーメッセージを画面に表示する
        return;
      }

      this.setState({
        title: bookResp.payload.title,
        selectedAuthorId: bookResp.payload.author.id,
        authors: authorsResp.payload,
      })
    } catch (e) {
      throw e;
    }
  }

  render() {
    return (<BookUpdatePresentation
      state={this.state}
      onTitleChange={this.onTitleChange.bind(this)}
      onAuthorChange={this.onAuthorChange.bind(this)}
    />);
  }

  /**
   * タイトルが変更された時の処理
   * @param title 変更内容
   * @private
   */
  private onTitleChange(title: string) {
    this.setState({
      title: title
    });
  }

  /**
   * 著者が変更された時の処理
   * @param authorId 変更内容
   * @private
   */
  private onAuthorChange(authorId: number) {
    this.setState({
      selectedAuthorId: authorId
    })
  }
}