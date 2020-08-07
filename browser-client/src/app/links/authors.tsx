import React from 'react';
import {Link} from 'react-router-dom';

/**
 * 著者一覧 パス
 */
export const AuthorsPath = '/authors';

/**
 * 著者登録 パス
 */
export const RegisterAuthorPath = `${AuthorsPath}/register`;

/**
 * 著者一覧 リンク
 * @param props プロパティ
 * @return 著者一覧 リンク
 */
export function AuthorsLink(props: {label: string}) {
  return (
    <Link to={AuthorsPath}>{props.label}</Link>
  );
}

/**
 * 著者登録 リンク
 * @param props プロパティ
 * @return 著者登録 リンク
 */
export function RegisterAuthorLink(props: {label: string}) {
  return (
    <Link to={RegisterAuthorPath}>{props.label}</Link>
  );
}
