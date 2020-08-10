import React from 'react';

type Props = {
  message: string | null
};

export function ErrorMessage(props: Props) {
  if (props.message === null) {
    return null;
  }

  return (
    <div style={{color: 'red'}}>{props.message}</div>
  );
}