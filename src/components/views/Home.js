import React from "react"

import logo from "logo.svg"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fab } from "@fortawesome/free-brands-svg-icons"
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"

library.add(fab, faGithub, faLinkedin, faTwitter)

export const Home = () => (
  <>
    <div className="hero is-fullheight has-text-centered">
      <div className="hero-body">
        <div className="container">
          <div className="flex flex--align-center flex--column">
            <img
              src={logo}
              alt="Logo from FreePik for TodoList"
              className="image is-64x64 mb-4"
            />
            <h1 className="title">Todo List!</h1>
            <button className="button is-primary my-2">Get Started</button>
            <button className="button is-small my-2">Login</button>
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

    <div>
      <div className="divider">Let&apos;s Connect!</div>
    </div>

    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Todo List by&nbsp;</strong>
          <a
            href="https://codefinity.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            CodeFinity
          </a>
        </p>
        <div className="level">
          <a
            href="https://github.com/manavm1990"
            target="_blank"
            rel="noopener noreferrer"
            className="level-item mx-2"
          >
            <FontAwesomeIcon icon={["fab", "github"]} />
          </a>
          <a
            href="https://www.linkedin.com/in/manavm1990/"
            target="_blank"
            rel="noopener noreferrer"
            className="level-item mx-2"
          >
            <FontAwesomeIcon icon={["fab", "linkedin"]} />
          </a>
          <a
            className="level-item mx-2"
            href="https://twitter.com/GoCodeFinity"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </a>
        </div>
      </div>
    </footer>
  </>
)
