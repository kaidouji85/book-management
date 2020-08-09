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
 * 著者新規登録 パス
 */
export const AuthorInsertPath = `${AuthorsPath}/insert`;

/**
 * 著者更新パス
 * @param id 著者ID
 * @return 著者編集 パス
 */
export const AuthorUpdatePath = (id: string) => `${AuthorsPath}/update/${id}`;

/**
 * 書籍一覧 パス
 */
export const BooksPath = '/books';

/**
 * 書籍新規登録 パス
 */
export const BookInsertPath = `${BooksPath}/insert`;

export const BookUpdatePath = (id: string) => `${BooksPath}/update/${id}`;

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
 * 著者新規登録 リンク
 * @param props プロパティ
 * @return 著者登録 リンク
 */
export function AuthorInsertLink(props: {label: string}) {
  return (
    <Link to={AuthorInsertPath}>{props.label}</Link>
  );
}

/**
 * 著者更新 リンク
 * @param props プロパティ
 * @constructor
 */
export function AuthorUpdateLink(props: {label: string, id: number}) {
  const id = props.id.toString();
  return (
    <Link to={AuthorUpdatePath(id)}>{props.label}</Link>
  );
}

/**
 * 書籍一覧 リンク
 * @param props プロパティ
 * @constructor
 */
export function BooksLink(props: {label: string}) {
  return (
    <Link to={BooksPath}>{props.label}</Link>
  );
}

/**
 * 書籍新規登録 リンク
 * @param props プロパティ
 * @constructor
 */
export function BookInsertLink(props: {label: string}) {
  return (
    <Link to={BookInsertPath}>{props.label}</Link>
  );
}

export function BookUpdateLink(props: {label: string, id: string}) {
  return (
    <Link to={BookUpdatePath(props.id)}>{props.label}</Link>
  );
}