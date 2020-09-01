import React from "react"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import { Header, TodoList, Footer, Home, Login } from "./components"

import "./App.scss"

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/login">
          <Header />
          <Login />
        </Route>

        <Route exact path="/todos">
          <Header />
          <TodoList />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}
