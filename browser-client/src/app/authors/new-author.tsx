import React from 'react';

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
    <tr>
      <td>
        <button onClick={onPush} onTouchStart={onPush}>+追加</button>
      </td>
      <td></td>
    </tr>
  );
}