import React from 'react';

/**
 * エラーメッセージ コンポネント プロパティ
 */
type Props = {
  /**
   * エラーメッセージ
   * nullを指定すると、本コンポネントはバインドされない
   */
  message: string | null
};

/**
 * エラーメッセージ コンポネント
 * @param props プロパティ
 * @constructor
 */
export function ErrorMessage(props: Props) {
  if (props.message === null) {
    return null;
  }

  return (
    <div style={{color: 'red'}}>{props.message}</div>
  );
}