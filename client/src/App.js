import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BubblePage from './components/BubblePage'
import PrivateRoute from './components/PrivateRoute'

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path='/bubblePage' component={BubblePage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
