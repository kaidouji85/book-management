import React from 'react';
import '../../css/App.css';
import {Authors} from "./authors/list";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {AuthorRegister} from "./authors/register";
import {AuthorsPath, AuthorRegisterPath, RootPath, AuthorEditPath, BooksPath} from "./links/links";
import {Root} from "./root";
import {AuthorEdit} from "./authors/edit";
import {Books} from "./books/list";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={AuthorRegisterPath}>
          <AuthorRegister/>
        </Route>
        <Route path={AuthorEditPath(':id')}>
          <AuthorEdit/>
        </Route>
        <Route path={AuthorsPath}><Authors/></Route>
        <Route path={BooksPath}><Books/></Route>
        <Route path={RootPath}><Root/></Route>
      </Switch>
    </Router>
  );
}

export default App;
