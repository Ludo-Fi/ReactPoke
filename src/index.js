import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Game from "./Game";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <Router>
      <Switch>
        <Route path="/Fight/" component={Game} />
        <Route component={App} />
      </Switch>
    </Router>,
  rootElement
);
