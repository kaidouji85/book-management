import React from 'react';
import {useParams} from 'react-router-dom';
import {BookUpdateState} from "./state";
import {BookUpdatePresentation} from "./presentation";
import {BookUpdateData, getBookById, updateBook} from "../../../api/books";
import {getAllAuthors} from "../../../api/authors";
import {BooksPath} from "../../links/links";
import {toAPIDate, toInputDate} from "../../Date";

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
      isLoading: true,
      title: '',
      authors: [],
      publicationDate: '',
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
        isLoading: false,
        title: bookResp.payload.title,
        selectedAuthorId: bookResp.payload.author.id,
        publicationDate: toInputDate(bookResp.payload.publicationDate) ?? '',
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
      onPublicationDateChange={this.onPublicationDateChange.bind(this)}
      onSavePush={this.onSavePush.bind(this)}
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

  /**
   * 出版日が変更された時の処理
   * @param date 変更内容
   * @private
   */
  private onPublicationDateChange(date: string) {
    this.setState({
      publicationDate: date
    })
  }

  /**
   * 保存系ボタンが押された時の処理
   * @private
   */
  private async onSavePush(): Promise<string | null> {
    try {
      await this.switchLoading(true);
      const data = this.createBookUpdateData();
      if (!data) {
        // TODO エラ〜メッセージを画面に表示する
        return null;
      }

      const updateResp = await updateBook(data);
      if (!updateResp.isSuccess) {
        // TODO エラ〜メッセージを画面に表示する
        return null;
      }

      return BooksPath;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 書籍更新APIに渡すデータを生成する
   * 生成できない場合はnullを返す
   * @private
   */
  private createBookUpdateData(): BookUpdateData | null {
    if (this.state.selectedAuthorId === null) {
      return null;
    }

    const publicationDate = toAPIDate(this.state.publicationDate);
    if (!publicationDate) {
      return null;
    }

    return {
      id: this.props.id,
      title: this.state.title,
      authorId: this.state.selectedAuthorId,
      publicationDate: publicationDate,
    };
  }

  /**
   * 通信中フラグが切り替わるまで待機する
   * @param isLoading 変更内容
   * @private
   */
  private switchLoading(isLoading: boolean): Promise<void> {
    return new Promise(resolve => {
      this.setState({isLoading}, resolve);
    })
  }
}