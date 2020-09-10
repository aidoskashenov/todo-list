import React, { useEffect, useReducer, useState } from "react"

import { useHistory, useLocation, useParams } from "react-router-dom"

import { AddForm as Add } from "./AddForm"
import { List } from "./List"

import { Notification } from "components/base"

import api from "api/routes"

import auth from "auth"

const todosAPI = api("todos")

function reducer(state, action) {
  switch (action.type) {
    case "init":
      return state.concat(action.todos)
    case "add":
      return state.concat({
        _id: action.id,
        completed: false,
        text: action.text,
      })
    case "toggle-completion": {
      // Wrap 'case' in blocks for proper scoping of lexical bindings (https://eslint.org/docs/rules/no-case-declarations)
      const { toggledTodo } = action
      // 'filter' out all of the other 'todos' and then 're-add' the toggledTodo (with the updated 'completed')
      return state
        .filter(({ _id: id }) => id !== toggledTodo._id)
        .concat(toggledTodo)
    }
    case "trash":
      return state.filter(({ _id: id }) => id !== action.id)
    default:
      return state
  }
}

export const TodoList = () => {
  const history = useHistory()
  const { state } = useLocation()
  const { uid } = useParams()

  const [imgURL, setImgURL] = useState("")
  const [notification, setNotification] = useState(null)

  const [todos, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    try {
      ;(async () => {
        const res = await todosAPI.show(uid)
        if (res.status > 400) {
          throw new Error(`Unable to get ur Todos ATM! 😞🙇🏽‍♂️
                    Please check your internet connection and/or try again later! 🤞🏽`)
        }
        const todos = await res.json()
        dispatch({ todos, type: "init" })
      })()
    } catch (err) {
      setNotification({
        className: "is-danger",
        text: err.message,
      })
    }
  }, [uid])

  // Dispatch 'init' to update all of the initial todos...if any
  const handleAdd = async (event) => {
    event.preventDefault()
    const { target } = event

    const text = target.elements[0].value
    try {
      const res = await todosAPI.create({
        text,
        uid,
        completed: false,
        imgURL,
      })
      if (res.status > 400) {
        throw new Error(res)
      }
      const { insertedId } = await res.json()
      target.reset()
      dispatch({ type: "add", id: insertedId, text })
    } catch (err) {
      console.error(err)
    }
  }

  const handleCheckbox = ({ target }) => {
    const toggledTodo =
      // Go through the current 'todos' and find the one whose id matches the one that was clicked on (using the closest 'li' to get that 'id'.)
      todos.find(({ _id: id }) => id === target.closest("li").dataset.id)

    toggledTodo.completed = target.checked
    try {
      const res = todosAPI.update(target.checked, toggledTodo._id)
      if (res.status > 400) {
        throw new Error(res)
      }
      dispatch({ type: "toggle-completion", toggledTodo })
    } catch (err) {
      console.error(err)
    }
  }

  const handleSignOut = () => {
    auth.signOut().then(() => {
      history.push("/login")
    })
  }

  const handleTrash = ({ target }) => {
    const id = target.closest("li").dataset.id
    try {
      todosAPI.delete(id)
      dispatch({ type: "trash", id })
    } catch (err) {
      console.error(err)
    }
  }

  const handleWidget = () => {
    window.cloudinary
      .createUploadWidget(
        // TODO: https://cloudinary.com/documentation/upload_widget#look_and_feel_customization
        {
          cloudName: "codefinity",
          uploadPreset: "todo-list",
        },
        (error, result) => {
          if (result.event === "success") {
            setImgURL(result.info.secure_url)
          } else if (error) {
            console.error(error)
          }
        }
      )
      .open()
  }

  return (
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
      <Add
        addHandler={handleAdd}
        signOutHandler={handleSignOut}
        widgetHandler={handleWidget}
      />
      {notification ? <Notification notification={notification} /> : null}
    </main>
  )
}
