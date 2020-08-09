import React from 'react';
import '../../css/App.css';
import {Authors} from "./authors/list";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {
  AuthorInsertPath,
  AuthorsPath,
  AuthorUpdatePath,
  BookInsertPath,
  BooksPath,
  BookUpdatePath,
  RootPath
} from "./links/links";
import {Root} from "./root";
import {AuthorInsert} from "./authors/insert";
import {AuthorUpdate} from "./authors/update";
import {Books} from "./books/list";
import {BookInsert} from "./books/insert";
import {BookUpdate} from "./books/update";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={AuthorInsertPath}>
          <AuthorInsert/>
        </Route>
        <Route path={AuthorUpdatePath(':id')}>
          <AuthorUpdate/>
        </Route>
        <Route path={AuthorsPath}>
          <Authors/>
        </Route>
        <Route path={BookInsertPath}>
          <BookInsert/>
        </Route>
        <Route path={BookUpdatePath(':id')}>
          <BookUpdate/>
        </Route>
        <Route path={BooksPath}>
          <Books/>
        </Route>
        <Route path={RootPath}>
          <Root/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
