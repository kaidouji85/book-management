import React from 'react';
import '../../css/authors/new-author.css'

/**
 * 著者 新規作成 コンポネント プロパティ
 */
type Props = {
  onNewAuthorPush: () =>  void,
};

/**
 * 著者 新規作成 コンポネント
 *
 * @param props プロパティ
 * @return 著者 新規作成 コンポネント
 */
export function NewAuthor(props: Props) {
  const onPush = () => {
    props.onNewAuthorPush();
  };
  return (
    <div className="new-author">
      <button className="new-author__add" onClick={onPush} onTouchStart={onPush}>+</button>
      <div className="new-author__label">追加</div>
    </div>
  );
}