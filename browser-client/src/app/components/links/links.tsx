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

export const BooksPath = '/books';

/**
 * 著者編集 パス
 * @param id 著者ID
 * @return 著者編集 パス
 */
export const AuthorEditPath = (id: string) => `${AuthorsPath}/edit/${id}`;

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
export function AuthorRegisterLink(props: {label: string}) {
  return (
    <Link to={AuthorRegisterPath}>{props.label}</Link>
  );
}

/**
 * 著者編集 リンク
 * @param props
 * @constructor
 */
export function AuthorEditLink(props: {label: string, id: number}) {
  const id = props.id.toString();
  return (
    <Link to={AuthorEditPath(id)}>{props.label}</Link>
  );
}

export function BooksLink(props: {label: string}) {
  return (
    <Link to={BooksPath}>{props.label}</Link>
  );
}