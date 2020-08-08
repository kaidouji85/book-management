import {AuthorInput} from "../../common/author-input";
import React from "react";
import {AuthorEditState} from "./state";

type Props = {
  state: AuthorEditState,
  onNameChange: (name: string) => void,
};

export function AuthorEditPresentation(props: Props) {
  return (
    <div>
      <h1>著者編集</h1>
      <AuthorInput name={props.state.name} onNameChange={props.onNameChange} />
    </div>
  );
}