import React from 'react';
import '../../css/App.css';
import {Authors} from "./authors/list";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {AuthorRegister} from "./authors/register";
import {AuthorsPath, AuthorRegisterPath, RootPath, AuthorEditPath} from "./links/links";
import {Root} from "./root";
import {AuthorEdit} from "./authors/edit";

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
        <Route path={RootPath}><Root/></Route>
      </Switch>
    </Router>
  );
}

export default App;
