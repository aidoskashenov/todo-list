import React from "react"

import { Link } from "react-router-dom"

export const Four04 = () => (
  <section className="container has-text-centered">
    <h2 className="is-size-1">404!</h2>
    <p className="has-text-danger">We can&apos;t find that page</p>
    <Link to="/">
      Wanna go home&nbsp;
      <span role="img" aria-label="house">
        🏠
      </span>
      ?
    </Link>
  </section>
)
