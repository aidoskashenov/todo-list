import React from "react"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import { TodoList, Home, Login } from "./components"

import "./App.scss"

export const App = () => {
  return (
    <Router>
      <Route exact={true} path="/">
        <Home />
      </Route>
      {/* TODO: Move this behind 'login' system. */}
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>

      <Switch>
    </Router>
  )
}
