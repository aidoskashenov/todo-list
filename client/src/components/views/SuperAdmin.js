import React, { useEffect, useReducer, useState } from "react"

import { useHistory } from "react-router"

import api from "api/routes"
import { auth, googleAuth } from "auth"

import { Notification } from "components/base"

const usersAPI = api("users")

function reducer(state, action) {
  switch (action.type) {
    case "init":
      return state.concat(action.users)
    case "delete":
      return state.filter(({ _id: id }) => id !== action.id)
  }
}

export const SuperAdmin = () => {
  const history = useHistory()

  const [users, dispatch] = useReducer(reducer, [])

  const [notification, setNotification] = useState(null)
  const [secs, setSecs] = useState(3)

  const updateNotification = (secs = 3) => {
    setNotification({
      className: "is-danger",
      text: `Redirecting to login page in ${secs} seconds...`,
    })
  }

  useEffect(() => {
    if (!notification) {
      auth
        .signInWithPopup(googleAuth)
        .then(({ user: { email } }) => {
          if (email !== process.env.REACT_APP_SUPER_ADMIN_EMAIL) {
            throw new Error()
          }

          return usersAPI.index()
        })
        .then((res) => res.json())
        .then(({body: users}) => {
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
    if (notification) {
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
  }, [history, notification, secs])

  return notification ? (
    <div className="container">
      <Notification notification={notification} />
    </div>
  ) : null
}
