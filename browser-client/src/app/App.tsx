import React from 'react';
import '../css/App.css';
import {Authors} from "./authors/list";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {RegisterAuthor} from "./authors/register/register-author";
import {AuthorsLink, RegisterAuthorLink} from "./links/authors";

function App() {
  return (
    <Router>
      <div>
        <AuthorsLink label="著者一覧" />
        <RegisterAuthorLink label="著者登録" />
      </div>
      <Switch>
        <Route path="/authors/register"><RegisterAuthor/></Route>
        <Route path="/authors"><Authors/></Route>
        <Route path="/"><Authors/></Route>
      </Switch>
    </Router>
  );
}

export default App;
