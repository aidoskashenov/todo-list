import React from "react"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import { Header, TodoList, Home, Login } from "./components"

import "./App.scss"

export const App = () => {
  return (
    <Router>
      <Header />
      <Route exact path="/">
        <Home />
      </Route>

      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>

      <Switch>
        <Route exact path="/todolist">
          <TodoList />
        </Route>
      </Switch>
    </Router>
  )
}
