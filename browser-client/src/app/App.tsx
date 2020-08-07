import React from 'react';
import '../css/App.css';
import {Authors} from "./authors/list";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {AuthorRegister} from "./authors/register/author-register";
import {AuthorsLink, AuthorsPath, RegisterAuthorLink, AuthorRegisterPath, RootPath} from "./links/authors";
import {Root} from "./root";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={AuthorRegisterPath}><AuthorRegister/></Route>
        <Route path={AuthorsPath}><Authors/></Route>
        <Route path={RootPath}><Root/></Route>
      </Switch>
    </Router>
  );
}

export default App;
