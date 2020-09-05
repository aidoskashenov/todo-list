import React, { useEffect, useReducer, useState } from "react"

import { useHistory, useLocation, useParams } from "react-router-dom"

import { AddForm as Add } from "./AddForm"
import { List } from "./List"

import api from "api"
import auth from "auth"

const todosAPI = api("todos")

function reducer(state, action) {
  switch (action.type) {
    case "init":
      return state.concat(action.todos)
    case "add":
      return state.concat({
        id: action.id,
        completed: false,
        text: action.text,
      })
    case "toggle-completion": {
      // Wrap 'case' in blocks for proper scoping of lexical bindings (https://eslint.org/docs/rules/no-case-declarations)
      const { toggledTodo } = action
      // 'filter' out all of the other 'todos' and then 're-add' the toggledTodo (with the updated 'completed')
      return state.filter(({ id }) => id !== toggledTodo.id).concat(toggledTodo)
    }
    case "trash":
      return state.filter(({ id }) => id !== action.id)
    default:
      return state
  }
}

export const TodoList = () => {
  const history = useHistory()
  const { state } = useLocation()
  const { uid } = useParams()

  const [todos, dispatch] = useReducer(reducer, [])

  const [currentUser, setCurrentUser] = useState(uid)

  useEffect(() => {
    /**
     * If we don't have a currentUser,
     * then maybe user entered the URL directly bypassing (history.push).
     *
     * We need to use 'auth' to confirm if there is a user, or we need to send them back to 'login.'
     */
    if (!currentUser) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setCurrentUser(user.uid)
        } else {
          history.push("/login")
        }
      })
    }
  })

  useEffect(() => {
    if (currentUser) {
      try {
        ;(async () => {
          const todos = await todosAPI.show(currentUser)
          dispatch({ todos, type: "init" })
        })()
      } catch (err) {
        console.error(err)
      }
    }
  }, [currentUser])

  // Dispatch 'init' to update all of the initial todos...if any
  const handleAdd = async (event) => {
    event.preventDefault()
    const { target } = event
    const text = target.elements[0].value
    try {
      const { insertedId } = await todosAPI.create({ text, uid: currentUser })
      target.reset()
      dispatch({ id: insertedId, type: "add", text })
    } catch (err) {
      console.error(err)
    }
  }

  const handleCheckbox = ({ target }) => {
    const toggledTodo =
      // Go through the current 'todos' and find the one whose id matches the one that was clicked on (using the closest 'li' to get that 'id'.)
      todos.find(({ id }) => id === Number(target.closest("li").dataset.id))

    toggledTodo.completed = target.checked
    dispatch({ type: "toggle-completion", toggledTodo })
  }

  const handleSignOut = () => {
    auth.signOut().then(() => {
      history.push("/login")
    })
  }

  const handleTrash = ({ target }) => {
    dispatch({ type: "trash", id: Number(target.closest("li").dataset.id) })
  }

  return currentUser ? (
    <main className="center mt-3 px-2">
      <div className="has-text-centered mb-3">
        <h2 className="mb-0 title">Welcome, {state?.name}!</h2>
        <button className="button is-text is-size-7" onClick={handleSignOut}>
          Not {state?.name}?
        </button>
      </div>
      <p className="divider is-size-3">{new Date().toLocaleDateString()}</p>

      <List
        todos={todos}
        checkboxHandler={handleCheckbox}
        trashHandler={handleTrash}
      />
      <Add addHandler={handleAdd} signOutHandler={handleSignOut} />
    </main>
  ) : null
}
