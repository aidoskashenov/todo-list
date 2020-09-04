import React from "react"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import { Header, List, Footer, Home, Login, Four04 } from "./components"

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

        <Route exact path="/todos/:uid">
          <Header />
          <List />
        </Route>

        <Route>
          <Header />
          <Four04 />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}
