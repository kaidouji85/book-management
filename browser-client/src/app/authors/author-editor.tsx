import React from 'react';
import '../../css/authors/author-editor.css'

/**
 * 著者エディタ 編集可能な内容
 */
export type AuthorEditorData = {
  /**
   * 著者名
   */
  name: string,
};

/**
 * 著者エディター コンポネント プロパティ
 */
type Props = AuthorEditorData & {
  /**
   * 著者エディタ表示フラグ、trueで表示する
   */
  isOpen: boolean,

  /**
   * 閉じるボタンが押された時のコールバック関数
   */
  onClosePush: () => void,

  /**
   * エディタの内容が変更された時の処理
   *
   * @param data 変更内容
   */
  onChange: (data: AuthorEditorData) => void,
};

/**
 * 著者エディター コンポネント
 *
 * @param props プロパティ
 * @return 著者エディター コンポネント
 */
export function AuthorEditor(props: Props) {
  const onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.value;
    props.onChange({
      ...props,
      name: name
    })
  };

  return (
    <div className={props.isOpen ? "author-editor" : "author-editor--closed"}>
      <div className="author-editor__back-ground"></div>
      <div className="author-editor__editor">
        <div className="author-editor__editor__title">著者登録</div>
        <div className="author-editor__editor__name">
          <label className="author-editor__editor__name__label">名前：</label>
          <input className="author-editor__editor__name__input" value={props.name} onChange={onNameChange}></input>
        </div>
        <button className="author-editor__editor__save">登録する</button>
        <button className="author-editor__editor__close" onClick={props.onClosePush} onTouchStart={props.onClosePush}>閉じる</button>
      </div>
    </div>
  );
}
