import React, { useEffect, useReducer, useState } from "react"

import { useHistory } from "react-router"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

import api from "api/routes"
import { auth, googleAuth } from "auth"

import { Notification } from "components/base"

const usersAPI = api("users")

function reducer(state, action) {
  switch (action.type) {
    case "init":
      return state.concat(action.users)
    case "delete":
      return state.filter(({ uid }) => uid !== action.uid)
  }
}

export const SuperAdmin = () => {
  const history = useHistory()

  const [users, dispatch] = useReducer(reducer, [])

  const [admin, setAdmin] = useState(false)
  const [notification, setNotification] = useState(null)
  const [secs, setSecs] = useState(3)

  const updateNotification = (secs = 3) => {
    setNotification({
      className: "is-danger",
      text: `Redirecting to login page in ${secs} seconds...`,
    })
  }

  useEffect(() => {
    // Notification means that we are in error state and will be 'pushing' to 'login'
    if (!notification) {
      auth
        .signInWithPopup(googleAuth)
        .then(({ user: { email } }) => {
          if (email !== process.env.REACT_APP_SUPER_ADMIN_EMAIL) {
            throw new Error()
          }
          setAdmin(true)
          return usersAPI.index()
        })
        .then((res) => res.json())
        .then(({ body: users }) => {
          dispatch({ users, type: "init" })
        })
        .catch(() => {
          updateNotification()
        })
    } else {
      auth.signOut()
    }
  }, [notification])

  useEffect(() => {
    // There's an error b4 we logged in as 'admin' - get outta here!
    if (notification && !admin) {
      while (secs >= 0) {
        const intervalID = setInterval(() => {
          setSecs((prevSecs) => prevSecs - 1)
          updateNotification(secs)
        }, 1000)

        // Cleanup function
        return () => {
          clearInterval(intervalID)
        }
      }
      history.push("/login")
    }
  }, [admin, history, notification, secs])

  // TODO: Incorporate Firebase Admin SDK to actually delete users (🙆🏽‍♂️ for demo)
  const clickHandler = async ({
    currentTarget: {
      dataset: { uid },
    },
  }) => {
    try {
      const res = await usersAPI.delete(uid)
      if (res.status > 400) {
        throw new Error("Can't delete 🔥!")
      }

      dispatch({ type: "delete", uid })
    } catch (error) {
      setNotification({
        className: "is-danger",
        text: error.message,
      })
    }
  }

  return notification ? (
    <div className="container">
      <Notification notification={notification} />
    </div>
  ) : (
    <table className="table">
      <tbody>
        {users.map(({ email, uid }) => (
          <tr key={uid} onClick={clickHandler} data-uid={uid}>
            <td>{email}</td>
            <td>
              <FontAwesomeIcon
                icon={faTrash}
                className="has-text-danger ml-2"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
