import React from "react"

import { Link } from "react-router-dom"

import logo from "logo.svg"

export const Home = () => (
  <>
    <div className="hero hero--home is-fullheight has-text-centered">
      <div className="hero-body hero-body--home">
        <div className="container">
          <div className="flex flex--align-center flex--column">
            <img
              src={logo}
              alt="Logo from FreePik for TodoList"
              className="image is-64x64 mb-4"
            />
            <h1 className="title">Todo List!</h1>
            <Link className="button is-primary my-2" to="/login">Get Started</Link>
            <Link className="button is-small my-2" to="/login?login">Login</Link>
          </div>
        </div>
      </div>
    </div>

    <section className="px-4 py-4">
      <div className="container">
        <h2 className="title">About Todo List</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          quos illum, fugiat libero dicta debitis accusantium quo similique
          repudiandae, deserunt quas officiis veniam voluptatibus fugit ipsum
          quae dignissimos sed? Sed.
        </p>
      </div>
    </section>
  </>
)
