import React from "react";

import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./component/HomePage/HomePage";
import SearchPage from "./component/SearchPage/SearchPage";
import NotFound from "./component/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/search" component={SearchPage} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
