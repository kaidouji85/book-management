import React from 'react';
import {Link} from 'react-router-dom';

/**
 * ページルート パス
 */
export const RootPath= "/";

/**
 * 著者一覧 パス
 */
export const AuthorsPath = '/authors';

/**
 * 著者登録 パス
 */
export const AuthorRegisterPath = `${AuthorsPath}/register`;

/**
 * ページルート リンク
 * @param props プロパティ
 * @return ページルート リンク
 */
export function RootLink(props: {label: string}) {
  return (
    <Link to={RootPath}>{props.label}</Link>
  );
}

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
    <Link to={AuthorRegisterPath}>{props.label}</Link>
  );
}
