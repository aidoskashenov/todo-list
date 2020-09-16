import { render } from "@testing-library/react"
import React from "react"
import ReactDOM, { unmountComponentAtNode } from "react-dom"

import { App } from "./App"

let container = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it("renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(<App />, div)
})

it("renders app title", () => {
  const { getByText } = render(<App />)
  const el = getByText("Todo List!")
  expect(el).toBeInTheDocument()
})
