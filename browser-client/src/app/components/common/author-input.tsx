import React from "react";

/**
 * 著者 入力フォーム コンポネント プロパティ
 */
type Props = {
  name: string,
  onNameChange: (name: string) => void,
};

/**
 * 著者 入力フォーム コンポネント
 * @param props
 * @return 著者 入力フォーム コンポネント
 */
export function AuthorInput(props: Props) {
  const onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    props.onNameChange(event.currentTarget.value);
  }
  return (
    <table>
      <tbody>
      <tr>
        <td>著者名</td>
        <td><input type="text" onChange={onNameChange} value={props.name}/></td>
      </tr>
      </tbody>
    </table>
  );
}