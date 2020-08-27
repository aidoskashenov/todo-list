import React from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fab } from "@fortawesome/free-brands-svg-icons"
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"

library.add(fab, faGithub, faLinkedin, faTwitter)

export const Footer = () => (
  <>
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
