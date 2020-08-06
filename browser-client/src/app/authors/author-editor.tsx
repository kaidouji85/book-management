import React from 'react';
import '../../css/authors/author-editor.css'

/**
 * 著者エディター コンポネント プロパティ
 */
type Props = {
  /**
   * 著者エディタ表示フラグ、trueで表示する
   */
  isOpen: boolean,

  /**
   * 閉じるボタンが押された時のコールバック関数
   */
  onClosePush: () => void,
};

/**
 * 著者エディター コンポネント
 *
 * @param props プロパティ
 * @return 著者エディター コンポネント
 */
export function AuthorEditor(props: Props) {
  return (
    <div className={props.isOpen ? "author-editor" : "author-editor--closed"}>
      <div className="author-editor__back-ground"></div>
      <div className="author-editor__editor">
        <div className="author-editor__editor__name">
          <label>名前</label>
          <input></input>
        </div>
        <button className="author-editor__editor__save">登録する</button>
        <button className="author-editor__editor__close" onClick={props.onClosePush} onTouchStart={props.onClosePush}>閉じる</button>
      </div>
    </div>
  );
}