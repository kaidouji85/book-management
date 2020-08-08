import React from 'react';
import '../css/App.css';
import {Authors} from "./authors/list";
import {
  //BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Router} from 'react-router';
import {AuthorRegister} from "./authors/register";
import {AuthorsPath, AuthorRegisterPath, RootPath, AuthorUpdatePath} from "./links/links";
import {Root} from "./root";
import { createBrowserHistory } from "history";
import {AuthorUpdate} from "./authors/update";

const history = createBrowserHistory();

function App() {
  const onAuthorRegisterSuccess = () => {
    history.push(AuthorsPath);
  };
  return (
    <Router history={history}>
      <Switch>
        <Route path={AuthorRegisterPath}>
          <AuthorRegister onSaveSuccess={onAuthorRegisterSuccess} />
        </Route>
        <Route path={AuthorUpdatePath(':id')}>
          <AuthorUpdate/>
        </Route>
        <Route path={AuthorsPath}><Authors/></Route>
        <Route path={RootPath}><Root/></Route>
      </Switch>
    </Router>
  );
}

export default App;
