import React from 'react';
import '../css/App.css';
import {Authors} from "./authors/list";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {AuthorRegister} from "./authors/register";
import {AuthorsLink, AuthorsPath, AuthorRegisterLink, AuthorRegisterPath, RootPath} from "./links/links";
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
