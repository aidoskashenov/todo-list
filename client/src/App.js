import React from "react"

import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"

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

        <Route exact path="/create-account">
          <Redirect to={{ pathname:"/login", state: { status: "Create Account" } }} />
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
