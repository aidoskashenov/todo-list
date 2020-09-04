import React, { useEffect, useReducer, useState } from "react"

import { useHistory, useLocation } from "react-router-dom"

import { AddForm as Add } from "./AddForm"
import { List } from "./List"

import api from "api"
import auth from "auth"

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

  const [todos, dispatch] = useReducer(reducer, [])

  const [currentUser, setCurrentUser] = useState(state?.uid)

  const todosAPI = api("todos")

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
    if (currentUser && !todos.length) {
      try {
        ;(async () => {
          const todos = await todosAPI.show(currentUser)
          dispatch({ todos, type: "init" })
        })()
      } catch (err) {
        console.error(err)
      }
    }
  }, [currentUser, todos.length, todosAPI])

  // Dispatch 'init' to update all of the initial todos...if any
  const handleAdd = async (event) => {
    event.preventDefault()
    const text = event.target.elements[0].value
    try {
      const { insertedId } = await todosAPI.create({ text, uid: currentUser })
      dispatch({ id: insertedId, type: "add", text })
    } catch (err) {
      console.error(err)
    } finally {
      event.target.reset()
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
    <main className="mt-3 px-2">
      <h2 className="has-text-centered title">Welcome, {state?.name}!</h2>
      <List
        todos={todos}
        checkboxHandler={handleCheckbox}
        trashHandler={handleTrash}
      />
      <Add addHandler={handleAdd} signOutHandler={handleSignOut} />
    </main>
  ) : null
}
