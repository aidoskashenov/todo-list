import React from "react"

import { Link } from "react-router-dom"

export const Header = () => (
  <header>
    <section className="has-text-centered hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="has-text-info-dark is-family-secondary title">
            <Link to="/">Todo List!</Link>
          </h1>
        </div>
      </div>
    </section>
  </header>
)
