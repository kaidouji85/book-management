import React from 'react';
import '../../css/authors/author-editor.css'

/**
 * 著者エディター コンポネント プロパティ
 */
type Props = {
  isOpen: boolean
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
        <button className="author-editor__editor__close">閉じる</button>
      </div>
    </div>
  );
}