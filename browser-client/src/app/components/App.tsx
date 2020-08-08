import React from 'react';
import '../../css/App.css';
import {Authors} from "./authors/list";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {AuthorInsert} from "./authors/insert";
import {AuthorsPath, AuthorInsertPath, RootPath, AuthorUpdatePath} from "./links/links";
import {Root} from "./root";
import {AuthorUpdate} from "./authors/update";

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
        <Route path={AuthorsPath}><Authors/></Route>
        <Route path={RootPath}><Root/></Route>
      </Switch>
    </Router>
  );
}

export default App;
